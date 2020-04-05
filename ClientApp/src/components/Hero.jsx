import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <>
      {/* <h1>Welcome to Mural Findah!</h1>
      <h2>We're here to help you find the murals of Tampa Bay!</h2> */}
      <Link to="/find" className="call-to-action">
        Find Murals
      </Link>
    </>
  )
}

export default Hero
