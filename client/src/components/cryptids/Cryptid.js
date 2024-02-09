import { Link } from 'react-router-dom'
import { getPhotoNum, truncateText } from '../../helper'
import './Cryptid.css'

export const Cryptid = ({ cryptid, showStatus }) => {
  // renders given status
  const renderStatus = (status) => {
    switch (status) {
      default:
        return <></>
      case 'pending':
        return <li className='cryptid__status status-pending'>PENDING</li>
      case 'approved':
        return <li className='cryptid__status status-approved'>APPROVED</li>
      case 'denied':
        return <li className='cryptid__status status-denied'>DENIED</li>
    }
  }

  return (
    <Link to={`/cryptids/details/${cryptid.id}`}>
      <div className='cryptid'>
        <div className='cryptid-content'>
          <div className='cryptid-content-a'>
            <img
              className={`cryptid-photograph cryptid-photograph${getPhotoNum(cryptid.id)}`}
              src={`/assets/photograph${getPhotoNum(cryptid.id)}.png`}
              alt='photograph background'
            />
            <img
              className={`cryptid-photograph__shadow cryptid-photograph__shadow${getPhotoNum(cryptid.id)}`}
              src={`/assets/photograph${getPhotoNum(cryptid.id)}.png`}
              alt='photograph background shadow'
            />
            {!!cryptid.image ? (
              <img
                className={`cryptid__img cryptid__img${getPhotoNum(cryptid.id)}`}
                src={cryptid.image}
                alt={'A picture of ' + cryptid.name}
              />
            ) : (
              <img
                className={`cryptid__img cryptid__img${getPhotoNum(cryptid.id)}`}
                src={'/assets/photograph3b.jpg'}
                alt={'placeholder'}
              />
              //TODO: handle if picture is not provided
            )}
          </div>
          <div className='cryptid-content-b'>
            <img
              className='cryptid__description-image'
              src='/assets/newspaper-clipping1b.png'
              alt='newspaper clipping'
            />
            <div className='cryptid-content-c'>
              <li className='cryptid__name'>{cryptid.name}</li>
              {!!showStatus && renderStatus(cryptid.status)}
            </div>
            <li className='cryptid__description'>{truncateText(cryptid.description, 110)}</li>
          </div>
        </div>
      </div>
    </Link>
  )
}
