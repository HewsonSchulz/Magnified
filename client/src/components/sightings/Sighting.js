import { formatDate, truncateText } from '../../helper'
import './Sighting.css'

export const Sighting = ({ sighting }) => {
  const { user, time, cryptid, location, description } = sighting

  return (
    <div className='sighting'>
      <li className='sighting__author'>Author: {user.name}</li>
      <li className='sighting__cryptid'>Cryptid: {cryptid.name}</li>
      <li className='sighting__time'>Date: {formatDate(time)}</li>
      <li className='sighting__location'>Location: {location.location}</li>
      <li className='sighting__description'>
        {truncateText(description, 150)}
      </li>
    </div>
  )
}
