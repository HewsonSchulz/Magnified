import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCryptids } from '../../managers/cryptidManager'
import { sortAlphabetically } from '../../helper'
import { FormGroup, Label } from 'reactstrap'
import { createSighting, updateSighting, getSightingById } from '../../managers/sightingManager'
import { createLocation, getLocationByName } from '../../managers/locationManager'
import './Form.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons'

export const SightingForm = ({ loggedInUser }) => {
  const [cryptidOption, setCryptidOption] = useState('0')
  const [cryptids, setCryptids] = useState([])
  const [locationInput, setLocationInput] = useState('')
  const [descInput, setDescInput] = useState('')
  const [formCompleted, setFormCompleted] = useState(false)
  const { sightingId } = useParams()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formCompleted) {
      const [newLocation, newDesc] = [locationInput.trim(), descInput.trim()]

      if (sightingId === 'new') {
        // creating a new sighting
        getLocationByName(newLocation).then((existingLocation) => {
          if (!!existingLocation) {
            // use existing location
            createSighting({
              userId: loggedInUser.id,
              time: new Date().toISOString(),
              cryptidId: parseInt(cryptidOption),
              locationId: existingLocation.id,
              description: newDesc,
            }).then((newSighting) => {
              navigate(`/sightings/details/${newSighting.id}`)
            })
          } else {
            // create new location
            //TODO: add location data
            createLocation({
              location: newLocation,
              //TODO: add location data
            }).then((createdLocation) => {
              createSighting({
                userId: loggedInUser.id,
                time: new Date().toISOString(),
                cryptidId: parseInt(cryptidOption),
                locationId: createdLocation.id,
                description: newDesc,
              }).then((newSighting) => {
                navigate(`/sightings/details/${newSighting.id}`)
              })
            })
          }
        })
      } else {
        // editing an existing sighting
        getSightingById(parseInt(sightingId)).then((existingSighting) => {
          getLocationByName(newLocation).then((existingLocation) => {
            if (!!existingLocation) {
              // use existing location
              updateSighting({
                userId: existingSighting.userId,
                time: existingSighting.time,
                cryptidId: parseInt(cryptidOption),
                locationId: existingLocation.id,
                description: newDesc,
                id: existingSighting.id,
              }).then((updatedSighting) => {
                navigate(`/sightings/details/${updatedSighting.id}`)
              })
            } else {
              // create new location
              createLocation({
                location: newLocation,
                //TODO: add location data
              }).then((createdLocation) => {
                updateSighting({
                  userId: existingSighting.userId,
                  time: existingSighting.time,
                  cryptidId: parseInt(cryptidOption),
                  locationId: createdLocation.id,
                  description: newDesc,
                  id: existingSighting.id,
                }).then((updatedSighting) => {
                  navigate(`/sightings/details/${updatedSighting.id}`)
                })
              })
            }
          })
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

  useEffect(() => {
    getCryptids().then((cryptids) => {
      setCryptids(sortAlphabetically(cryptids, 'name'))
    })
  }, [])

  useEffect(() => {
    if (cryptidOption !== '0' && !!locationInput.trim() && !!descInput.trim()) {
      setFormCompleted(true)
    } else {
      setFormCompleted(false)
    }
  }, [cryptidOption, descInput, locationInput])

  useEffect(() => {
    if (sightingId === 'new') {
      // creating a new sighting
      setCryptidOption('0')
      setDescInput('')
      setLocationInput('')
    } else {
      // editing an existing sighting
      getSightingById(parseInt(sightingId)).then((sighting) => {
        if (!!sighting) {
          if (sighting.userId !== loggedInUser.id) {
            // user is not the author
            navigate('/sightings/edit/new')
          } else {
            // user is the author
            const { cryptid, description, location } = sighting
            setCryptidOption(cryptid.id.toString())
            setDescInput(description)
            setLocationInput(location.location)
          }
        } else {
          navigate('/sightings/edit/new')
        }
      })
    }
  }, [loggedInUser, navigate, sightingId])

  return (
    <ul className='sighting-form-container'>
      <img className='form__paper' src='/assets/paper3.png' alt='paper background' />
      <img className='form__paper__shadow1' src='/assets/paper3.png' alt='paper shadow' />
      <img className='form__paper__shadow2' src='/assets/paper3.png' alt='paper shadow' />
      <img className='form__paper__shadow3' src='/assets/paper3.png' alt='paper shadow' />
      <img className='form__paper__shadow4' src='/assets/paper3.png' alt='paper shadow' />

      <form className='sighting-form'>
        <div className='sighting-form__content-a'>
          <FormGroup id='sighting-form__cryptid'>
            <Label id='sighting-form__cryptid-dropdown-label' for='sighting-form__cryptid_dropdown'>
              Cryptid:
            </Label>
            <select
              id='sighting-form__cryptid_dropdown'
              className='sighting-form__cryptid-dropdown'
              value={cryptidOption}
              onChange={(event) => {
                setCryptidOption(event.target.value)
              }}>
              <option key={0} value={0}>
                Select a Cryptid...
              </option>
              {cryptids.map((cryptid, i) => {
                if (cryptid.status === 'approved') {
                  return (
                    <option key={i + 1} value={cryptid.id}>
                      {cryptid.name}
                    </option>
                  )
                }
                return null
              })}
            </select>
          </FormGroup>
          {sightingId === 'new' && (
            <div className='sighting-form__new-cryptid'>
              Don't see your cryptid? Click{' '}
              <Link className='sighting-form__new-cryptid-link' to='/cryptids/edit/new'>
                here
              </Link>{' '}
              to create a new one.
            </div>
          )}
        </div>
        <FormGroup id='sighting-form__location'>
          <Label id='sighting-form__location-input-label' for='sighting-form__location_input'>
            Location:
          </Label>
          <input
            id='sighting-form__location_input'
            className='sighting-form__location-input'
            placeholder='Nashville, TN'
            value={locationInput}
            onChange={(e) => {
              setLocationInput(e.target.value)
            }}
            required
          />
        </FormGroup>
        <FormGroup id='sighting-form__description'>
          <Label for='sighting-form__description_input'></Label>
          <textarea
            id='sighting-form__description_input'
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
