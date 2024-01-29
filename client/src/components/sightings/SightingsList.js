import { useEffect, useState } from 'react'
import { getSightings } from '../../managers/sightingManager'
import { Sighting } from './Sighting'
import { useParams } from 'react-router-dom'

export const SightingsList = () => {
  const [allSightings, setAllSightings] = useState([])
  const [shownSightings, setShownSightings] = useState([])
  const { userId } = useParams()

  useEffect(() => {
    getSightings().then(setAllSightings)
  }, [])

  useEffect(() => {
    if (!!userId) {
      setShownSightings(
        allSightings.filter((sighting) => sighting.userId === parseInt(userId))
      )

      //TODO: write a message for if the author has not posted any sightings
      //TODO: redirect to home if the author doesn't exist
    } else {
      setShownSightings(allSightings)
    }
  }, [allSightings, userId])

  return (
    <ul className='sightings-list'>
      {shownSightings.map((sighting) => {
        return <Sighting key={sighting.id} sighting={sighting} />
      })}
    </ul>
  )
}
