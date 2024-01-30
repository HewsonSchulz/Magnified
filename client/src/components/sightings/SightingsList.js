import { useEffect, useState } from 'react'
import { getSightings } from '../../managers/sightingManager'
import { Sighting } from './Sighting'
import { useParams } from 'react-router-dom'
import { FilterBar } from '../filtering/FilterBar'

export const SightingsList = () => {
  const [allSightings, setAllSightings] = useState([])
  const [filteredSightings, setFilteredSightings] = useState([])
  const [filterOption, setFilterOption] = useState('0')
  const [cryptidOption, setCryptidOption] = useState('0')
  const [authorOption, setAuthorOption] = useState('0')
  const { userId } = useParams()

  useEffect(() => {
    getSightings().then((sightings) => {
      setAllSightings(
        sightings.sort((a, b) => new Date(b.time) - new Date(a.time))
      )
    })
  }, []) //* allSightings dependency causes infinite loop

  useEffect(() => {
    //// if (!!userId) {}
    //TODO!: implement functionality for user-specific urls - /sightings/:userId

    //TODO: write a message for if the author has not posted any sightings
    //TODO: redirect to home if the author doesn't exist

    if (filterOption === '0') {
      // filter by most recent
      setFilteredSightings(allSightings)
    }
    if (filterOption === '1') {
      // filter by cryptid
      if (cryptidOption === '0') {
        setFilteredSightings(allSightings)
      } else {
        setFilteredSightings(
          [...allSightings].filter(
            (sighting) => sighting.cryptid.id === parseInt(cryptidOption)
          )
        )
      }
    }
    if (filterOption === '2') {
      // filter by author
      if (authorOption === '0') {
        setFilteredSightings(allSightings)
      } else {
        setFilteredSightings(
          [...allSightings].filter(
            (sighting) => sighting.userId === parseInt(authorOption)
          )
        )
      }
    }
  }, [allSightings, authorOption, cryptidOption, filterOption, userId])

  return (
    <>
      <FilterBar
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />
      {filterOption === '1' && (
        <FilterBar
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          cryptidOption={cryptidOption}
          setCryptidOption={setCryptidOption}
          filterType={'Cryptid'}
        />
      )}
      {filterOption === '2' && (
        <FilterBar
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          authorOption={authorOption}
          setAuthorOption={setAuthorOption}
          filterType={'Author'}
        />
      )}

      <ul className='sightings-list'>
        {filteredSightings.map((sighting) => {
          return <Sighting key={sighting.id} sighting={sighting} />
        })}
      </ul>
    </>
  )
}
