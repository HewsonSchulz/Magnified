import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getSightingById } from '../../managers/sightingManager'
import { formatDate } from '../../helper'
import './Sighting.css'
import { Button } from 'reactstrap'

export const SightingDetails = ({ loggedInUser }) => {
  const [sighting, setSighting] = useState({})
  const { sightingId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    getSightingById(sightingId).then(setSighting)
  }, [sightingId])

  useEffect(() => {
    if (sighting === undefined) {
      navigate('/sightings')
    }
  }, [navigate, sighting])

  return (
    <ul className='sighting-details'>
      {sighting && (
        <>
          <li className='sighting-details__author'>
            Author: {sighting.user?.name}
          </li>
          <Link to={`/cryptids/details/${sighting.cryptid?.id}`}>
            <li className='sighting-details__cryptid'>
              Cryptid: {sighting.cryptid?.name}
            </li>
          </Link>
          <li className='sighting-details__time'>
            Date: {formatDate(sighting.time)}
          </li>
          <li className='sighting-details__location'>
            Location: {sighting.location?.location}
          </li>
          <li className='sighting-details__description'>
            {sighting.description}
          </li>
          {loggedInUser.id === sighting.userId && (
            <Button
              color='warning'
              onClick={(e) => {
                e.preventDefault()
                navigate(`/sightings/edit/${sighting.id}`)
              }}
            >
              Edit
            </Button>
          )}
        </>
      )}
    </ul>
  )
}
