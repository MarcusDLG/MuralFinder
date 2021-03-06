import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSprayCan } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import PageLoader from '../components/PageLoader'
import Footer from '../components/Footer'
import '../Styles/mural-details-page.scss'
import { Redirect } from 'react-router'

const MuralDetails = props => {
  const [mural, setMural] = useState({
    artist: {},
    latitude: 10,
    longitude: 10,
  })
  const muralId = props.match.params.muralId
  const [wasSuccessfullyBookmarked, setWasSuccessfullyBookmarked] = useState({
    shouldRedirect: false,
  })

  const saveMuralToUser = async () => {
    console.log('mural button clicked')
    const resp = await axios.post(
      `/api/bookmark/${mural.id}`,
      {},
      {
        headers: {
          AUthorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    )
    if (resp.status === 200 || resp.status === 201) {
      setWasSuccessfullyBookmarked({ shouldRedirect: true })
    }
  }

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 27.9506,
    longitude: -82.4572,
    zoom: 12,
  })

  useEffect(() => {
    const getMuralData = async () => {
      const resp = await axios.get('/api/murals/' + muralId)
      console.log({ mural: resp.data })
      setMural(resp.data)
      setViewport(prevViewport => {
        return {
          ...prevViewport,
          latitude: parseFloat(resp.data.latitude),
          longitude: parseFloat(resp.data.longitude),
        }
      })
    }
    getMuralData()
  }, [])
  if (wasSuccessfullyBookmarked.shouldRedirect) {
    return <Redirect to="/profile" />
  } else if (mural) {
    return (
      <>
        <section className="single-mural">
          <section className="mural-image">
            <img src={mural.imageUrl} alt={mural.name} />
          </section>
          <main className="mural-details">
            <section className="mural-info">
              <h1>{mural.name}</h1>
              <section className="artist-info">
                <Link to={`/artist/${mural.artist.id}`}>
                  <h5>{mural.artist.name}</h5>
                </Link>
                <section className="spray-icon">
                  <FontAwesomeIcon icon={faSprayCan} />
                </section>
              </section>
              <h6>
                {mural.address}, {mural.city}, {mural.state}
              </h6>
              {localStorage.getItem('token') ? (
                <section className="bookmark">
                  <button onClick={saveMuralToUser}>
                    <FontAwesomeIcon icon={faStar} /> Favorite
                  </button>
                </section>
              ) : (
                <></>
              )}
            </section>
            <section className="description-map">
              <section className="mural-description">
                <p className="description">{mural.description}</p>
              </section>

              <section className="map">
                <section className="map-container">
                  <ReactMapGL
                    {...viewport}
                    width="75vw"
                    onViewportChange={setViewport}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOXTOKEN}
                  >
                    <Marker
                      latitude={parseFloat(mural.latitude)}
                      longitude={parseFloat(mural.longitude)}
                      offsetTop={-10}
                    >
                      <span role="img" aria-label="marker">
                        📍
                      </span>
                    </Marker>
                    <GeolocateControl
                      positionOptions={{ enableHighAccuracy: true }}
                      trackUserLocation={true}
                    />
                  </ReactMapGL>
                </section>
              </section>
            </section>
          </main>
        </section>
        {/* add other murals below as clickable cards */}
        <Footer />
      </>
    )
  } else {
    return <PageLoader />
  }
}

export default MuralDetails
