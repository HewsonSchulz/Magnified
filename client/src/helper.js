// URL of the hosted API
export const apiUrl = 'http://localhost:8088'

// generates options for fetch calls
export const fetchOptions = (method, body) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (!!body) {
    options.body = JSON.stringify(body)
  }

  return options
}

// converts ISO datestring into "mm/dd/yyyy" format
export const formatDate = (iso, spaces = false) => {
  const time = new Date(iso).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })

  // if spaces is true, the format will be "mm / dd / yyyy"
  return !spaces ? time : time.replace(/\//g, ' / ')
}

// truncates given text based on length
export const truncateText = (text, maxLength = 100) => {
  if (text.length > maxLength) {
    return text.substring(0, text.lastIndexOf(' ', maxLength)) + '...'
  }
  return text
}

// checks if given email is valid
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// list of possible filter options
export const getFilterOptions = () => {
  return [
    'Most Recent',
    'Cryptid',
    'Author',
    //TODO?: 'Number of Likes'
  ].slice()
}

// sorts given array alphabetically based on given key
export const sortAlphabetically = (array, key) => {
  return array.sort((a, b) => a[key].localeCompare(b[key]))
}

// calculates the amount of matching data
export const calculateMatchingData = (data, searchTerm) => {
  if (!searchTerm.trim()) {
    return 0
  }
  let count = 0
  let i = data.indexOf(searchTerm)

  while (i !== -1) {
    count++
    i = data.indexOf(searchTerm, i + 1)
  }

  return count
}

// checks if given object is empty
export const isEmptyObject = (obj) => {
  if (JSON.stringify(obj) === '{}') {
    return true
  }
  return false
}

// returns corresponding photograph number
export const getPhotoNum = (n) => {
  if (n % 5 === 0) {
    return 3
  } else if (n % 3 === 0) {
    return 2
  }
  return 1
}

// creates deep clone of given object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
