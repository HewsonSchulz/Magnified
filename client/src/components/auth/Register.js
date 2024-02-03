import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { createUser, getUserByEmail } from '../../managers/userManager'
import { isValidEmail } from '../../helper'

export const Register = ({ setLoggedInUser }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailIsDuplicate, setEmailIsDuplicate] = useState(false)
  const [emailIsBad, setEmailIsBad] = useState(false)
  const [nameIsBlank, setNameIsBlank] = useState(false)

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

    const [newName, newEmail] = [name.trim(), email.trim()]

    if (!newName) {
      // name is blank; no good
      setNameIsBlank(true)
    }

    if (!isValidEmail(newEmail)) {
      // email is invalid; no good
      setEmailIsBad(true)
      return
    }

    if (!!newName && !!newEmail) {
      getUserByEmail(newEmail.toLowerCase()).then((response) => {
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
        <FormGroup id='login__name'>
          <Label for='login__name_input'>Full Name</Label>
          <Input
            id='login__name_input'
            invalid={nameIsBlank}
            type='text'
            value={name}
            onChange={(e) => {
              setNameIsBlank(false)
              setName(e.target.value)
            }}
          />
          {nameIsBlank && <FormFeedback>Invalid name</FormFeedback>}
        </FormGroup>

        <FormGroup id='login__email'>
          <Label for='login__email_input'>Email</Label>
          <Input
            id='login__email_input'
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
          {emailIsDuplicate && <FormFeedback>Email already registered</FormFeedback>}
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
