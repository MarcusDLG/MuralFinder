import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSprayCan } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <>
      <footer>
        <p>
          Made with{' '}
          <span>
            <FontAwesomeIcon icon={faHeart} className="footer-heart" />{' '}
            <FontAwesomeIcon icon={faHeart} className="footer-heart" />{' '}
            <FontAwesomeIcon icon={faHeart} className="footer-heart" />{' '}
          </span>{' '}
          by Kastle
        </p>
      </footer>
    </>
  )
}

export default Footer
