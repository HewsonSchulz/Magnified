import { Link, useNavigate } from 'react-router-dom'

export const Logout = () => {
  const navigate = useNavigate()

  return (
    <Link
      className='navbar__link'
      onClick={() => {
        localStorage.removeItem('magnified_user').then(() => {
          //TODO?: fix logging out relying on built-in page refresh (there is a flash of 'uncaught' in the console when logging out)
          navigate('/login', { replace: true })
        })
      }}
    >
      Logout
    </Link>
  )
}
