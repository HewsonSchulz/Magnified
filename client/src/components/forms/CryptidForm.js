import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, FormGroup, Label } from 'reactstrap'
import { createCryptid, getCryptidById, updateCryptid } from '../../managers/cryptidManager'

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
          name: cryptid.name,
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
    if (cryptidId === 'new') {
      if (formCompleted) {
        return (
          <Button color='primary' onClick={handleSubmit}>
            Submit Proposal
          </Button>
        )
      } else {
        return (
          <Button color='primary' disabled>
            Submit Proposal
          </Button>
        )
      }
    } else {
      if (formCompleted) {
        return (
          <Button color='primary' onClick={handleSubmit}>
            Save
          </Button>
        )
      } else {
        return (
          <Button color='primary' disabled>
            Save
          </Button>
        )
      }
    }
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
    } else {
      // editing an existing cryptid
      getCryptidById(parseInt(cryptidId)).then((cryptid) => {
        if (!!cryptid) {
          const { image, description } = cryptid
          setImageUrlInput(image)
          setDescInput(description)
        } else {
          // url is invalid
          navigate('/cryptids/edit/new')
        }
      })
    }
  }, [cryptidId, navigate])

  return (
    <ul>
      {cryptid && cryptidId !== 'new' && (
        <>
          <li className='cryptid-details__cryptid'>{cryptid.name}</li>
          <img className='cryptid-details__img' src={cryptid.image} alt={'provided url is invalid'} />
        </>
      )}
      <form className='cryptid-form'>
        {cryptidId === 'new' && (
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
        )}
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
    </ul>
  )
}
