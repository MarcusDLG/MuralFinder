import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PageLoader from '../components/PageLoader'
import SingleMural from '../components/SingleMural'

const MuralDetails = props => {
  console.log(props)
  const muralId = props.match.params.muralId

  const [mural, setMural] = useState({})

  const getMuralData = async () => {
    const resp = await axios.get('/api/murals/' + muralId)
    console.log(resp.data)
    setMural(resp.data)
  }

  useEffect(() => {
    getMuralData()
  }, [])
  if (mural) {
    return <SingleMural mural={mural} />
  } else {
    return <PageLoader />
  }
}

export default MuralDetails
