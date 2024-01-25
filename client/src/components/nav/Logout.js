import { Link, useNavigate } from 'react-router-dom'

export const Logout = () => {
  const navigate = useNavigate()

  return (
    <li className='navbar__item navbar__logout'>
      <Link
        className='navbar__link'
        onClick={() => {
          localStorage.removeItem('magnified_user').then(() => {
            navigate('/login', { replace: true })
          })
        }}
      >
        Logout
      </Link>
    </li>
  )
}
