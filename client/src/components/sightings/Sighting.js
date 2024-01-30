import { Link } from 'react-router-dom'
import { formatDate, truncateText } from '../../helper'
import './Sighting.css'

export const Sighting = ({ sighting }) => {
  const { user, time, cryptid, location, description } = sighting

  return (
    //TODO: add a link to the cryptid details
    <div className='sighting' to={`/sightings/details/${sighting.id}`}>
      <Link to={`/sightings/details/${sighting.id}`}>
        <li className='sighting__author'>Author: {user.name}</li>
        <li className='sighting__cryptid'>Cryptid: {cryptid.name}</li>
        <li className='sighting__time'>Date: {formatDate(time)}</li>
        <li className='sighting__location'>Location: {location.location}</li>
        <li className='sighting__description'>
          {truncateText(description, 150)}
        </li>
      </Link>
    </div>
  )
}
