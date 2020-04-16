import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
// import Footer from './Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSprayCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import PageLoader from '../components/PageLoader'
import Footer from '../components/Footer'

const MuralDetails = props => {
  const [mural, setMural] = useState({ artist: {} })
  const muralId = props.match.params.muralId
  // const muralLongitude = parseFloat(mural.longitude)
  // const muralLatitude = parseFloat(mural.latitude)
  // console.log(muralLongitude)

  const getMuralData = async () => {
    const resp = await axios.get('/api/murals/' + muralId)
    console.log({ mural: resp.data })
    setMural(resp.data)
  }

  const TOKEN =
    'pk.eyJ1IjoiZGVsYWcwMTAiLCJhIjoiY2s4Ynd0ZGFzMGNwbzNubGVkeHdwb2kyayJ9.b06ryTcLddTGD2JCZOSJTA'

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 27.9506,
    longitude: -82.4572,
    zoom: 11,
  })

  useEffect(() => {
    getMuralData()
  }, [])
  if (mural) {
    // const latitude = props.mural.latitude
    // const longitude = props.mural.longitude
    //re-render map function to make this work

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
                <h5>{mural.artist.name}</h5>
                <section className="spray-icon">
                  <FontAwesomeIcon icon={faSprayCan} />
                </section>
              </section>
              <h6>
                {mural.address}, {mural.city}, {mural.state}
              </h6>
            </section>
            <section className="mural-description">
              <p className="description">{mural.description}</p>
            </section>
          </main>
          <section className="map">
            <section className="map-container">
              <ReactMapGL
                {...viewport}
                onViewportChange={setViewport}
                mapboxApiAccessToken={TOKEN}
              >
                <Marker latitude={27.9506} longitude={-82.4572}>
                  📍
                </Marker>
              </ReactMapGL>
            </section>
          </section>
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
