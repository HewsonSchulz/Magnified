import { Link, useNavigate } from 'react-router-dom'
import { formatDate, truncateText } from '../../helper'
import './Sighting.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScissors } from '@fortawesome/free-solid-svg-icons'

export const Sighting = ({ sighting, isDetails, loggedInUser }) => {
  const { user, time, cryptid, location, description } = sighting
  const navigate = useNavigate()

  return (
    <Link to={`/sightings/details/${sighting.id}`}>
      <div className='sighting'>
        <img className='sighting-newspaper' src='/assets/newspaper.png' alt='newspaper background' />
        <div className='sighting-content'>
          <div className='sighting-content__a'>
            <li className='sighting__author'>
              Author:{' '}
              <i
                className='sighting__author-link'
                onClick={(e) => {
                  // manual navigation
                  e.preventDefault()
                  e.stopPropagation()
                  navigate(`/profile/${sighting.userId}`)
                }}>
                {user.name}
              </i>
            </li>
            <li className='sighting__time'>{formatDate(time)}</li>
          </div>

          <div className='sighting-content__b'>
            {!isDetails && (
              <li className='sighting__cryptid'>
                <i
                  className='sighting__cryptid-link'
                  onClick={(e) => {
                    // manual navigation
                    e.preventDefault()
                    e.stopPropagation()
                    navigate(`/cryptids/details/${sighting.cryptidId}`)
                  }}>
                  {cryptid.name}
                </i>{' '}
                Sighting
              </li>
            )}
            <li className='sighting__location'>{location.location}</li>
          </div>

          <li className='sighting__description'>{truncateText(description, 425)}</li>

          <div className='sighting__icons'>
            {loggedInUser.id === sighting.userId && (
              <FontAwesomeIcon
                icon={faScissors}
                className='sighting__edit-icon'
                onClick={(e) => {
                  // manual navigation
                  e.preventDefault()
                  e.stopPropagation()
                  navigate(`/sightings/edit/${sighting.id}`)
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
