import React from 'react'
import Hero from '../components/Hero'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSprayCan } from '@fortawesome/free-solid-svg-icons'

export function Home() {
  return (
    <>
      <main className="home-main">
        <section className="hero">
          <Hero />
        </section>
        <section className="cta">
          <h3 className="hero-header">
            Helping you find the murals of Tampa Bay!
          </h3>
          <section className="description-of-us">
            <p className="description">
              After a Sunday out and about our great community, we realized that
              our cities have great murals, but no way to find them . . . until
              now!
            </p>
          </section>
          <Link to="/find" className="call-to-action">
            <FontAwesomeIcon icon={faSprayCan} className="spray-can" />
            Find Murals
          </Link>
        </section>
      </main>
    </>
  )
}
