import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSprayCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ReactMapGL, { Marker, GeolocateControl, Popup } from 'react-map-gl'
import PageLoader from './PageLoader'

const AllMurals = () => {
  const [results, setResults] = useState([
    {
      latitude: 10,
      longitude: 10,
    },
  ])
  const getAllMurals = async () => {
    const resp = await axios.get('/api/Murals')
    console.log(resp.data)
    setResults(resp.data)
  }

  const [showPopup, setShowPopup] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState({})

  const markerClicked = place => {
    console.log('marker clcked', place)
    setSelectedPlace(place)
    setShowPopup(true)
  }

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 27.9506,
    longitude: -82.4572,
    zoom: 11,
    interactive: true,
    // style: 'satellite-streets-v11',
  })

  useEffect(() => {
    getAllMurals()
  }, [])

  if (results) {
    console.log(results)
    return (
      <>
        {/* <section className="search-container">
          <input type="search" />
          <button className="search-button" onClick={searchMurals}>
            <FontAwesomeIcon icon={faSprayCan} className="spray-can" />
            Search!
          </button>
        </section> */}
        <main className="mural-results">
          <section className="map">
            <section className="map-container">
              <ReactMapGL
                {...viewport}
                // style="satellite-streets-v11"
                width="100vw"
                // height="100vh"
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
                {results.map(mural => {
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
          <section className="all-murals">
            <ul>
              {results.map(mural => {
                return (
                  <li className="image-tile" key={mural.id}>
                    <Link to={`./mural/${mural.id}`}>
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
        </main>
      </>
    )
  } else {
    return <PageLoader />
  }
}

export default AllMurals
