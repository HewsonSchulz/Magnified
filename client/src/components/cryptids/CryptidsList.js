import { useEffect, useState } from 'react'
import { getCryptids } from '../../managers/cryptidManager'
import { Cryptid } from './Cryptid'

export const CryptidsList = () => {
  const [cryptids, setCryptids] = useState([])

  useEffect(() => {
    getCryptids().then(setCryptids)
  }, [])

  return (
    <ul className='cryptids-list'>
      {cryptids.map((cryptid) => {
        return <Cryptid key={cryptid.id} cryptid={cryptid} />
      })}
    </ul>
  )
}
