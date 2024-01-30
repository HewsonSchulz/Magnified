import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import { AuthorizedRoute } from './auth/AuthorizedRoute'
import { NavBar } from './nav/NavBar'
import { SightingsList } from './sightings/SightingsList'
import { CryptidsList } from './cryptids/CryptidsList'
import { SightingDetails } from './sightings/SightingDetails'

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
            //TODO: create a home page (with modified navbar)
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <>!HOME PAGE</>
            </AuthorizedRoute>
          }
        />

        <Route path='sightings'>
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <SightingsList />
              </AuthorizedRoute>
            }
          />

          <Route
            path=':userId'
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <SightingsList />
              </AuthorizedRoute>
            }
          />

          <Route path='details'>
            <Route
              index
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <Navigate
                    to={'/sightings'}
                    state={{ from: location }}
                    replace
                  />
                </AuthorizedRoute>
              }
            />

            <Route
              path=':sightingId'
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <SightingDetails />
                </AuthorizedRoute>
              }
            />
          </Route>
        </Route>

        <Route
          path='cryptids'
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CryptidsList />
            </AuthorizedRoute>
          }
        />
      </Route>

      <Route
        path='*'
        //TODO?: create a 404 page
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
