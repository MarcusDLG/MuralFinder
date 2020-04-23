import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'

const AddMural = props => {
  console.log(props)
  const artistId = props.match.params.artistId
  const [mural, setMural] = useState({})
  const [wasSuccessfullyPosted, setWasSuccessfullyPosted] = useState({
    shouldRedirect: false,
    newMuralInformation: {},
  })

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    const fileToUpload = acceptedFiles[0]
    const formData = new FormData()
    formData.append('file', fileToUpload)
    axios
      .post('/file/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          accept: 'application / json',
        },
      })
      .then(resp => {
        console.log(resp.data)
        // const key = mural.imageUrl
        // const value = resp.data.secureUri
        setMural(prevMural => {
          prevMural.imageUrl = resp.data.secureUri
          return prevMural
        })
      })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const updateMuralData = e => {
    const key = e.target.name
    const value = e.target.value
    setMural(prevMural => {
      prevMural[key] = value
      return prevMural
    })
  }
  const addMuralToApi = async e => {
    e.preventDefault()
    // console.log('adding', mural)
    const resp = await axios.post(`/api/artists/${artistId}/murals`, mural)
    console.log(resp.data)
    if (resp.status === 201 || resp.status === 200) {
      setWasSuccessfullyPosted({
        shouldRedirect: true,
        newMuralInformation: resp.data,
      })
    } else {
      //do something here
    }
  }

  if (wasSuccessfullyPosted.shouldRedirect) {
    return (
      <Redirect
        to={{
          state: { mural: wasSuccessfullyPosted.newMuralInformation },
          pathname: `/mural/${wasSuccessfullyPosted.newMuralInformation.id}`,
        }}
      />
    )
  } else {
    return (
      <>
        <div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        </div>
        <main className="mural-submission">
          <form onSubmit={addMuralToApi}>
            <section>
              <label htmlFor="">Name</label>
              <input type="text" name="Name" onChange={updateMuralData} />
            </section>
            <section>
              <label htmlFor="">Description</label>
              <input
                type="text"
                name="Description"
                onChange={updateMuralData}
              />
            </section>
            <section>
              <label htmlFor="">City</label>
              <input type="text" name="City" onChange={updateMuralData} />
            </section>
            <section>
              <label htmlFor="">State</label>
              <input type="text" name="State" onChange={updateMuralData} />
            </section>
            <section>
              <label htmlFor="">Address</label>
              <input type="text" name="Address" onChange={updateMuralData} />
            </section>
            <section>
              <label htmlFor="">Latitude</label>
              <input
                type="number"
                step="any"
                name="Latitude"
                onChange={updateMuralData}
                min="-1000"
                max="1000"
              />
            </section>
            <section>
              <label htmlFor="">Longitude</label>
              <input
                type="number"
                step="any"
                name="Longitude"
                onChange={updateMuralData}
                min="-1000"
                max="1000"
              />
            </section>
            <Button color="secondary">Submit</Button>
          </form>
        </main>
      </>
    )
  }
}

export default AddMural
