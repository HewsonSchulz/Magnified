import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCryptid } from '../../managers/cryptidManager'
import './Cryptid.css'
import { Sighting } from '../sightings/Sighting'
import { getSightingsByCryptid } from '../../managers/sightingManager'
import { Button } from 'reactstrap'
import { isEmptyObject } from '../../helper'

export const CryptidDetails = ({ loggedInUser }) => {
  const [cryptid, setCryptid] = useState({})
  const [sightings, setSightings] = useState([])
  const { cryptidId } = useParams()
  const navigate = useNavigate()

  const showSightings = (cryptidId) => {
    if (sightings.length > 2) {
      return (
        <>
          {sightings.slice(0, 2).map((sighting) => (
            <Sighting key={sighting.id} sighting={sighting} isDetails={true} />
          ))}
          <Link to={`/sightings/cryptid/${cryptidId}`} className='cryptid-details__sightings-link'>
            See all sightings of this cryptid...
          </Link>
        </>
      )
    } else {
      return sightings.map((sighting) => <Sighting key={sighting.id} sighting={sighting} isDetails={true} />)
    }
  }

  useEffect(() => {
    getCryptid(cryptidId).then((data) => {
      setCryptid(data[0])
    })
  }, [cryptidId])

  useEffect(() => {
    if (cryptid === undefined) {
      navigate('/cryptids')
    }
  }, [navigate, cryptid])

  useEffect(() => {
    if (!!cryptid && !isEmptyObject(cryptid)) {
      if (cryptid.status !== 'approved' && !loggedInUser.isAdmin) {
        navigate('/cryptids')
      } else {
        getSightingsByCryptid(cryptid).then((sightings) => {
          setSightings(
            // sort by date added
            sightings.sort((a, b) => new Date(b.time) - new Date(a.time))
          )
        })
      }
    }
  }, [cryptid, loggedInUser, navigate])

  return (
    <ul className='cryptid-details'>
      {cryptid && (
        <>
          <li className='cryptid-details__cryptid'>{cryptid.name}</li>
          {!!cryptid.image ? (
            <img className='cryptid__img' src={cryptid.image} alt={'provided url is invalid'} />
          ) : (
            <img className='cryptid__img' src={'/assets/placeholder.jpg'} alt={'placeholder'} />
            //TODO: handle if picture is not provided
          )}
          <li className='cryptid-details__description'>{cryptid.description}</li>
          {loggedInUser.isAdmin && (
            <Button
              className='edit-btn'
              color='warning'
              onClick={(e) => {
                e.preventDefault()
                navigate(`/cryptids/edit/${cryptidId}`)
              }}>
              Edit
            </Button>
          )}
          {showSightings(cryptidId)}
        </>
      )}
    </ul>
  )
}
