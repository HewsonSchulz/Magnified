import { useEffect, useState } from 'react'
import { getCryptids } from '../../managers/cryptidManager'
import { Cryptid } from './Cryptid'
import { calculateMatchingData, sortAlphabetically } from '../../helper'
import { SearchBar } from '../filtering/SearchBar'

export const CryptidsList = () => {
  const [allCryptids, setAllCryptids] = useState([])
  const [filteredCryptids, setFilteredCryptids] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getCryptids().then((cryptids) => {
      setAllCryptids(sortAlphabetically(cryptids, 'name'))
    })
  }, [])

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCryptids(allCryptids)
    } else {
      setFilteredCryptids(
        [...allCryptids].sort((a, b) => {
          // sort based on total amount of matching data
          const aScore =
            calculateMatchingData(a.name.toLowerCase(), searchTerm.trim()) +
            calculateMatchingData(a.description.toLowerCase(), searchTerm.trim())

          const bScore =
            calculateMatchingData(b.name.toLowerCase(), searchTerm.trim()) +
            calculateMatchingData(b.description.toLowerCase(), searchTerm.trim())

          return bScore - aScore
        })
      )
    }
  }, [allCryptids, searchTerm])

  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} />

      <ul className='cryptids-list'>
        {filteredCryptids.map((cryptid) => {
          return <Cryptid key={cryptid.id} cryptid={cryptid} />
        })}
      </ul>
    </>
  )
}
