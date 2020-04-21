import React, { useState } from 'react'
import Footer from '../components/Footer'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'

const Login = () => {
  const [returningUser, setReturningUser] = useState({})

  const updateReturningUserData = e => {
    const key = e.target.name
    const value = e.target.value
    setReturningUser(prevUser => {
      return { ...prevUser, [key]: value }
    })
    console.log(returningUser)
  }

  return (
    <>
      <form action="">
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="Email"
          placeholder="John.Doe@JD.com"
          onChange={updateReturningUserData}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="Password"
          onChange={updateReturningUserData}
        />
        <Button color="secondary">Submit</Button>
      </form>
      <Footer />
    </>
  )
}

export default Login
