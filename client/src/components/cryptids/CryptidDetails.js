import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteCryptid, getCryptidById, updateCryptidStatus } from '../../managers/cryptidManager'
import './Cryptid.css'
import { Sighting } from '../sightings/Sighting'
import { getSightingsByCryptid } from '../../managers/sightingManager'
import { Button } from 'reactstrap'
import { isEmptyObject, renderStatus } from '../../helper'

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

  const renderButtons = () => {
    if (loggedInUser.isAdmin) {
      if (cryptid.status === 'approved') {
        return (
          <>
            <Button
              className='edit-btn'
              color='warning'
              onClick={(e) => {
                e.preventDefault()
                navigate(`/cryptids/edit/${cryptidId}`)
              }}>
              Edit
            </Button>
            <Button className='delete-btn' color='danger' onClick={handleDelete}>
              Delete
            </Button>
          </>
        )
      }

      return (
        <>
          <Button
            className='approve-btn'
            color='success'
            onClick={(e) => {
              e.preventDefault()
              if (window.confirm('Are you sure you want to approve this cryptid proposal?')) {
                updateCryptidStatus(cryptid, 'approved').then(getAndSetCryptid)
              }
            }}>
            Approve
          </Button>
          <Button
            className='deny-btn'
            color='danger'
            onClick={(e) => {
              e.preventDefault()
              if (window.confirm('Are you sure you want to deny this cryptid proposal?')) {
                updateCryptidStatus(cryptid, 'denied').then(() => navigate(`/proposals`))
              }
            }}>
            Deny
          </Button>
        </>
      )
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
      {cryptid && (
        <>
          <li className='cryptid-details__cryptid'>{cryptid.name}</li>
          {cryptid.status !== 'approved' && renderStatus(cryptid.status)}
          {!!cryptid.image ? (
            <img className='cryptid__img' src={cryptid.image} alt={'provided url is invalid'} />
          ) : (
            <img className='cryptid__img' src={'/assets/placeholder.jpg'} alt={'placeholder'} />
            //TODO: handle if picture is not provided
          )}
          <li className='cryptid-details__description'>{cryptid.description}</li>

          {renderButtons()}

          {showSightings(cryptidId)}
        </>
      )}
    </ul>
  )
}
