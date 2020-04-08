import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'

const Hero = () => {
  return (
    <>
      <Link to="/find" className="call-to-action">
        <FontAwesomeIcon icon={faMapMarkedAlt} className="map" />
        Find Murals
      </Link>
    </>
  )
}

export default Hero
