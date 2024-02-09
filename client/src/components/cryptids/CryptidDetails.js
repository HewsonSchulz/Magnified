import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteCryptid, getCryptidById, updateCryptidStatus } from '../../managers/cryptidManager'
import { Sighting } from '../sightings/Sighting'
import { getSightingsByCryptid } from '../../managers/sightingManager'
import { getPhotoNum, isEmptyObject } from '../../helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faScissors, faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import './CryptidDetails.css'

export const CryptidDetails = ({ loggedInUser }) => {
  const [cryptid, setCryptid] = useState({})
  const [sightings, setSightings] = useState([])
  const { cryptidId } = useParams()
  const navigate = useNavigate()

  const getAndSetCryptid = () => {
    getCryptidById(cryptidId).then(setCryptid)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const associatedSightings = await getSightingsByCryptid(cryptid)

    if (
      window.confirm(
        `This cryptid has ${associatedSightings.length} sighting${
          associatedSightings.length !== 1 ? 's' : ''
        } associated with it. All of these sightings will be deleted. Are you sure you want to delete this cryptid?`
      )
    ) {
      await deleteCryptid(cryptid)
      navigate('/cryptids')
    }
  }

  const handleProposalDelete = async (e) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this cryptid proposal?')) {
      await deleteCryptid(cryptid)
      navigate('/proposals')
    }
  }

  const showSightings = (cryptidId) => {
    if (sightings.length > 2) {
      return (
        <>
          {sightings.slice(0, 2).map((sighting) => (
            <Sighting key={sighting.id} sighting={sighting} isDetails={true} loggedInUser={loggedInUser} />
          ))}
          <Link to={`/sightings/cryptid/${cryptidId}`} className='cryptid-details__sightings-link'>
            See all sightings of this cryptid...
          </Link>
        </>
      )
    } else {
      return sightings.map((sighting) => (
        <Sighting key={sighting.id} sighting={sighting} isDetails={true} loggedInUser={loggedInUser} />
      ))
    }
  }

  const renderIcons = () => {
    if (loggedInUser.isAdmin) {
      // if user is an admin
      if (cryptid.status === 'approved') {
        // if cryptid is in dictionary
        return (
          <>
            <FontAwesomeIcon
              icon={faScissors}
              className='sighting-details__edit-icon'
              onClick={(e) => {
                e.preventDefault()
                navigate(`/cryptids/edit/${cryptidId}`)
              }}
            />

            <FontAwesomeIcon icon={faFire} className='sighting-details__delete-icon' onClick={handleDelete} />
          </>
        )
      } else if (cryptid.status === 'denied') {
        // if cryptid is a denied proposal
        return (
          <FontAwesomeIcon icon={faFire} className='sighting-details__delete-icon' onClick={handleProposalDelete} />
        )
      }
      // if cryptid is a pending proposal
      if (cryptid.userId === loggedInUser.id) {
        // if user is the owner of a proposal
        return (
          <>
            <FontAwesomeIcon
              icon={faSquareCheck}
              className='cryptid-details__approve-icon'
              onClick={(e) => {
                e.preventDefault()
                if (window.confirm('Are you sure you want to approve this cryptid proposal?')) {
                  updateCryptidStatus(cryptid, 'approved').then(getAndSetCryptid)
                }
              }}
            />
            <FontAwesomeIcon
              icon={faSquareXmark}
              className='cryptid-details__deny-icon'
              onClick={(e) => {
                e.preventDefault()
                if (window.confirm('Are you sure you want to deny this cryptid proposal?')) {
                  updateCryptidStatus(cryptid, 'denied').then(() => navigate(`/proposals`))
                }
              }}
            />
            <FontAwesomeIcon icon={faFire} className='sighting-details__delete-icon' onClick={handleProposalDelete} />
          </>
        )
      }

      return (
        <>
          <FontAwesomeIcon
            icon={faSquareCheck}
            className='cryptid-details__approve-icon'
            onClick={(e) => {
              e.preventDefault()
              if (window.confirm('Are you sure you want to approve this cryptid proposal?')) {
                updateCryptidStatus(cryptid, 'approved').then(getAndSetCryptid)
              }
            }}
          />
          <FontAwesomeIcon
            icon={faSquareXmark}
            className='cryptid-details__deny-icon'
            onClick={(e) => {
              e.preventDefault()
              if (window.confirm('Are you sure you want to deny this cryptid proposal?')) {
                updateCryptidStatus(cryptid, 'denied').then(() => navigate(`/proposals`))
              }
            }}
          />
        </>
      )
    } else {
      // if user is not an admin
      if (cryptid.userId === loggedInUser.id && cryptid.status !== 'approved') {
        // if user is the owner of a proposal
        return (
          <FontAwesomeIcon icon={faFire} className='sighting-details__delete-icon' onClick={handleProposalDelete} />
        )
      }
    }
  }

  useEffect(() => {
    getAndSetCryptid()
  }, [cryptidId]) //* getAndSetCryptid dependency causes infinite loop

  useEffect(() => {
    if (cryptid === undefined) {
      navigate('/cryptids')
    }
  }, [navigate, cryptid])

  useEffect(() => {
    if (!!cryptid && !isEmptyObject(cryptid)) {
      if (
        cryptid.status === 'approved' ||
        // if approved, all can view
        (cryptid.status === 'pending' && (loggedInUser.isAdmin || cryptid.userId === loggedInUser.id)) ||
        // if pending, only owner and admin can view
        (cryptid.status === 'denied' && cryptid.userId === loggedInUser.id)
        // if denied, only owner can view
      ) {
        getSightingsByCryptid(cryptid).then((sightings) => {
          setSightings(
            // sort by date added
            sightings.sort((a, b) => new Date(b.time) - new Date(a.time))
          )
        })
      } else {
        navigate('/cryptids')
      }
    }
  }, [cryptid, loggedInUser, navigate])

  return (
    <ul className='cryptid-details'>
      <img className='sighting-details__journal-page' src='/assets/journal-page1.png' alt='journal background' />
      <img
        className='sighting-details__journal-page__shadow1'
        src='/assets/journal-page1.png'
        alt='journal background'
      />
      <img
        className='sighting-details__journal-page__shadow2'
        src='/assets/journal-page1.png'
        alt='journal background'
      />
      <img
        className='sighting-details__journal-page__shadow3'
        src='/assets/journal-page1.png'
        alt='journal background'
      />
      <img
        className='sighting-details__journal-page__shadow4'
        src='/assets/journal-page1.png'
        alt='journal background'
      />
      {cryptid && (
        <div className='cryptid-details__content'>
          <div className='cryptid-details__content-a'>
            <li className='cryptid-details__image-container'>
              <img
                className={`cryptid-photograph cryptid-photograph${getPhotoNum(cryptid.id)}`}
                id={`cryptid-details-photograph${getPhotoNum(cryptid.id)}`}
                src={`/assets/photograph${getPhotoNum(cryptid.id)}.png`}
                alt='photograph background'
              />
              <img
                className={`cryptid-photograph__shadow cryptid-photograph__shadow${getPhotoNum(cryptid.id)}`}
                id={`cryptid-details-photograph__shadow${getPhotoNum(cryptid.id)}`}
                src={`/assets/photograph${getPhotoNum(cryptid.id)}.png`}
                alt='photograph background shadow'
              />
              {!!cryptid.image ? (
                <img
                  className={`cryptid__img cryptid__img${getPhotoNum(cryptid.id)}`}
                  id={`cryptid-details__img${getPhotoNum(cryptid.id)}`}
                  src={cryptid.image}
                  alt={'provided url is invalid'}
                />
              ) : (
                <img
                  className={`cryptid__img cryptid__img${getPhotoNum(cryptid.id)}`}
                  id={`cryptid-details__img${getPhotoNum(cryptid.id)}`}
                  src={'/assets/photograph3b.jpg'}
                  alt={'placeholder'}
                />
              )}
            </li>
          </div>

          <div className='cryptid-details__content-b'>
            <div className='cryptid-details__content-c'>
              {cryptid.status === 'denied' && (
                <li className='cryptid-details__status cryptid-details__status-denied'>
                  This cryptid proposal was denied.
                </li>
              )}
              {cryptid.status === 'pending' && !loggedInUser.isAdmin && (
                <li className='cryptid-details__status cryptid-details__status-pending'>
                  This cryptid proposal is under review.
                </li>
              )}
              {cryptid.status === 'pending' && loggedInUser.isAdmin && (
                <li className='cryptid-details__status cryptid-details__status-pending'>
                  This cryptid proposal is in need of review.
                </li>
              )}
              <li className='cryptid-details__cryptid'>{cryptid.name}</li>
              <li className='cryptid-details__description'>{cryptid.description}</li>
            </div>

            <div id='cryptid-details__icons' className='sighting-details__icons'>
              {renderIcons()}
            </div>
          </div>

          {/* {showSightings(cryptidId)} */}
        </div>
      )}
    </ul>
  )
}
