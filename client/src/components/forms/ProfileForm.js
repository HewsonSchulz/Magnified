import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormGroup, Label } from 'reactstrap'
import { updateUser } from '../../managers/userManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsSpin, faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { deepClone } from '../../helper'
import '../profiles/Profile.css'

export const ProfileForm = ({ loggedInUser, setLoggedInUser }) => {
  const [nameInput, setNameInput] = useState('')
  const [formCompleted, setFormCompleted] = useState(false)
  const { userId } = useParams()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formCompleted) {
      const updatedUser = loggedInUser
      updatedUser.name = nameInput.trim()

      updateUser(updatedUser).then(navigate(`/profile/${loggedInUser.id}`))
    }
  }

  const updateIcon = () => {
    const newUser = deepClone(loggedInUser)
    if (newUser.iconNumber >= 7) {
      newUser.iconNumber = 1
    } else {
      newUser.iconNumber += 1
    }
    updateUser(newUser).then(setLoggedInUser)
  }

  useEffect(() => {
    if (!!nameInput.trim()) {
      setFormCompleted(true)
    } else {
      setFormCompleted(false)
    }
  }, [nameInput])

  useEffect(() => {
    if (parseInt(userId) !== loggedInUser.id) {
      // user is not the author
      navigate(`/profile/${loggedInUser.id}`)
    } else {
      // user is the author
      setNameInput(loggedInUser.name)
    }
  }, [loggedInUser, navigate, userId])

  return (
    <form className='profile-edit'>
      <img
        className='profile__img'
        src={`/assets/profIcons/profIcon${loggedInUser.iconNumber}.png`}
        alt={'Profile icon'}
      />
      <FontAwesomeIcon icon={faArrowsSpin} className='profile-form__change-icon' onClick={updateIcon} />
      <FontAwesomeIcon icon={faSquare} className='profile-form__change-icon__shadow' />
      <FormGroup id='profile-edit__name'>
        <Label for='profile-edit__name-input'></Label>
        <div className='profile-form__content-a'>
          <input
            id='profile-edit__name-input'
            onChange={(e) => {
              setNameInput(e.target.value)
            }}
            placeholder='John Doe'
            value={nameInput}
            required
          />
          {formCompleted ? (
            <>
              <FontAwesomeIcon icon={faSquare} className='profile-form__submit-icon__shadow' />
              <FontAwesomeIcon icon={faSquareCheck} className='profile-form__submit-icon' onClick={handleSubmit} />
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSquare} className='profile-form__submit-icon__shadow-disabled' />
              <FontAwesomeIcon icon={faSquareCheck} className='profile-form__submit-icon-disabled' />
            </>
          )}
        </div>
      </FormGroup>
      <div className='profile-edit__email'>{loggedInUser.email}</div>
    </form>
  )
}
