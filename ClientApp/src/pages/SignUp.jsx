import React, { useState } from 'react'
import Footer from '../components/Footer'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'
import '../Styles/sign-up-login.scss'

const SignUp = () => {
  const [newUser, setNewUser] = useState({})
  const [wasSuccessfullyCreated, setWasSuccessfullyCreated] = useState({
    shouldRedirect: false,
    newUserInformation: {},
  })

  const updateNewUserData = e => {
    const key = e.target.name
    const value = e.target.value
    setNewUser(prevUser => {
      return { ...prevUser, [key]: value }
    })
    console.log(newUser)
  }

  const newUserToApi = async e => {
    e.preventDefault()
    console.log('sending new user', newUser)
    const resp = await axios.post('/auth/signup', newUser)
    localStorage.setItem('token', resp.data.token)
    if (resp.status === 200 || resp.status === 201) {
      // do something something else
      setWasSuccessfullyCreated({
        newUserInformation: resp.data,
        shouldRedirect: true,
      })
      console.log(wasSuccessfullyCreated.newUserInformation)
    }
  }

  if (wasSuccessfullyCreated.shouldRedirect) {
    console.log(wasSuccessfullyCreated.shouldRedirect)
    return <Redirect to="/profile" />
  } else {
    return (
      <>
        <form className="sign-up" onSubmit={newUserToApi}>
          <label htmlFor="">Full Name</label>
          <input
            type="text"
            name="FullName"
            placeholder="John Doe"
            onChange={updateNewUserData}
          />
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="Email"
            placeholder="John.Doe@JD.com"
            onChange={updateNewUserData}
          />
          <label htmlFor="">Password</label>
          <input type="password" name="Password" onChange={updateNewUserData} />
          <Button color="secondary">Submit</Button>
        </form>
        <section className="image-container">
          <img
            src="https://res.cloudinary.com/marcusdlg/image/upload/v1587502300/bbgszkkaxqpsyb36ra53.jpg"
            alt="Sparkman Wharf"
          />
        </section>
        <Footer />
      </>
    )
  }
}

export default SignUp
