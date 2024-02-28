import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { getUserByEmail } from '../../managers/userManager'
import './Login.css'

export const Login = ({ setLoggedInUser }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('hewson@bruh.com') // default email
  const [failedLogin, setFailedLogin] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    getUserByEmail(email.trim().toLowerCase()).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          'magnified_user',
          JSON.stringify({
            ...user,
          })
        )

        setLoggedInUser(user)

        navigate('/')
      } else {
        setFailedLogin(true)
      }
    })
  }

  return (
    <div className='login__container'>
      <div className='login__card'>
        <h3>Login</h3>
        <FormGroup id='login__email'>
          <Label for='login__email_input'>Email</Label>
          <Input
            id='login__email_input'
            invalid={failedLogin}
            type='text'
            value={email}
            onChange={(e) => {
              setFailedLogin(false)
              setEmail(e.target.value)
            }}
          />
          <FormFeedback>Login failed.</FormFeedback>
        </FormGroup>
        <Button color='primary' onClick={handleSubmit}>
          Login
        </Button>
      </div>
      <p className='login__register-link'>
        Not signed up? Register{' '}
        <Link to='/register' id='auth-link'>
          here
        </Link>
      </p>
    </div>
  )
}
