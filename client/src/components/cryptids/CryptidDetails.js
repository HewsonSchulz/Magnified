import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCryptid } from '../../managers/cryptidManager'
import './Cryptid.css'
import { Sighting } from '../sightings/Sighting'
import { getSightingsByCryptid } from '../../managers/sightingManager'

export const CryptidDetails = () => {
  const [cryptid, setCryptid] = useState({})
  const [sightings, setSightings] = useState([])
  const { cryptidId } = useParams()
  const navigate = useNavigate()

  const showSightings = () => {
    if (sightings.length > 2) {
      return sightings
        .slice(0, 2)
        .map((sighting) => (
          <Sighting key={sighting.id} sighting={sighting} isDetails={true} />
        ))
    } else {
      return sightings.map((sighting) => (
        <Sighting key={sighting.id} sighting={sighting} isDetails={true} />
      ))
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
    if (!!cryptid) {
      getSightingsByCryptid(cryptid).then((sightings) => {
        setSightings(
          // sort by date added
          sightings.sort((a, b) => new Date(b.time) - new Date(a.time))
        )
      })
    }
  }, [cryptid])

  return (
    <ul className='cryptid-details'>
      {cryptid && (
        <>
          <li className='cryptid-details__cryptid'>{cryptid.name}</li>
          <img
            className='cryptid-details__img'
            src={cryptid.image}
            alt={'A picture of ' + cryptid.name}
          />
          <li className='cryptid-details__description'>
            {cryptid.description}
          </li>
          {showSightings()}
          <Link
            to={`/sightings/cryptid/${cryptidId}`}
            className='cryptid-details__sightings-link'>
            See all sightings of this cryptid...
          </Link>
        </>
      )}
    </ul>
  )
}
