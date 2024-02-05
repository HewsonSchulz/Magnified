import { apiUrl, fetchOptions } from '../helper'

export const getCryptids = async () => {
  return await fetch(`${apiUrl}/cryptids?_embed=sightings`).then((res) => res.json())
}

export const getCryptidById = async (id) => {
  const cryptid = await fetch(`${apiUrl}/cryptids?_embed=sightings&id=${id}`).then((res) => res.json())

  return cryptid[0]
}

export const updateCryptid = async (cryptid) => {
  return await fetch(`${apiUrl}/cryptids/${cryptid.id}`, fetchOptions('PUT', cryptid)).then((res) => res.json())
}

export const createCryptid = async (cryptid) => {
  return await fetch(`${apiUrl}/cryptids`, fetchOptions('POST', cryptid)).then((res) => res.json())
}

export const updateCryptidStatus = async (cryptid, status) => {
  const updatedCryptid = await getCryptidById(cryptid.id)
  // manually remove excess data
  delete updatedCryptid['sightings']
  updatedCryptid.status = status

  return await fetch(`${apiUrl}/cryptids/${cryptid.id}`, fetchOptions('PUT', updatedCryptid)).then((res) => res.json())
}
