import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
