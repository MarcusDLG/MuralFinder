import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import PostMural from '../components/PostMural'
import Footer from '../components/Footer'

const AddMural = () => {
  return (
    <>
      <PostMural />
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default AddMural
