import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteSighting, getSightingById } from '../../managers/sightingManager'
import { formatDate } from '../../helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScissors, faFire } from '@fortawesome/free-solid-svg-icons'
import './SightingDetails.css'

export const SightingDetails = ({ loggedInUser }) => {
  const [sighting, setSighting] = useState({})
  const { sightingId } = useParams()
  const navigate = useNavigate()

  const handleDelete = async (e) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this sighting?')) {
      await deleteSighting(sighting)
      navigate('/sightings')
    }
  }

  useEffect(() => {
    getSightingById(sightingId).then(setSighting)
  }, [sightingId])

  useEffect(() => {
    if (sighting === undefined) {
      navigate('/sightings')
    }
  }, [navigate, sighting])

  return (
    <>
      {sighting && (
        <div className='sighting-details'>
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

          <div className='sighting-details__content-a'>
            <li className='sighting-details__author'>
              Author:{' '}
              <Link to={`/profile/${sighting.user?.id}`} className='sighting-details__author-link'>
                {sighting.user?.name}
              </Link>
            </li>
            <li className='sighting-details__time'>{formatDate(sighting.time)}</li>
          </div>
          <div className='sighting-details__content-b'>
            <li className='sighting-details__cryptid'>
              <Link to={`/cryptids/details/${sighting.cryptid?.id}`} className='sighting-details__cryptid-link'>
                {sighting.cryptid?.name}
              </Link>{' '}
              Sighting
            </li>
            <li className='sighting-details__location'>{sighting.location?.location}</li>
          </div>

          <div className='sighting-details__content-c'>
            <li className='sighting-details__description' id='sighting-details__description'>
              {sighting.description}
            </li>
            <div className='sighting-details__icons'>
              {loggedInUser.id === sighting.userId && (
                <FontAwesomeIcon
                  icon={faScissors}
                  className='sighting-details__edit-icon'
                  onClick={(e) => {
                    // manual navigation
                    e.preventDefault()
                    e.stopPropagation()
                    navigate(`/sightings/edit/${sighting.id}`)
                  }}
                />
              )}
              {(loggedInUser.id === sighting.userId || loggedInUser.isAdmin) && (
                <FontAwesomeIcon icon={faFire} className='sighting-details__delete-icon' onClick={handleDelete} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
