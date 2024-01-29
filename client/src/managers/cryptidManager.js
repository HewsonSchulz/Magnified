import { apiUrl } from '../helper'

export const getCryptids = async () => {
  return await fetch(`${apiUrl}/cryptids?_embed=sightings`).then((res) =>
    res.json()
  )
}
