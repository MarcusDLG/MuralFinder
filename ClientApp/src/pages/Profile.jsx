import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'

const Profile = () => {
  const [profile, setProfile] = useState({ bookmarks: [{ mural: {} }] })
  const loadUserProfile = async () => {
    const resp = await axios.get('/api/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    console.log(resp.data)
    setProfile(resp.data)
    console.log(profile)
  }
  useEffect(() => {
    loadUserProfile()
  }, [])
  return (
    <>
      <main className="profile-page">
        <section className="user-details">
          <h1>{profile.fullName}</h1>
          <p>{profile.email}</p>
        </section>
        <section className="liked-murals">
          <h1>Your favorite murals:</h1>
          <ul>
            {profile.bookmarks.map(m => {
              return (
                <li className="image-tile" key={m.mural.id}>
                  <Link to={`./mural/${m.mural.id}`}>
                    <img src={m.mural.imageUrl} alt="" />
                    <section className="mural-info">
                      <p>{m.mural.name}</p>
                      {/* <p>{mural.artist}</p> */}
                    </section>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Profile
