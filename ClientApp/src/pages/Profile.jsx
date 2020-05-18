import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, GeolocateControl, Popup } from 'react-map-gl'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'
import '../Styles/profile-page.scss'

const Profile = () => {
  const [profile, setProfile] = useState({
    bookmarks: [{ mural: { latitude: 10, longitude: 10 } }],
  })

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 27.9506,
    longitude: -82.4572,
    zoom: 11,
    interactive: true,
  })

  const [showPopup, setShowPopup] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState({})

  const markerClicked = place => {
    console.log('marker clcked', place)
    setSelectedPlace(place)
    setShowPopup(true)
  }
  useEffect(() => {
    const loadUserProfile = async () => {
      const resp = await axios.get('/api/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log(resp.data)
      setProfile(resp.data)
    }
    loadUserProfile()
  }, [])
  return (
    <>
      <main className="profile-page">
        <section className="map">
          <section className="map-container">
            <ReactMapGL
              {...viewport}
              width="100vw"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOXTOKEN}
              onViewportChange={setViewport}
            >
              {showPopup && (
                <Popup
                  latitude={parseFloat(selectedPlace.latitude)}
                  longitude={parseFloat(selectedPlace.longitude)}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setShowPopup(false)}
                  offsetTop={-5}
                >
                  <div className="popup-window">
                    <Link to={`/mural/${selectedPlace.id}`}>
                      <img
                        src={selectedPlace.imageUrl}
                        alt={selectedPlace.name}
                      />
                    </Link>
                  </div>
                </Popup>
              )}
              {profile.bookmarks.map(m => {
                return (
                  <Marker
                    latitude={parseFloat(m.mural.latitude)}
                    longitude={parseFloat(m.mural.longitude)}
                    offsetTop={-10}
                  >
                    <section
                      className="marker"
                      onClick={() => markerClicked(m.mural)}
                    >
                      <span role="img" aria-label="marker">
                        📍
                      </span>
                    </section>
                  </Marker>
                )
              })}
              <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
              />
            </ReactMapGL>
          </section>
        </section>
        <section className="user-details">
          <h1>{profile.fullName}</h1>
          <p>{profile.email}</p>
        </section>
        <section className="liked-murals">
          <h1>{profile.fullName}'s favorite murals:</h1>
          <ul>
            {profile.bookmarks.map(m => {
              return (
                <li className="image-tile" key={m.mural.id}>
                  <Link to={`./mural/${m.mural.id}`}>
                    <img src={m.mural.imageUrl} alt="" />
                    <section className="mural-info">
                      <p>{m.mural.name}</p>
                    </section>
                    {/* <Card className="col-6">
                      <CardImg
                        top
                        width="100%"
                        src={m.mural.imageUrl}
                        alt={m.mural.name}
                      />
                      <CardBody>
                        <CardTitle>{m.mural.name}</CardTitle>
                        <CardText>{m.mural.description}</CardText>
                        <Button>View Mural</Button>
                      </CardBody>
                    </Card> */}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Profile
