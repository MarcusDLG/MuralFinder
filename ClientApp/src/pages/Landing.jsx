import React from 'react'

const Landing = () => {
  return (
    <>
      <section className="cities">
        <section className="tampa">
          {/* tampa card and link to tampa homepage */}
        </section>
        <section className="stp">
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
