import React from 'react'

//for FRIDAY: finish redirect to post mural page, and fix router/add post artist page to app.jsx
//post mural needs to take in artist ID from params, set mural artistID = to id pulled from link, post mural without artist field

const [artist, setArtist] = useState({})
// const [wasSuccessfullyPosted, setWasSuccessfullyPosted] = useState({
//   shouldRedirect: false,
//   newArtistInformation: {},
// })

const PostArtist = () => {
  const updateArtistData = e => {
    const key = e.target.name
    const value = e.target.value
    setArtist(prevArtist => {
      prevArtist[key] = value
      return prevArtist
    })
  }

  const addArtistToApi = async () => {
    console.log('adding', artist)
    const resp = await axios.post('/api/artists', artist)
    if (resp.status === 201) {
      setWasSuccessfullyPosted({
        // shouldRedirect: true,
        newArtistInformation: resp.data,
      })
    } else {
      //do something here
    }
  }

  return (
    <>
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
      <button onClick={addArtistToApi}>Submit</button>
    </>
  )
}

export default PostArtist
