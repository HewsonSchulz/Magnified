import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteSighting, getSightingById } from '../../managers/sightingManager'
import { formatDate } from '../../helper'
import { Button } from 'reactstrap'
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
            <Link to={`/profile/${sighting.user?.id}`}>
              <li className='sighting-details__author'>Author: {sighting.user?.name}</li>
            </Link>
            <li className='sighting-details__time'>{formatDate(sighting.time)}</li>
          </div>
          <div className='sighting-details__content-b'>
            <Link to={`/cryptids/details/${sighting.cryptid?.id}`}>
              <li className='sighting-details__cryptid'>{sighting.cryptid?.name} Sighting</li>
            </Link>
            <li className='sighting-details__location'>{sighting.location?.location}</li>
          </div>

          <li className='sighting-details__description' id='sighting-details__description'>
            {sighting.description}
          </li>
          {loggedInUser.id === sighting.userId && (
            <Button
              className='edit-btn'
              color='warning'
              onClick={(e) => {
                e.preventDefault()
                navigate(`/sightings/edit/${sighting.id}`)
              }}>
              Edit
            </Button>
          )}
          {(loggedInUser.id === sighting.userId || loggedInUser.isAdmin) && (
            <Button className='delete-btn' color='danger' onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
      )}
    </>
  )
}
