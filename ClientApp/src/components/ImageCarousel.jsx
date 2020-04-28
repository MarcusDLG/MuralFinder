import React, { useState } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap'
import '../Styles/carousel.scss'

const ImageCarousel = () => {
  const items = [
    {
      src:
        'https://res.cloudinary.com/marcusdlg/image/upload/v1587399399/oyrg5p06lcvsiwr6q0uu.jpg',
      altText: 'You Are Beautiful Mural',
      // caption: 'Slide 1',
    },
    {
      src:
        'https://res.cloudinary.com/marcusdlg/image/upload/v1587847856/tcdrcdzm9dsfctiae1yh.jpg',
      altText: 'Red Star Rock Bar Mural',
      // caption: 'Slide 2',
    },
    {
      src:
        'https://res.cloudinary.com/marcusdlg/image/upload/v1587502300/bbgszkkaxqpsyb36ra53.jpg',
      altText: 'Love and Peace Mural',
      // caption: 'Slide 3',
    },
  ]
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const next = () => {
    if (animating) return
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = newIndex => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  return (
    <Carousel
      className="carousel"
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {items.map(item => {
        return (
          <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
          >
            <img className="image" src={item.src} alt={item.altText} />
            <CarouselCaption
              captionText={item.caption}
              captionHeader={item.caption}
            />
          </CarouselItem>
        )
      })}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  )
}

export default ImageCarousel
