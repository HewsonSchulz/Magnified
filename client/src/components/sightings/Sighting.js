import { Link, useNavigate } from 'react-router-dom'
import { formatDate, truncateText } from '../../helper'
import './Sighting.css'

export const Sighting = ({ sighting, isDetails }) => {
  const { user, time, cryptid, location, description } = sighting
  const navigate = useNavigate()

  return (
    <Link to={`/sightings/details/${sighting.id}`}>
      <div className='sighting'>
        <li className='sighting__author'>Author: {user.name}</li>
        {!isDetails && (
          <li
            className='sighting__cryptid'
            onClick={(e) => {
              // manual navigation because nested Link elements is not allowed
              e.preventDefault()
              e.stopPropagation()
              navigate(`/cryptids/details/${sighting.cryptid.id}`)
            }}
          >
            Cryptid: {cryptid.name}
          </li>
        )}
        <li className='sighting__time'>Date: {formatDate(time)}</li>
        <li className='sighting__location'>Location: {location.location}</li>
        <li className='sighting__description'>
          {truncateText(description, 150)}
        </li>
      </div>
    </Link>
  )
}
