import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const PostMural = props => {
  // console.log(props.match.params.artistId)
  // const artistId = props.match.params.artistId
  // console.log(artistId)
  const [mural, setMural] = useState({})
  const [wasSuccessfullyPosted, setWasSuccessfullyPosted] = useState({
    shouldRedirect: false,
    newMuralInformation: {},
  })

  const updateMuralData = e => {
    const key = e.target.name
    const value = e.target.value
    setMural(prevMural => {
      prevMural[key] = value
      return prevMural
    })
  }
  const addMuralToApi = async () => {
    console.log('adding', mural)
    const resp = await axios.post('/api/murals', mural)
    if (resp.status === 201) {
      setWasSuccessfullyPosted({
        shouldRedirect: true,
        newMuralInformation: resp.data,
      })
    } else {
      //do something here
    }
  }

  if (wasSuccessfullyPosted.shouldRedirect) {
    return (
      <Redirect
        to={{
          pathname: `/mural/${wasSuccessfullyPosted.newMuralInformation.id}`,
          state: { mural: wasSuccessfullyPosted.newMuralInformation },
        }}
      />
    )
  } else {
    return (
      <>
        <main className="mural-submission">
          <section>
            <label htmlFor="">Name</label>
            <input type="text" name="Name" onChange={updateMuralData} />
          </section>
          <section>
            <label htmlFor="">Description</label>
            <input type="text" name="Description" onChange={updateMuralData} />
          </section>
          <section>
            <label htmlFor="">City</label>
            <input type="text" name="City" onChange={updateMuralData} />
          </section>
          <section>
            <label htmlFor="">State</label>
            <input type="text" name="State" onChange={updateMuralData} />
          </section>
          <section>
            <label htmlFor="">Address</label>
            <input type="text" name="Address" onChange={updateMuralData} />
          </section>
          <button onClick={addMuralToApi}> Add Mural</button>
        </main>
      </>
    )
  }
}

export default PostMural
