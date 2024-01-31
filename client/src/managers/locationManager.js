import { apiUrl, fetchOptions } from '../helper'

export const getLocations = async () => {
  return await fetch(`${apiUrl}/locations`).then((res) => res.json())
}

export const createLocation = async (location) => {
  return await fetch(
    `${apiUrl}/locations`,
    fetchOptions('POST', location)
  ).then((res) => res.json())
}

export const getLocationByName = async (locationName) => {
  let res = null

  await getLocations().then((locations) => {
    // manual case-insensitive name comparison
    for (const location of locations) {
      if (locationName.toLowerCase() === location.location.toLowerCase()) {
        res = location
      }
    }
  })

  return res
}
