import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUserById, getUsers } from '../../managers/userManager'
import { Button } from 'reactstrap'
import './Profile.css'

export const Profile = ({ loggedInUser }) => {
  const [isAuthor, setIsAuthor] = useState(false)
  const [user, setUser] = useState(false)
  const { userId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getUsers().then((users) => {
      if (users.length < parseInt(userId)) {
        // profile does not exist
        navigate(`/profile/${loggedInUser.id}`)
      } else {
        getUserById(parseInt(userId)).then((user) => {
          setUser(user)
          if (user.id === loggedInUser.id) {
            // profile belongs to user
            setIsAuthor(true)
          } else {
            // profile does not belong to user
            setIsAuthor(false)
          }
        })
      }
    })
  }, [userId, loggedInUser, navigate])

  return (
    <ul className='profile'>
      {user && (
        <>
          <img
            className='profile__img'
            //TODO: make permanent icon options
            src={`/assets/profIcon${user.iconNumber}.png`}
            alt={'Profile icon'}
          />
          <li className='profile__name'>{user.name}</li>
          <li className='profile__email'>{user.email}</li>
          <li>
            <Link
              to={`/sightings/${userId}`}
              className='cryptid-details__sightings-link'>
              See {isAuthor ? 'your' : "this user's"} posted sightings...
            </Link>
          </li>
          {isAuthor && (
            <>
              <Button
                className='edit-btn'
                color='warning'
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/profile/edit/${loggedInUser.id}`)
                }}>
                Edit
              </Button>
            </>
          )}
        </>
      )}
    </ul>
  )
}
