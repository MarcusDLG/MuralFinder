import React from 'react'
import Hero from '../components/Hero'
import HomePage from '../components/HomePage'
import Footer from '../components/Footer'
import '../Styles/home-page.scss'
import ImageCarousel from '../components/ImageCarousel'

export function Home() {
  return (
    <>
      <main className="home-main">
        <section className="hero">
          <Hero />
        </section>
        <HomePage />
        <ImageCarousel />
      </main>
      <Footer />
    </>
  )
}
