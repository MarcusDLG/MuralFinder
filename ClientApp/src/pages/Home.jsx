import React from 'react'
import Hero from '../components/Hero'

export function Home() {
  return (
    <>
      <main>
        <section className="hero">
          <Hero />
        </section>
      </main>
      <section className="who-we-are">
        {/* icon and button to take them to next page */}
      </section>
    </>
  )
}
