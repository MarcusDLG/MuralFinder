import React, { useState } from 'react'
import Footer from '../components/Footer'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { Alert } from 'reactstrap'
import ImageCarousel from '../components/ImageCarousel'

const Login = () => {
  const [returningUser, setReturningUser] = useState({})
  const [token, setToken] = useState('')
  const [wasSuccessfullyCreated, setWasSuccessfullyCreated] = useState({
    shouldRedirect: false,
    returningUserInformation: {},
  })
  const [visible, setVisible] = useState(false)
  const onClose = () => setVisible(false)

  const updateReturningUserData = e => {
    const key = e.target.name
    const value = e.target.value
    setReturningUser(prevUser => {
      return { ...prevUser, [key]: value }
    })
  }

  const returningUserToApi = async e => {
    e.preventDefault()
    try {
      const resp = await axios.post('/auth/login', returningUser)
      if (resp.status === 200 || resp.status === 201) {
        setToken(resp.data.token)
        localStorage.setItem('token', resp.data.token)
        setWasSuccessfullyCreated({
          returningUserInformation: resp.data,
          shouldRedirect: true,
        })
      }
    } catch (error) {
      setVisible(prevVisible => {
        return { ...prevVisible, visible: true }
      })
    }
  }

  if (wasSuccessfullyCreated.shouldRedirect) {
    return <Redirect to="/profile" />
  } else {
    return (
      <>
        <main className="login-page">
          <form action="" className="login-form" onSubmit={returningUserToApi}>
            <Alert isOpen={visible} toggle={onClose} color="danger">
              <p>Incorrect email or password!</p>
            </Alert>
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
            <p>
              Don't have an account? <Link to="/signUp">Sign Up!</Link>
            </p>
          </form>
          <section className="image-container">
            {/* <img
            src="https://res.cloudinary.com/marcusdlg/image/upload/v1587734230/kynnssohlk9enby7as9t.jpg"
            alt="Sparkman Wharf"
          /> */}
            <ImageCarousel />
          </section>
        </main>
        <Footer className="footer" />
      </>
    )
  }
}

export default Login
