import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import { AuthorizedRoute } from './auth/AuthorizedRoute'
import { NavBar } from './nav/NavBar'
import { SightingsList } from './sightings/SightingsList'
import { CryptidsList } from './cryptids/CryptidsList'
import { SightingDetails } from './sightings/SightingDetails'
import { CryptidDetails } from './cryptids/CryptidDetails'
import { SightingForm } from './forms/SightingForm'
import { Profile } from './profiles/Profile'
import { ProfileForm } from './forms/ProfileForm'
import { CryptidForm } from './forms/CryptidForm'

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
        }>
        <Route
          index
          element={
            //TODO: create a home page (with modified navbar)
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Navigate to={'/sightings'} state={{ from: location }} replace />
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
                  <Navigate to={'/sightings'} state={{ from: location }} replace />
                </AuthorizedRoute>
              }
            />

            <Route
              path=':sightingId'
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <SightingDetails loggedInUser={loggedInUser} />
                </AuthorizedRoute>
              }
            />
          </Route>

          <Route path='edit'>
            <Route
              index
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <Navigate to={'/sightings'} state={{ from: location }} replace />
                </AuthorizedRoute>
              }
            />

            <Route
              path=':sightingId'
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <SightingForm loggedInUser={loggedInUser} />
                </AuthorizedRoute>
              }
            />
          </Route>

          <Route path='cryptid'>
            <Route
              index
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <Navigate to={'/sightings'} state={{ from: location }} replace />
                </AuthorizedRoute>
              }
            />

            <Route
              path=':cryptidId'
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <SightingsList />
                </AuthorizedRoute>
              }
            />
          </Route>
        </Route>

        <Route path='cryptids'>
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <CryptidsList />
              </AuthorizedRoute>
            }
          />

          <Route path='details'>
            <Route
              index
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <Navigate to={'/cryptids'} state={{ from: location }} replace />
                </AuthorizedRoute>
              }
            />

            <Route
              path=':cryptidId'
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <CryptidDetails />
                </AuthorizedRoute>
              }
            />
          </Route>

          <Route path='edit'>
            <Route
              index
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <Navigate to={'/cryptids'} state={{ from: location }} replace />
                </AuthorizedRoute>
              }
            />

            <Route
              path=':cryptidId'
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <CryptidForm loggedInUser={loggedInUser} />
                </AuthorizedRoute>
              }
            />
          </Route>
        </Route>

        <Route path='profile'>
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <Navigate to={`/profile/${loggedInUser?.id}`} state={{ from: location }} replace />
              </AuthorizedRoute>
            }
          />

          <Route
            path=':userId'
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <Profile loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />

          <Route path='edit'>
            <Route
              index
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <Navigate to={`/profile/${loggedInUser?.id}`} state={{ from: location }} replace />
                </AuthorizedRoute>
              }
            />

            <Route
              path=':userId'
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <ProfileForm loggedInUser={loggedInUser} />
                </AuthorizedRoute>
              }
            />
          </Route>
        </Route>
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
