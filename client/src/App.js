import { useEffect, useState } from 'react'
import { ApplicationViews } from './components/ApplicationViews'
import { getUserById } from './managers/userManager'
import { Spinner } from 'reactstrap'

export const App = () => {
  const [loggedInUser, setLoggedInUser] = useState()

  useEffect(() => {
    const user = localStorage.getItem('magnified_user')
    if (!!user) {
      getUserById(JSON.parse(user).id).then(setLoggedInUser)
    } else {
      setLoggedInUser(null)
    }
  }, [])

  if (loggedInUser === undefined) {
    return <Spinner />
  }

  return (
    <>
      <ApplicationViews
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
    </>
  )
}
