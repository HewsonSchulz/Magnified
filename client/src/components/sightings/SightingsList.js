import { useEffect, useState } from 'react'
import { getSightings } from '../../managers/sightingManager'
import { Sighting } from './Sighting'
import { useParams } from 'react-router-dom'
import { SightingFilterBar } from '../filtering/SightingFilterBar'
import { SearchBar } from '../filtering/SearchBar'
import { calculateMatchingData } from '../../helper'

export const SightingsList = () => {
  const [allSightings, setAllSightings] = useState([])
  const [mySightings, setMySightings] = useState([])
  const [filteredSightings, setFilteredSightings] = useState([])
  const [filterOption, setFilterOption] = useState('0')
  const [cryptidOption, setCryptidOption] = useState('0')
  const [authorOption, setAuthorOption] = useState('0')
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { userId } = useParams()

  useEffect(() => {
    getSightings().then((sightings) => {
      setAllSightings(
        // sort by date added
        sightings.sort((a, b) => new Date(b.time) - new Date(a.time))
      )
    })
  }, [])

  useEffect(() => {
    if (!!userId) {
      setMySightings(
        [...allSightings].filter(
          (sighting) => sighting.userId === parseInt(userId)
        )
      )
    }
  }, [allSightings, userId])

  useEffect(() => {
    let currentSightings = [...allSightings]
    if (!!userId) {
      currentSightings = [...mySightings]
    }

    //TODO: write a message for if the author has not posted any sightings
    //TODO: redirect to home if the author doesn't exist

    // if we are searching
    if (isSearching) {
      // filter by search
      if (searchTerm === '') {
        setFilteredSightings(currentSightings)
      } else {
        setFilteredSightings(
          [...currentSightings].sort((a, b) => {
            // sort based on total amount of matching data
            const aScore =
              calculateMatchingData(
                a.description.toLowerCase(),
                searchTerm.trim()
              ) +
              calculateMatchingData(
                a.user.name.toLowerCase(),
                searchTerm.trim()
              ) +
              calculateMatchingData(
                a.cryptid.name.toLowerCase(),
                searchTerm.trim()
              ) +
              calculateMatchingData(
                a.location.location.toLowerCase(),
                searchTerm.trim()
              )

            const bScore =
              calculateMatchingData(
                b.description.toLowerCase(),
                searchTerm.trim()
              ) +
              calculateMatchingData(
                b.user.name.toLowerCase(),
                searchTerm.trim()
              ) +
              calculateMatchingData(
                b.cryptid.name.toLowerCase(),
                searchTerm.trim()
              ) +
              calculateMatchingData(
                b.location.location.toLowerCase(),
                searchTerm.trim()
              )

            return bScore - aScore
          })
        )
      }
    } else {
      // if we are not searching
      if (filterOption === '0') {
        // filter by most recent
        setFilteredSightings(currentSightings)
      }
      if (filterOption === '1') {
        // filter by cryptid
        if (cryptidOption === '0') {
          setFilteredSightings(currentSightings)
        } else {
          setFilteredSightings(
            [...currentSightings].filter(
              (sighting) => sighting.cryptid.id === parseInt(cryptidOption)
            )
          )
        }
      }
      if (filterOption === '2') {
        // filter by author
        if (authorOption === '0') {
          setFilteredSightings(currentSightings)
        } else {
          setFilteredSightings(
            [...currentSightings].filter(
              (sighting) => sighting.userId === parseInt(authorOption)
            )
          )
        }
      }
    }
  }, [
    allSightings,
    authorOption,
    cryptidOption,
    filterOption,
    isSearching,
    mySightings,
    searchTerm,
    userId,
  ])

  useEffect(() => {
    setIsSearching(false)
  }, [filterOption, cryptidOption, authorOption])

  return (
    <>
      <SearchBar
        setSearchTerm={setSearchTerm}
        setIsSearching={setIsSearching}
      />
      <SightingFilterBar
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        userId={userId}
      />
      {filterOption === '1' && (
        <SightingFilterBar
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          cryptidOption={cryptidOption}
          setCryptidOption={setCryptidOption}
          filterType={'Cryptid'}
        />
      )}
      {filterOption === '2' && (
        <SightingFilterBar
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
