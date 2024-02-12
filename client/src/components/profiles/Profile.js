import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById, getUsers, updateAdmin } from '../../managers/userManager'
import { Button } from 'reactstrap'
import { isEmptyObject } from '../../helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faSquarePen } from '@fortawesome/free-solid-svg-icons'
import './Profile.css'

export const Profile = ({ loggedInUser }) => {
  const [isAuthor, setIsAuthor] = useState(false)
  const [user, setUser] = useState({})
  const { userId } = useParams()
  const navigate = useNavigate()

  const renderAdminBtn = () => {
    if (loggedInUser.isAdmin) {
      if (!isEmptyObject(user) && user.isAdmin) {
        return (
          <Button
            id='demote-btn'
            color='danger'
            onClick={(e) => {
              updateAdmin(user).then(setUser)
            }}>
            Remove Admin
          </Button>
        )
      } else {
        return (
          <Button
            id='promote-btn'
            color='success'
            onClick={(e) => {
              updateAdmin(user).then(setUser)
            }}>
            Promote to Admin
          </Button>
        )
      }
    }
  }
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
          <img className='profile__img' src={`/assets/profIcons/profIcon${user.iconNumber}.png`} alt={'Profile icon'} />
          <div className='profile__content-a'>
            <li className='profile__name'>{user.name}</li>
            {isAuthor && (
              <div>
                <FontAwesomeIcon icon={faSquare} className='profile__edit-icon__shadow' />
                <FontAwesomeIcon
                  icon={faSquarePen}
                  className='profile__edit-icon'
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`/profile/edit/${loggedInUser.id}`)
                  }}
                />
              </div>
            )}
          </div>
          <li className='profile__email'>{user.email}</li>

          {!isAuthor && renderAdminBtn()}
        </>
      )}
    </ul>
  )
}
