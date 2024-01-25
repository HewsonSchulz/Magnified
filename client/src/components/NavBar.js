import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './NavBar.css'

export const NavBar = ({ loggedInUser }) => {
  const navigate = useNavigate()
  const url = useLocation().pathname

  return (
    <ul className='navbar'>
      <li className='navbar__item'>
        <Link
          to='/'
          className='navbar__link'
          id={url === '/' ? 'selected' : ''}
        >
          Home
        </Link>
      </li>

      {localStorage.getItem('magnified_user') ? (
        <li className='navbar__item navbar__logout'>
          <Link
            className='navbar__link'
            onClick={() => {
              navigate('/login', { replace: true })
              localStorage
                .removeItem('magnified_user')
                .then(navigate('/login', { replace: true }))
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ''
      )}
    </ul>
  )
}
