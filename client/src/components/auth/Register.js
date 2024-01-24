import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { createUser, getUserByEmail } from '../../managers/userManager'

export const Register = ({ setLoggedInUser }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [registrationFailure, setRegistrationFailure] = useState(false)

  const navigate = useNavigate()

  const registerNewUser = () => {
    const user = {
      name,
      email,
      iconNumber: 1,
      isAdmin: false,
    }

    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty('id')) {
        localStorage.setItem(
          'magnified_user',
          JSON.stringify({
            ...createdUser,
          })
        )
        setLoggedInUser(createdUser)

        navigate('/')
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getUserByEmail(email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        setRegistrationFailure(true)
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  return (
    <div className='login__container'>
      <div className='login__card'>
        <h3>Sign Up</h3>
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            type='text'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            invalid={registrationFailure}
            type='email'
            value={email}
            onChange={(e) => {
              setRegistrationFailure(false)
              setEmail(e.target.value)
            }}
          />
          <FormFeedback>
            Registration Failure - email already registered
          </FormFeedback>
        </FormGroup>

        <Button color='primary' onClick={handleSubmit}>
          Register
        </Button>
      </div>
      <p className='login__register-link'>
        Already signed up? Log in <Link to='/login'>here</Link>
      </p>
    </div>
  )
}
