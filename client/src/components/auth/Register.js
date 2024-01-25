import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { createUser, getUserByEmail } from '../../managers/userManager'

export const Register = ({ setLoggedInUser }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailIsDuplicate, setEmailIsDuplicate] = useState(false)
  const [emailIsBad, setEmailIsBad] = useState(false)
  const [nameBlank, setNameBlank] = useState(false)

  const navigate = useNavigate()

  const registerNewUser = () => {
    const user = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
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

    if (!name.trim()) {
      // name is blank; no good
      setNameBlank(true)
    }

    if (!email.trim() || email.trim().includes(' ')) {
      // email is blank, or email contains spaces; no good
      setEmailIsBad(true)
      return
    }

    if (!!name.trim() && !!email.trim()) {
      getUserByEmail(email.trim().toLowerCase()).then((response) => {
        if (response.length > 0) {
          // email already exists; no good
          setEmailIsDuplicate(true)
        } else {
          // email is good
          registerNewUser()
        }
      })
    }
  }

  return (
    <div className='login__container'>
      <div className='login__card'>
        <h3>Sign Up</h3>
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            invalid={nameBlank}
            type='text'
            value={name}
            onChange={(e) => {
              setNameBlank(false)
              setName(e.target.value)
            }}
          />
          {nameBlank && <FormFeedback>Invalid name</FormFeedback>}
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            invalid={emailIsDuplicate || emailIsBad}
            type='email'
            value={email}
            onChange={(e) => {
              setEmailIsBad(false)
              setEmailIsDuplicate(false)
              setEmail(e.target.value)
            }}
          />
          {emailIsBad && <FormFeedback>Invalid email</FormFeedback>}
          {emailIsDuplicate && (
            <FormFeedback>Email already registered</FormFeedback>
          )}
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
