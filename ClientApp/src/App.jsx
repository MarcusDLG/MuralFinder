import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import NotFound from './pages/NotFound'
import Search from './pages/Search'
import AddMural from './pages/AddMural'
import './custom.scss'
import MuralDetails from './pages/MuralDetails'
import AddArtist from './pages/AddArtist'
import AddImage from './pages/AddImage'
export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/find" component={Search} />
          <Route exact path="/addArtist" component={AddArtist} />
          <Route exact path="/artist/:artistId" component={AddMural} />
          <Route exact path="/addImage/:muralId" component={AddImage} />
          <Route exact path="/mural/:muralId" component={MuralDetails} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Layout>
    )
  }
}
