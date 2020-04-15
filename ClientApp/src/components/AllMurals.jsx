import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSprayCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const AllMurals = () => {
  const [results, setResults] = useState([])
  const getAllMurals = async () => {
    const resp = await axios.get('/api/Murals')
    console.log(resp.data)
    setResults(resp.data)
  }

  useEffect(() => {
    getAllMurals()
  }, [])
  return (
    <>
      <section className="search-container">
        <input type="search" />
        <button className="search-button">
          <FontAwesomeIcon icon={faSprayCan} className="spray-can" />
          Search!
        </button>
      </section>
      <main className="mural-results">
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

        {/* <ul></ul>
        <section className="no-results-message">
          <p>
            No Murals Found. Would you like to{' '}
            <Link to="/addArtist">add an artist?</Link>
          </p>
        </section> */}
      </main>
    </>
  )
}

export default AllMurals
