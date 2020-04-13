import React, { useState, useEffect } from 'react'
import INnOUT from '../Images/INnOUT.jpg'
import ReactMapGL from 'react-map-gl'
// import Footer from './Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSprayCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import PageLoader from '../components/PageLoader'
import Footer from '../components/Footer'

const MuralDetails = props => {
  // console.log(props)

  const [mural, setMural] = useState({})
  const [artist, setArtist] = useState({})
  const muralId = props.match.params.muralId
  // console.log(mural)

  const getMuralData = async () => {
    const resp = await axios.get('/api/murals/' + muralId)
    console.log(resp.data)
    setMural(resp.data)
    if (resp.status === 201 || resp.status === 200) {
      getArtistData()
    } else {
      //do something here
    }
  }
  const getArtistData = async () => {
    // e.preventDefault()
    const artistResp = await axios.get(`api/Artists/${mural.artistId}`)
    console.log(artistResp.data)
    setArtist(prev => {
      return {
        ...prev,
        artist: artistResp.data,
      }
    })
    console.log(artist)
  }

  // console.log(mural)
  const TOKEN =
    'pk.eyJ1IjoiZGVsYWcwMTAiLCJhIjoiY2s4Ynd0ZGFzMGNwbzNubGVkeHdwb2kyayJ9.b06ryTcLddTGD2JCZOSJTA'
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: mural.latitude,
    longitude: mural.longitude,
    zoom: 14,
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
                <h5>{artist.name}</h5>
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
              <ReactMapGL {...viewport} mapboxApiAccessToken={TOKEN} />
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
