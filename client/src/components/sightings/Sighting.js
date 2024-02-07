import { Link, useNavigate } from 'react-router-dom'
import { formatDate, truncateText } from '../../helper'
import './Sighting.css'

export const Sighting = ({ sighting, isDetails, loggedInUser }) => {
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
                navigate(`/profile/${sighting.userId}`)
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
                  navigate(`/cryptids/details/${sighting.cryptidId}`)
                }}>
                {cryptid.name} Sighting
              </li>
            )}
            <li className='sighting__location'>{location.location}</li>
          </div>

          <li className='sighting__description'>{truncateText(description, 425)}</li>
          {loggedInUser.id === sighting.userId && (
            <img
              className='sighting__author-badge'
              src='/assets/author-badge.png'
              alt='author badge'
              onClick={(e) => {
                // manual navigation
                e.preventDefault()
                e.stopPropagation()
                navigate(`/profile/${sighting.userId}`)
              }}
            />
          )}
        </div>
      </div>
    </Link>
  )
}
