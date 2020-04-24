import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'

const Hero = () => {
  return (
    <>
      <section className="call-to-action">
        <Link to="/find" className="find-murals">
          <FontAwesomeIcon icon={faMapMarkedAlt} className="map" />
          <p> Find Murals</p>
        </Link>
      </section>
      <section className="user">
        <Link to="/signup" className="sign-up">
          <p>Sign Up</p>
        </Link>
        <Link to="/login" className="login">
          <p>Login</p>
        </Link>
      </section>
    </>
  )
}

export default Hero
