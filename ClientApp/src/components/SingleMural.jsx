import React, { useState } from 'react'
import INnOUT from '../Images/INnOUT.jpg'
import ReactMapGL from 'react-map-gl'
import Footer from './Footer'

const SingleMural = props => {
  const { mural } = props
  // const latitude = props.mural.latitude
  // const longitude = props.mural.longitude
  //re-render map function to make this work

  console.log(mural)
  const TOKEN =
    'pk.eyJ1IjoiZGVsYWcwMTAiLCJhIjoiY2s4Ynd0ZGFzMGNwbzNubGVkeHdwb2kyayJ9.b06ryTcLddTGD2JCZOSJTA'
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 28.02881,
    longitude: -82.6403,
    zoom: 14,
  })

  return (
    <>
      <section className="single-mural">
        <section className="mural-image">
          <img src={INnOUT} alt={mural.name} />
        </section>
        <main className="mural-details">
          <section className="mural-info">
            <h1>{mural.name}</h1>
            <h5>by {mural.artist}</h5>
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
}

export default SingleMural
