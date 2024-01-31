import { useEffect, useState } from 'react'
import { getFilterOptions, sortAlphabetically } from '../../helper'
import { getCryptids } from '../../managers/cryptidManager'
import { getUsers } from '../../managers/userManager'
import { getSightingsByUser } from '../../managers/sightingManager'

export const SightingFilterBar = ({
  filterOption,
  setFilterOption,
  cryptidOption,
  setCryptidOption,
  authorOption,
  setAuthorOption,
  filterType,
  userId,
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
    const options = getFilterOptions()
    if (!!userId) {
      options.splice(options.indexOf('Author'), 1)
    }

    switch (filterType) {
      default:
        // initial filtering options
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
              {options.map((option) => (
                <option
                  key={getFilterOptions().indexOf(option)}
                  value={getFilterOptions().indexOf(option)}
                >
                  {option}
                </option>
              ))}
            </select>
          </>
        )
      case 'Cryptid':
        // cryptid filtering options
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
      case 'Author':
        // author filtering options
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

//TODO: add option to filter by number of likes