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
