import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Footer from '../components/Footer'
import PostArtist from '../components/PostArtist'

const AddArtist = () => {
  const [artist, setArtist] = useState({})
  const [wasSuccessfullyCreated, setWasSuccessfullyCreated] = useState({
    shouldRedirect: false,
    newArtistInformation: {},
  })

  const updateArtistData = e => {
    const key = e.target.name
    const value = e.target.value
    setArtist(prevArtist => {
      prevArtist[key] = value
      return prevArtist
    })
    console.log(artist)
  }

  const addArtistToApi = async e => {
    e.preventDefault()
    console.log('adding', artist)
    const resp = await axios.post('/api/artists', artist)
    if (resp.status === 200 || resp.status === 201) {
      // do something something else
      setWasSuccessfullyCreated({
        newArtistInformation: resp.data,
        shouldRedirect: true,
      })
      console.log(wasSuccessfullyCreated.newArtistInformation)
    } else {
      // do something else here
    }
  }

  if (wasSuccessfullyCreated.shouldRedirect) {
    console.log(wasSuccessfullyCreated.shouldRedirect)
    return (
      <Redirect
        to={{
          state: { artist: wasSuccessfullyCreated.newArtistInformation },
          pathname: `/artist/${wasSuccessfullyCreated.newArtistInformation.id}`,
        }}
      />
    )
  } else {
    return (
      <>
        <form className="add-artist" onSubmit={addArtistToApi}>
          <h1>Artist Information</h1>
          <section>
            <label htmlFor="">Name</label>
            <input type="text" name="Name" onChange={updateArtistData} />
          </section>
          <section>
            <label htmlFor="">Website</label>
            <input type="text" name="Website" onChange={updateArtistData} />
          </section>
          <section>
            <label htmlFor="">Facebook</label>
            <input type="text" name="Facebook" onChange={updateArtistData} />
          </section>
          <section>
            <label htmlFor="">Instagram</label>
            <input type="text" name="Instagram" onChange={updateArtistData} />
          </section>
          <button>Submit</button>
        </form>
      </>
    )
  }
}

export default AddArtist
