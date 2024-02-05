import { Link, useLocation } from 'react-router-dom'
import { Logout } from './Logout'

export const NavBar = ({ loggedInUser }) => {
  const url = useLocation().pathname

  return (
    <ul className='navbar'>
      <li className='navbar__item'>
        <Link to='/sightings' className='navbar__link' id={url === '/sightings' ? 'selected' : ''}>
          All Sightings
        </Link>
      </li>

      <li className='navbar__item'>
        <Link
          to={`/sightings/${loggedInUser?.id}`}
          className='navbar__link'
          id={url === `/sightings/${loggedInUser?.id}` ? 'selected' : ''}>
          My Sightings
        </Link>
      </li>

      <li className='navbar__item'>
        <Link to='/sightings/edit/new' className='navbar__link' id={url === '/sightings/edit/new' ? 'selected' : ''}>
          New Sighting
        </Link>
      </li>

      <li className='navbar__item'>
        <Link to='/cryptids' className='navbar__link' id={url === '/cryptids' ? 'selected' : ''}>
          Cryptid Dictionary
        </Link>
      </li>

      <li className='navbar__item'>
        <Link to='/proposals' className='navbar__link' id={url === '/proposals' ? 'selected' : ''}>
          Proposals
        </Link>
      </li>

      <li className='navbar__item'>
        <Link
          to={`/profile/${loggedInUser?.id}`}
          className='navbar__link'
          id={url === `/profile/${loggedInUser?.id}` ? 'selected' : ''}>
          Profile
        </Link>
      </li>

      {localStorage.getItem('magnified_user') && (
        <li className='navbar__item navbar__logout'>
          <Logout />
        </li>
      )}
    </ul>
  )
}
