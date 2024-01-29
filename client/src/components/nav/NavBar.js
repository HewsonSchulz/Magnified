import { useLocation } from 'react-router-dom'
import { Logout } from './Logout'
import './NavBar.css'

export const NavBar = () => {
  const url = useLocation().pathname

  return (
    <ul className='navbar'>
      {/* <li className='navbar__item'>
        <Link
          to='/'
          className='navbar__link'
          id={url === '/' ? 'selected' : ''}
        >
          Home
        </Link>
      </li> */}

      {localStorage.getItem('magnified_user') && (
        <li className='navbar__item navbar__logout'>
          <Logout />
        </li>
      )}
    </ul>
  )
}
