import { useEffect, useState } from 'react'
import { getSightings } from '../../managers/sightingManager'
import { Sighting } from './Sighting'
import { useNavigate, useParams } from 'react-router-dom'
import { SightingFilterBar } from '../filtering/SightingFilterBar'
import { SearchBar } from '../filtering/SearchBar'
import { calculateMatchingData } from '../../helper'

export const SightingsList = () => {
  const [allSightings, setAllSightings] = useState([])
  const [mySightings, setMySightings] = useState([])
  const [cryptidSightings, setCryptidSightings] = useState([])
  const [filteredSightings, setFilteredSightings] = useState([])
  const [filterOption, setFilterOption] = useState('0')
  const [cryptidOption, setCryptidOption] = useState('0')
  const [authorOption, setAuthorOption] = useState('0')
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { userId, cryptidId } = useParams()
  const navigate = useNavigate()

  const resetOptions = () => {
    setFilterOption('0')
    setCryptidOption('0')
    setAuthorOption('0')
    setSearchTerm('')
    setIsSearching(false)
  }

  useEffect(() => {
    getSightings().then((sightings) => {
      setAllSightings(
        // sort by date added
        sightings.sort((a, b) => new Date(b.time) - new Date(a.time))
      )
    })
  }, [])

  useEffect(() => {
    if (!!parseInt(userId)) {
      setMySightings([...allSightings].filter((sighting) => sighting.userId === parseInt(userId)))
    } else if (!!parseInt(cryptidId)) {
      setCryptidSightings([...allSightings].filter((sighting) => sighting.cryptidId === parseInt(cryptidId)))
    } else {
      navigate('/sightings')
    }

    resetOptions()
  }, [allSightings, cryptidId, navigate, userId])

  useEffect(() => {
    let currentSightings = [...allSightings]
    if (!!userId) {
      currentSightings = [...mySightings]
      //TODO: write a message for if the author has no posted sightings
      //TODO: redirect to home if the author doesn't exist
    }
    if (!!cryptidId) {
      currentSightings = [...cryptidSightings]
      //TODO: write a message for if the cryptid has no posted sightings
      //TODO: redirect to home if the cryptid doesn't exist
    }

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
              calculateMatchingData(a.description.toLowerCase(), searchTerm.toLowerCase().trim()) +
              calculateMatchingData(a.user.name.toLowerCase(), searchTerm.toLowerCase().trim()) +
              calculateMatchingData(a.cryptid.name.toLowerCase(), searchTerm.toLowerCase().trim()) +
              calculateMatchingData(a.location.location.toLowerCase(), searchTerm.toLowerCase().trim())

            const bScore =
              calculateMatchingData(b.description.toLowerCase(), searchTerm.toLowerCase().trim()) +
              calculateMatchingData(b.user.name.toLowerCase(), searchTerm.toLowerCase().trim()) +
              calculateMatchingData(b.cryptid.name.toLowerCase(), searchTerm.toLowerCase().trim()) +
              calculateMatchingData(b.location.location.toLowerCase(), searchTerm.toLowerCase().trim())

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
            [...currentSightings].filter((sighting) => sighting.cryptid.id === parseInt(cryptidOption))
          )
        }
      }
      if (filterOption === '2') {
        // filter by author
        if (authorOption === '0') {
          setFilteredSightings(currentSightings)
        } else {
          setFilteredSightings([...currentSightings].filter((sighting) => sighting.userId === parseInt(authorOption)))
        }
      }
    }
  }, [
    allSightings,
    authorOption,
    cryptidId,
    cryptidOption,
    cryptidSightings,
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
    <div className='sightings-container'>
      <div className='filtering-container'>
        <img className='filtering-background' src='/assets/paper2.jpg' alt='filtering background' />

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setIsSearching={setIsSearching} />
        <div className='filter-bar'>
          <SightingFilterBar
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            userId={userId}
            cryptidId={cryptidId}
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
        </div>
      </div>

      <ul className='sightings-list'>
        {filteredSightings.map((sighting) => {
          return <Sighting key={sighting.id} sighting={sighting} />
        })}
      </ul>
    </div>
  )
}
