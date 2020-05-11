import React, { useState } from 'react'
import Footer from '../components/Footer'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { Alert } from 'reactstrap'
import '../Styles/sign-up-login.scss'
import ImageCarousel from '../components/ImageCarousel'

const SignUp = () => {
  const [newUser, setNewUser] = useState({})
  const [wasSuccessfullyCreated, setWasSuccessfullyCreated] = useState({
    shouldRedirect: false,
    newUserInformation: {},
  })
  const [visible, setVisible] = useState(false)
  const onClose = () => setVisible(false)

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
    // console.log('sending new user', newUser)
    try {
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
    } catch (error) {
      setVisible(prevVisible => {
        return { ...prevVisible, visible: true }
      })
    }
  }

  if (wasSuccessfullyCreated.shouldRedirect) {
    console.log(wasSuccessfullyCreated.shouldRedirect)
    return <Redirect to="/profile" />
  } else {
    return (
      <>
        <form className="sign-up" onSubmit={newUserToApi}>
          <Alert isOpen={visible} toggle={onClose} color="danger">
            <p>Password must be at least 7 characters long!</p>
          </Alert>
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
          <p>
            Already have an account? <Link to="/login">Log In!</Link>
          </p>
        </form>
        <section className="image-container">
          <ImageCarousel />
          {/* <img
            src="https://res.cloudinary.com/marcusdlg/image/upload/v1587502300/bbgszkkaxqpsyb36ra53.jpg"
            alt="Sparkman Wharf"
          /> */}
        </section>
        <Footer />
      </>
    )
  }
}

export default SignUp
