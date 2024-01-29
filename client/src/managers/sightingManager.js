import { apiUrl } from '../helper'

export const getSightings = async () => {
  return await fetch(
    `${apiUrl}/sightings?_expand=user&_expand=cryptid&_expand=location`
  ).then((res) => res.json())
}
