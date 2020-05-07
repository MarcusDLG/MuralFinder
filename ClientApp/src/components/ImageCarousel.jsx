import React, { useState } from 'react'
import { UncontrolledCarousel } from 'reactstrap'
import '../Styles/carousel.scss'

const ImageCarousel = () => {
  const items = [
    {
      src:
        'https://res.cloudinary.com/marcusdlg/image/upload/v1587399399/oyrg5p06lcvsiwr6q0uu.jpg',
      altText: 'You Are Beautiful Mural',
    },
    {
      src:
        'https://res.cloudinary.com/marcusdlg/image/upload/v1587847856/tcdrcdzm9dsfctiae1yh.jpg',
      altText: 'Red Star Rock Bar Mural',
    },
    {
      src:
        'https://res.cloudinary.com/marcusdlg/image/upload/v1587502300/bbgszkkaxqpsyb36ra53.jpg',
      altText: 'Love and Peace Mural',
    },
  ]

  return (
    <UncontrolledCarousel
      className="carousel"
      items={items}
    ></UncontrolledCarousel>
  )
}

export default ImageCarousel
