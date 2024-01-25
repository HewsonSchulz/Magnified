import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Login } from './auth/Login'
import { AuthorizedRoute } from './auth/AuthorizedRoute'
import { Register } from './auth/Register'
import { NavBar } from './NavBar'

export const ApplicationViews = ({ loggedInUser, setLoggedInUser }) => {
  const location = useLocation()

  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <NavBar loggedInUser={loggedInUser} />
            <Outlet />
          </>
        }
      >
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <>Hello World!</>
            </AuthorizedRoute>
          }
        />
        {/* <Route path='bruh' element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <Bruh loggedInUser={loggedInUser} />
          </AuthorizedRoute>
        } /> */}
      </Route>
      <Route
        path='*'
        //TODO: create a 404 page
        element={<Navigate to={'/'} state={{ from: location }} replace />}
      />

      <Route
        path='/login'
        element={
          <AuthorizedRoute loggedInUser={loggedInUser} isPublicOnly={true}>
            <Login setLoggedInUser={setLoggedInUser} />
          </AuthorizedRoute>
        }
      />

      <Route
        path='/register'
        element={
          <AuthorizedRoute loggedInUser={loggedInUser} isPublicOnly={true}>
            <Register setLoggedInUser={setLoggedInUser} />
          </AuthorizedRoute>
        }
      />
    </Routes>
  )
}
