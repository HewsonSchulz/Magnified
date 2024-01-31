import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCryptids } from '../../../managers/cryptidManager'
import { sortAlphabetically } from '../../../helper'
import { Button, FormGroup, Label } from 'reactstrap'
import { createSighting } from '../../../managers/sightingManager'
import {
  createLocation,
  getLocationByName,
} from '../../../managers/locationManager'

export const SightingForm = ({ loggedInUser }) => {
  const [cryptidOption, setCryptidOption] = useState('0')
  const [cryptids, setCryptids] = useState([])
  const [locationInput, setLocationInput] = useState('')
  const [descInput, setDescInput] = useState('')
  const [formCompleted, setFormCompleted] = useState(false)
  const { sightingId } = useParams()
  //TODO: add editing functionality  -  `sightingId` === n, !== "new")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const [newLocation, newDesc] = [locationInput.trim(), descInput.trim()]

    if (formCompleted) {
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
          createLocation({ location: newLocation }).then((createdLocation) => {
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

  return (
    <form className='sighting-form'>
      <FormGroup id='sighting-form__cryptid'>
        <Label for='sighting-form__cryptid_dropdown'>Cryptid:</Label>
        <select
          id='sighting-form__cryptid_dropdown'
          className='sighting-form__cryptid-dropdown'
          value={cryptidOption}
          onChange={(event) => {
            setCryptidOption(event.target.value)
          }}
          //? required
        >
          <option key={0} value={0}>
            Select a Cryptid...
          </option>
          {cryptids.map((cryptid, i) => (
            <option key={i + 1} value={cryptid.id}>
              {cryptid.name}
            </option>
          ))}
        </select>
      </FormGroup>
      <FormGroup id='sighting-form__location'>
        <Label for='sighting-form__location_input'>Location:</Label>
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
      {formCompleted ? (
        <Button color='primary' onClick={handleSubmit}>
          Submit
        </Button>
      ) : (
        <Button color='primary' onClick={handleSubmit} disabled>
          Submit
        </Button>
      )}
    </form>
  )
}
