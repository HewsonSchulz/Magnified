import { useEffect, useState } from 'react'
import { getSightings } from '../../managers/sightingManager'
import { Sighting } from './Sighting'

export const SightingsList = () => {
  const [sightings, setSightings] = useState([])

  useEffect(() => {
    getSightings().then(setSightings)
  }, [])

  return (
    <ul className='sightings-list'>
      {sightings.map((sighting) => {
        return <Sighting key={sighting.id} sighting={sighting} />
      })}
    </ul>
  )
}
