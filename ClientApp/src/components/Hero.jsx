import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'

const Hero = () => {
  return (
    <>
      <Link to="/find" className="call-to-action">
        <FontAwesomeIcon icon={faMapMarkedAlt} className="map" />
        <p>Find Murals</p>
      </Link>
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
