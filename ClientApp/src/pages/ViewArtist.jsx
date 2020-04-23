import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactMapGL, { Marker, GeolocateControl, Popup } from 'react-map-gl'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSprayCan } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/Footer'

const ViewArtist = props => {
  const artistId = props.match.params.artistId
  const [artist, setArtist] = useState({ murals: [] })
  console.log(artistId)

  const TOKEN =
    'pk.eyJ1IjoiZGVsYWcwMTAiLCJhIjoiY2s4Ynd0ZGFzMGNwbzNubGVkeHdwb2kyayJ9.b06ryTcLddTGD2JCZOSJTA'
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
    const getArtistData = async () => {
      const resp = await axios.get('/api/artists/' + artistId)
      console.log(resp.data)
      setArtist(resp.data)
      // console.log(artist)
    }
    getArtistData()
  }, [artistId])

  return (
    <>
      <main className="artist-page">
        <section className="map">
          <section className="map-container">
            <ReactMapGL
              {...viewport}
              // style="satellite-streets-v11"
              width="100vw"
              // height="100vh"
              mapboxApiAccessToken={TOKEN}
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
              {artist.murals.map(mural => {
                return (
                  <Marker
                    latitude={parseFloat(mural.latitude)}
                    longitude={parseFloat(mural.longitude)}
                  >
                    <section
                      className="marker"
                      onClick={() => markerClicked(mural)}
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
        <section className="artist-information">
          <section className="artist-name">
            <section className="spray-icon">
              <FontAwesomeIcon icon={faSprayCan} />
            </section>
            <h1>{artist.name}</h1>
          </section>
          <a href={`${artist.website}`}>Artist Website</a>
          <a href={`${artist.facebook}`}>Facebook</a>
          <a href={`${artist.instagram}`}>Instagram</a>
        </section>
        <section className="murals">
          <section className="image-tiles">
            <ul>
              {artist.murals.map(mural => {
                return (
                  <li className="image-tile" key={mural.id}>
                    <Link to={`/mural/${mural.id}`}>
                      <img src={mural.imageUrl} alt="" />
                      <section className="mural-info">
                        <p>{mural.name}</p>
                        {/* <p>{mural.artist}</p> */}
                      </section>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ViewArtist
