import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSighting } from '../../managers/sightingManager'
import { formatDate } from '../../helper'
import './Sighting.css'

export const SightingDetails = () => {
  const [sighting, setSighting] = useState({})
  const { sightingId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    getSighting(sightingId).then((data) => {
      setSighting(data[0])
    })
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
          <li className='sighting-details__cryptid'>
            Cryptid: {sighting.cryptid?.name}
          </li>
          <li className='sighting-details__time'>
            Date: {formatDate(sighting.time)}
          </li>
          <li className='sighting-details__location'>
            Location: {sighting.location?.location}
          </li>
          <li className='sighting-details__description'>
            {sighting.description}
          </li>
        </>
      )}
    </ul>
  )
}
