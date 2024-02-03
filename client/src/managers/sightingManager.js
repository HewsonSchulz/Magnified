import { apiUrl, fetchOptions } from '../helper'

export const getSightings = async () => {
  return await fetch(`${apiUrl}/sightings?_expand=user&_expand=cryptid&_expand=location`).then((res) => res.json())
}

export const getSightingById = async (id) => {
  const sighting = await fetch(`${apiUrl}/sightings?_expand=user&_expand=cryptid&_expand=location&id=${id}`).then(
    (res) => res.json()
  )

  return sighting[0]
}

export const getSightingsByCryptid = async (cryptid) => {
  return await fetch(`${apiUrl}/sightings?_expand=user&_expand=cryptid&_expand=location&cryptidId=${cryptid.id}`).then(
    (res) => res.json()
  )
}

export const getSightingsByUser = async (user) => {
  return await fetch(`${apiUrl}/sightings?_expand=user&_expand=cryptid&_expand=location&userId=${user.id}`).then(
    (res) => res.json()
  )
}

export const createSighting = async (sighting) => {
  return await fetch(`${apiUrl}/sightings`, fetchOptions('POST', sighting)).then((res) => res.json())
}

export const updateSighting = async (sighting) => {
  return await fetch(`${apiUrl}/sightings/${sighting.id}`, fetchOptions('PUT', sighting)).then((res) => res.json())
}

export const deleteSighting = async (sighting) => {
  return await fetch(`${apiUrl}/sightings/${sighting.id}`, fetchOptions('DELETE')).then((res) => res.json())
}
