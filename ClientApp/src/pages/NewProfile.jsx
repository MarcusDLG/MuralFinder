import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, GeolocateControl, Popup } from 'react-map-gl'
// import {
//   Card,
//   CardImg,
//   CardText,
//   CardBody,
//   CardTitle,
//   CardSubtitle,
//   Button,
// } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'

const NewProfile = () => {
  const [profile, setProfile] = useState({
    bookmarks: [{ mural: { latitude: 10, longitude: 10 } }],
  })

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 27.9506,
    longitude: -82.4572,
    zoom: 11,
    interactive: true,
  })

  const [showPopup, setShowPopup] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState({})

  const markerClicked = place => {
    console.log('marker clcked', place)
    setSelectedPlace(place)
    setShowPopup(true)
  }
  useEffect(() => {
    const loadUserProfile = async () => {
      const resp = await axios.get('/api/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log(resp.data)
      setProfile(resp.data)
    }
    loadUserProfile()
  }, [])
  return (
    <>
      <section>hi</section>
      <section>hello</section>
    </>
  )
}

export default NewProfile
