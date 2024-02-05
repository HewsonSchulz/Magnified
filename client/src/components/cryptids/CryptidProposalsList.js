import { useEffect, useState } from 'react'
import { getCryptids } from '../../managers/cryptidManager'
import { Cryptid } from './Cryptid'
import { Link } from 'react-router-dom'

export const CryptidProposalsList = ({ loggedInUser }) => {
  const [allCryptids, setAllCryptids] = useState([])
  const [cryptidProposals, setCryptidProposals] = useState([])

  useEffect(() => {
    getCryptids().then((cryptids) => {
      setAllCryptids(cryptids.sort((a, b) => new Date(b.time) - new Date(a.time)))
    })
  }, [])

  useEffect(() => {
    if (loggedInUser.isAdmin) {
      setCryptidProposals(allCryptids.filter((cryptid) => cryptid.status === 'pending'))
    } else {
      setCryptidProposals(allCryptids.filter((cryptid) => cryptid.userId === loggedInUser.id))
    }
  }, [allCryptids, loggedInUser])

  return (
    <>
      <Link to='/cryptids/edit/new'>Create a new cryptid proposal...</Link>

      <ul className='cryptid-proposals-list'>
        {cryptidProposals.map((cryptid) => {
          return <Cryptid key={cryptid.id} cryptid={cryptid} showStatus={!loggedInUser.isAdmin} />
        })}
      </ul>
    </>
  )
}
