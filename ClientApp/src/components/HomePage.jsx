import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSprayCan } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const HomePage = () => {
  return (
    <>
      <section className="hp-content">
        <section className="declaration">
          <FontAwesomeIcon icon={faCameraRetro} className="retro-camera" />
          <h1>We've done the searching, now go get that picture!</h1>
        </section>
        <section className="who-we-are">
          <h1>
            <strong>Mural Book:</strong>
          </h1>
          <p>
            Stumbling across the murals of Tampa Bay can be an extremely fun
            process, but what happens when you don't know where to find them or
            which ones you've seen?{' '}
          </p>
          <FontAwesomeIcon icon={faSearch} className="retro-camera" />{' '}
        </section>
        <section className="cta">
          {/* <h3 className="hero-header">
            Helping you find the murals of Tampa Bay!
          </h3> */}
          <section className="description-of-us">
            <FontAwesomeIcon icon={faSprayCan} className="spray-can" />
            <p className="description">
              Come see the treasured murals of Tampa Bay!
            </p>
            <Link to="/find" className="call-to-action">
              <FontAwesomeIcon icon={faMapMarkedAlt} className="map" />
              Find Murals
            </Link>
          </section>
        </section>
      </section>
    </>
  )
}

export default HomePage
