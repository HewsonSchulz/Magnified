import { Link, useNavigate } from 'react-router-dom'
import { formatDate, truncateText } from '../../helper'
import './Sighting.css'

export const Sighting = ({ sighting, isDetails }) => {
  const { user, time, cryptid, location, description } = sighting
  const navigate = useNavigate()

  return (
    <Link to={`/sightings/details/${sighting.id}`}>
      <div className='sighting'>
        <img className='sighting-newspaper' src='/assets/newspaper.png' alt='newspaper background' />
        <div className='sighting-content'>
          <div className='sighting-content__a'>
            <li
              className='sighting__author'
              onClick={(e) => {
                // manual navigation

                e.preventDefault()
                e.stopPropagation()
                navigate(`/profile/${sighting.user.id}`)
              }}>
              Author: {user.name}
            </li>
            <li className='sighting__time'>{formatDate(time)}</li>
          </div>

          <div className='sighting-content__b'>
            {!isDetails && (
              <li
                className='sighting__cryptid'
                onClick={(e) => {
                  // manual navigation
                  e.preventDefault()
                  e.stopPropagation()
                  navigate(`/cryptids/details/${sighting.cryptid.id}`)
                }}>
                {cryptid.name} Sighting
              </li>
            )}
            <li className='sighting__location'>{location.location}</li>
          </div>

          <li className='sighting__description'>{truncateText(description, 425)}</li>
        </div>
      </div>
    </Link>
  )
}
