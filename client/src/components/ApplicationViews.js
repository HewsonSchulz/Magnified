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
import { CryptidProposalsList } from './cryptids/CryptidProposalsList'
import { useEffect, useState } from 'react'

export const ApplicationViews = ({ loggedInUser, setLoggedInUser }) => {
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(null)
  const location = useLocation()
  const url = location.pathname

  const getBackgroundClass = () => {
    //! if (url.startsWith('/sightings/edit')) {
    //!   return 'forest1'
    //! }
    //! if (url.startsWith('/sightings')) {
    //!   return 'forest2'
    //! }
    //! if (url.startsWith('/cryptids/edit')) {
    //!   return 'forest3'
    //! }
    //! if (url.startsWith('/cryptids')) {
    //!   return 'forest4'
    //! }
    //! if (url.startsWith('/proposals')) {
    //!   return 'forest5'
    //! }
    //! if (url.startsWith('/profile')) {
    //!   return 'forest6'
    //! }
    //! if (url.startsWith('/login')) {
    //!   return 'forest7'
    //! }
    //! if (url.startsWith('/register')) {
    //!   return 'forest8'
    //! }

    return 'forest9'
  }

  useEffect(() => {
    if (getBackgroundClass() !== currentImage) {
      setLoading(true)
      setCurrentImage(getBackgroundClass())
    }
  }, [currentImage, url])

  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <NavBar loggedInUser={loggedInUser} url={url} />
            <div className={`background ${getBackgroundClass()}`}>
              <div className={`background-overlay ${loading ? 'loading' : 'not-loading'}`} />

              <img
                className='background-image'
                src={`/assets/backgrounds/${getBackgroundClass()}.jpg`}
                alt='Background'
                onLoad={() => setLoading(false)}
              />

              <div className='content-container'>
                <Outlet />
              </div>
            </div>
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
                  <CryptidDetails loggedInUser={loggedInUser} />
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

        <Route
          path='proposals'
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CryptidProposalsList loggedInUser={loggedInUser} />
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
