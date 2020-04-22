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
    // console.log(returningUser)
  }

  const returningUserToApi = async e => {
    e.preventDefault()
    // console.log('sending returning user', returningUser)
    const resp = await axios.post('/auth/login', returningUser)
    // console.log(resp.data)
    setToken(resp.data.token)
    // console.log(token)
    localStorage.setItem('token', resp.data.token)
    if (resp.status === 200 || resp.status === 201) {
      // do something something else
      setWasSuccessfullyCreated({
        returningUserInformation: resp.data,
        shouldRedirect: true,
      })
      // console.log(wasSuccessfullyCreated.returningUserInformation)
    }
  }

  // const getSecretInformation = async () => {
  //   const resp = await axios.get('/api/secret', {
  //     headers: {
  //       Authorization: 'Bearer ' + token,
  //     },
  //   })

  //   console.log(resp.data)
  // }
  if (wasSuccessfullyCreated.shouldRedirect) {
    // console.log(wasSuccessfullyCreated.shouldRedirect)
    return <Redirect to="/profile" />
  } else {
    return (
      <>
        {/* <button onClick={getSecretInformation}>test auth</button> */}
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
