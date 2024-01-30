import { useEffect, useState } from 'react'
import { filterOptions, sortAlphabetically } from '../../helper'
import { getCryptids } from '../../managers/cryptidManager'
import { getUsers } from '../../managers/userManager'
import { getSightingsByUser } from '../../managers/sightingManager'

export const FilterBar = ({
  filterOption,
  setFilterOption,
  cryptidOption,
  setCryptidOption,
  authorOption,
  setAuthorOption,
  filterType,
}) => {
  const [cryptids, setCryptids] = useState([])
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    const getAndSetAuthors = async () => {
      const newAuthors = []
      const users = await getUsers()

      for (const user of users) {
        const sightings = await getSightingsByUser(user)
        if (sightings.length > 0) {
          newAuthors.push(user)
        }
      }

      setAuthors(sortAlphabetically(newAuthors, 'name'))
    }

    getCryptids().then((cryptids) => {
      setCryptids(sortAlphabetically(cryptids, 'name'))
    })
    getAndSetAuthors()
  }, [])

  const displayFilterBar = (filterType) => {
    if (!filterType) {
      return (
        <>
          Sort By{' '}
          <select
            className='filter-bar'
            value={filterOption}
            onChange={(event) => {
              setFilterOption(event.target.value)
            }}
          >
            {filterOptions.map((option, i) => (
              <option key={i} value={i}>
                {option}
              </option>
            ))}
          </select>
        </>
      )
    }
    if (filterType === 'Cryptid') {
      return (
        <select
          className='filter-bar'
          value={cryptidOption}
          onChange={(event) => {
            setCryptidOption(event.target.value)
          }}
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
      )
    }
    if (filterType === 'Author') {
      return (
        <select
          className='filter-bar'
          value={authorOption}
          onChange={(event) => {
            setAuthorOption(event.target.value)
          }}
        >
          <option key={0} value={0}>
            Select an Author...
          </option>
          {authors.map((author, i) => (
            <option key={i + 1} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      )
    }
  }

  return <>{displayFilterBar(filterType)}</>
}

//* date added, cryptid, author
//TODO: add option to filter by number of likes
