import { useEffect, useState } from 'react'
import { getCryptids } from '../../managers/cryptidManager'
import { Cryptid } from './Cryptid'
import { sortAlphabetically } from '../../helper'

export const CryptidsList = () => {
  const [cryptids, setCryptids] = useState([])

  useEffect(() => {
    getCryptids().then((cryptids) => {
      setCryptids(sortAlphabetically(cryptids, 'name'))
    })
  }, [])

  return (
    <ul className='cryptids-list'>
      {cryptids.map((cryptid) => {
        return <Cryptid key={cryptid.id} cryptid={cryptid} />
      })}
    </ul>
  )
}
