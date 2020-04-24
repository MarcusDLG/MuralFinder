import React, { useState } from 'react'
import Footer from '../components/Footer'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'

const Login = () => {
  const [returningUser, setReturningUser] = useState({})
  const [token, setToken] = useState('')
  const [wasSuccessfullyCreated, setWasSuccessfullyCreated] = useState({
    shouldRedirect: false,
    returningUserInformation: {},
  })

  const updateReturningUserData = e => {
    const key = e.target.name
    const value = e.target.value
    setReturningUser(prevUser => {
      return { ...prevUser, [key]: value }
    })
  }

  const returningUserToApi = async e => {
    e.preventDefault()
    const resp = await axios.post('/auth/login', returningUser)
    setToken(resp.data.token)
    localStorage.setItem('token', resp.data.token)
    if (resp.status === 200 || resp.status === 201) {
      setWasSuccessfullyCreated({
        returningUserInformation: resp.data,
        shouldRedirect: true,
      })
    }
  }

  if (wasSuccessfullyCreated.shouldRedirect) {
    return <Redirect to="/profile" />
  } else {
    return (
      <>
        <form action="" className="login-form" onSubmit={returningUserToApi}>
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
        <Footer className="footer" />
      </>
    )
  }
}

export default Login
