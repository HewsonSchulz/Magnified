import { apiUrl } from '../helper'

export const getCryptids = async () => {
  return await fetch(`${apiUrl}/cryptids?_embed=sightings`).then((res) =>
    res.json()
  )
}

export const getCryptid = async (id) => {
  return await fetch(`${apiUrl}/cryptids?_embed=sightings&id=${id}`).then(
    (res) => res.json()
  )
}
