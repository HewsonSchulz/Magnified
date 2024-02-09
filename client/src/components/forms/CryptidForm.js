import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormGroup, Label } from 'reactstrap'
import { createCryptid, getCryptidById, updateCryptid } from '../../managers/cryptidManager'
import { getPhotoNum, isEmptyObject } from '../../helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons'
import './Form.css'

export const CryptidForm = ({ loggedInUser }) => {
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [descInput, setDescInput] = useState('')
  const [formCompleted, setFormCompleted] = useState(false)
  const [cryptid, setCryptid] = useState({})
  const [nameInput, setNameInput] = useState('')
  const { cryptidId } = useParams()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formCompleted) {
      const [newImageUrl, newDesc, newName] = [imageUrlInput.trim(), descInput.trim(), nameInput.trim()]

      if (cryptidId === 'new') {
        // creating a new cryptid proposal
        createCryptid({
          name: newName,
          description: newDesc,
          image: newImageUrl,
          status: 'pending',
          userId: loggedInUser.id,
          time: new Date().toISOString(),
        }).then(() => {
          window.alert('Your proposal has been submitted for review.')
          navigate('/proposals')
        })
      } else {
        // editing an existing cryptid
        updateCryptid({
          name: newName,
          description: newDesc,
          image: newImageUrl,
          status: cryptid.status,
          userId: cryptid.userId,
          time: cryptid.time,
          id: cryptid.id,
        }).then((updatedCryptid) => {
          navigate(`/cryptids/details/${updatedCryptid.id}`)
        })
      }
    }
  }

  const renderSaveButtons = () => {
    if (formCompleted) {
      return (
        <>
          <FontAwesomeIcon icon={faSquare} className='form__submit-icon__shadow' />
          <FontAwesomeIcon icon={faSquareCheck} className='form__submit-icon' onClick={handleSubmit} />
        </>
      )
    } else {
      return (
        <>
          <FontAwesomeIcon icon={faSquare} className='form__submit-icon-disabled__shadow' />
          <FontAwesomeIcon icon={faSquareCheck} className='form__submit-icon-disabled' />
        </>
      )
    }
  }

  const renderImage = (cryptid) => {
    if (!!cryptid.image) {
      //* return <img className='cryptid-details__img' src={cryptid.image} alt={'provided url is invalid'} />
      return (
        <div className='cryptid-form__image-container'>
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
          <img
            className={`cryptid__img cryptid__img${getPhotoNum(cryptid.id)}`}
            src={cryptid.image}
            alt={'A picture of ' + cryptid.name}
          />
        </div>
      )
    }
    //* return <img className='cryptid-details__img' src='/assets/photograph3b.jpg' alt={'placeholder'} />
    return (
      <div className='cryptid-form__image-container'>
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
        <img
          className={`cryptid__img cryptid__img${getPhotoNum(cryptid.id)}`}
          src={'/assets/photograph3b.jpg'}
          alt={'placeholder'}
        />
      </div>
    )
  }

  useEffect(() => {
    if (!isNaN(parseInt(cryptidId))) {
      getCryptidById(parseInt(cryptidId)).then(setCryptid)
    }
  }, [cryptidId])

  useEffect(() => {
    if (!loggedInUser.isAdmin && cryptidId !== 'new') {
      navigate('/cryptids')
    }
  }, [cryptidId, loggedInUser, navigate])

  useEffect(() => {
    if (!!cryptid && !isEmptyObject(cryptid) && cryptid.status !== 'approved') {
      navigate('/cryptids')
    }
  }, [cryptid, navigate])

  useEffect(() => {
    if (cryptidId === 'new') {
      // creating a new cryptid proposal
      if (!!descInput.trim() && !!nameInput.trim()) {
        setFormCompleted(true)
      } else {
        setFormCompleted(false)
      }
    } else {
      // editing an existing cryptid
      if (!!descInput.trim()) {
        setFormCompleted(true)
      } else {
        setFormCompleted(false)
      }
    }
  }, [cryptidId, descInput, nameInput])

  useEffect(() => {
    if (cryptidId === 'new') {
      // creating a new cryptid
      setDescInput('')
      setImageUrlInput('')
      setNameInput('')
    } else {
      // editing an existing cryptid
      getCryptidById(parseInt(cryptidId)).then((cryptid) => {
        if (!!cryptid) {
          const { image, description, name } = cryptid
          setImageUrlInput(image)
          setDescInput(description)
          setNameInput(name)
        } else {
          // url is invalid
          navigate('/cryptids/edit/new')
        }
      })
    }
  }, [cryptidId, navigate])

  return (
    <ul className='cryptid-form-container'>
      <img className='form__paper' src='/assets/paper3.png' alt='paper background' />
      <img className='form__paper__shadow1' src='/assets/paper3.png' alt='paper shadow' />
      <img className='form__paper__shadow2' src='/assets/paper3.png' alt='paper shadow' />
      <img className='form__paper__shadow3' src='/assets/paper3.png' alt='paper shadow' />
      <img className='form__paper__shadow4' src='/assets/paper3.png' alt='paper shadow' />

      <form className='cryptid-form'>
        <FormGroup id='cryptid-form__name'>
          <Label for='cryptid-form__name-input'></Label>
          <input
            id='cryptid-form__name-input'
            onChange={(e) => {
              setNameInput(e.target.value)
            }}
            placeholder='Cryptid Name'
            value={nameInput}
            required
          />
        </FormGroup>
        <FormGroup id='cryptid-form__image-url'>
          <Label for='cryptid-form__image-url-input'></Label>
          <input
            id='cryptid-form__image-url-input'
            className='cryptid-form__image-url-input'
            placeholder='Image URL (optional)'
            value={imageUrlInput}
            onChange={(e) => {
              setImageUrlInput(e.target.value)
            }}
          />
        </FormGroup>
        <FormGroup id='cryptid-form__description'>
          <Label for='cryptid-form__description-input'></Label>
          <textarea
            id='cryptid-form__description-input'
            onChange={(e) => {
              setDescInput(e.target.value)
            }}
            placeholder='Description...'
            value={descInput}
            required
          />
        </FormGroup>

        {renderSaveButtons()}
      </form>
      {cryptid && cryptidId !== 'new' && renderImage(cryptid)}
    </ul>
  )
}
