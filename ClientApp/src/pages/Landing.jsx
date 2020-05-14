import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/landing.scss'

const Landing = () => {
  return (
    <>
      <section className="cities">
        <h1>Please choose your city below!</h1>
        <section className="tampa">
          <Link to="/">Tampa</Link>
          {/* tampa card and link to tampa homepage */}
        </section>
        <section className="stp">
          <section className="coming-soon">St. Petersburg</section>

          {/* stp card and link to st. pete homepage. Greyed out for now. */}
        </section>
        <section className="future">
          <h1>Have somewhere that you think we should be checking out?</h1>
          <p>
            Send us an email!{' '}
            <a href="mailto:muralbooktampa@gmail.com">
              MuralFinder Suggestions
            </a>
          </p>
        </section>
      </section>
    </>
  )
}

export default Landing
