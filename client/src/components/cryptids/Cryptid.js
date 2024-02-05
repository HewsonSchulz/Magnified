import { Link } from 'react-router-dom'
import { truncateText } from '../../helper'
import './Cryptid.css'

export const Cryptid = ({ cryptid }) => {
  return (
    <Link to={`/cryptids/details/${cryptid.id}`}>
      <div className='cryptid'>
        <li className='cryptid__name'>{cryptid.name}</li>
        {!!cryptid.image ? (
          <img className='cryptid__img' src={cryptid.image} alt={'A picture of ' + cryptid.name} />
        ) : (
          <img className='cryptid__img' src={'/assets/placeholder.jpg'} alt={'placeholder'} />
          //TODO: handle if picture is not provided
        )}
        <li className='cryptid__description'>{truncateText(cryptid.description)}</li>
      </div>
    </Link>
  )
}
