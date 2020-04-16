import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSprayCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ReactMapGL, { Marker } from 'react-map-gl'
import PageLoader from './PageLoader'

const AllMurals = () => {
  const [results, setResults] = useState([])
  const getAllMurals = async () => {
    const resp = await axios.get('/api/Murals')
    console.log(resp.data)
    setResults(resp.data)
  }

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

  useEffect(() => {
    getAllMurals()
  }, [])

  if (results) {
    return (
      <>
        {/* <section className="search-container">
        <input type="search" />
        <button className="search-button">
          <FontAwesomeIcon icon={faSprayCan} className="spray-can" />
          Search!
        </button>
      </section> */}
        <main className="mural-results">
          <section className="map">
            <section className="map-container">
              <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={TOKEN}
                onViewportChange={setViewport}
              />
            </section>
          </section>

          <ul>
            {results.map(mural => {
              return (
                <li className="image-tile" key={mural.id}>
                  <img src={mural.imageUrl} alt="" />
                  <Link to={`./mural/${mural.id}`}>
                    <section className="mural-info">
                      <p>{mural.name}</p>
                      {/* <p>{mural.artist}</p> */}
                    </section>
                  </Link>
                </li>
              )
            })}
          </ul>
        </main>
      </>
    )
  } else {
    return <PageLoader />
  }
}

export default AllMurals
