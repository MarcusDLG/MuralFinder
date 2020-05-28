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
import '../Styles/newprofile.scss'

const NewProfile = () => {
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
      <main>
        <section className="map2">
          <section className="map-container2">
            <ReactMapGL
              {...viewport}
              width="90vw"
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
        <ul>
          {profile.bookmarks.map(m => {
            return (
              <li key={m.mural.id}>
                {/* <img src={m.mural.imageUrl} alt="" />
                <section className="mural-info">
                  <p>{m.mural.name}</p>
                </section> */}
                <Card inverse className="mural-card">
                  {/* <CardTitle>{m.mural.name}</CardTitle> */}
                  <CardBody className="body">
                    {/* <CardText>{m.mural.description}</CardText> */}
                    <Button>
                      <Link to={`./mural/${m.mural.id}`}>{m.mural.name}</Link>
                    </Button>
                  </CardBody>
                  <CardImg src={m.mural.imageUrl} alt={m.mural.name} />
                </Card>
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}

export default NewProfile
