import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, FormGroup, Label } from 'reactstrap'
import { updateUser } from '../../managers/userManager'

export const ProfileForm = ({ loggedInUser }) => {
  const [nameInput, setNameInput] = useState('')
  const [formCompleted, setFormCompleted] = useState(false)
  const { userId } = useParams()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formCompleted) {
      const updatedUser = loggedInUser
      //TODO: add icon selection
      updatedUser.name = nameInput.trim()

      updateUser(updatedUser).then(navigate(`/profile/${loggedInUser.id}`))
    }
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
        //TODO: make permanent icon options
        src={`/assets/profIcon${loggedInUser.iconNumber}.png`}
        alt={'Profile icon'}
      />
      <FormGroup id='profile-edit__name'>
        <Label for='profile-edit__name-input'></Label>
        <input
          id='profile-edit__name-input'
          onChange={(e) => {
            setNameInput(e.target.value)
          }}
          placeholder='John Doe'
          value={nameInput}
          required
        />
      </FormGroup>
      <div className='profile-edit__email'>{loggedInUser.email}</div>
      {formCompleted ? (
        <Button color='primary' onClick={handleSubmit}>
          Save
        </Button>
      ) : (
        <Button color='primary' onClick={handleSubmit} disabled>
          Save
        </Button>
      )}
    </form>
  )
}
