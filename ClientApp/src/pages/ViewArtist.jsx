import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ViewArtist = props => {
  const artistId = props.match.params.artistId
  const [artist, setArtist] = useState({})
  console.log(artistId)

  const getArtistData = async () => {
    const resp = await axios.get('/api/artists/' + artistId)
    console.log(resp.data)
    setArtist(resp.data)
    // console.log(artist)
  }
  useEffect(() => {
    getArtistData()
  }, [])

  return (
    <>
      <section className="artist-information">
        <h1>{artist.name}</h1>
        <a href={`http://www.${artist.website}`}>Artist Website</a>
        <a href={`http://www.${artist.facebook}`}>Facebook</a>
        <a href={`http://www.${artist.instagram}`}>Instagram</a>
      </section>
      {/* map murals here and cardify them like all murals page */}
    </>
  )
}

export default ViewArtist
