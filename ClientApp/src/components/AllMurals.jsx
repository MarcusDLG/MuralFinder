import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSprayCan } from '@fortawesome/free-solid-svg-icons'

const AllMurals = () => {
  return (
    <>
      <section className="search-container">
        <input type="search" />
        <button className="search-button">
          <FontAwesomeIcon icon={faSprayCan} className="spray-can" />
          Search!
        </button>
      </section>
      <main>
        <ul></ul>
        <section className="no-results-message">
          <p>
            No Murals Found. Would you like to{' '}
            <Link to="/addArtist">add an artist?</Link>
          </p>
        </section>
      </main>
    </>
  )
}

export default AllMurals
