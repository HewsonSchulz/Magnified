import { Link } from 'react-router-dom'
import { truncateText } from '../../helper'
import './Cryptid.css'

export const Cryptid = ({ cryptid }) => {
  return (
    <Link to={`/cryptids/details/${cryptid.id}`}>
      <div className='cryptid'>
        <li className='cryptid__name'>{cryptid.name}</li>
        <img
          className='cryptid__img'
          src={cryptid.image}
          alt={'A picture of ' + cryptid.name}
        />
        <li className='cryptid__description'>
          {truncateText(cryptid.description)}
        </li>
      </div>
    </Link>
  )
}
