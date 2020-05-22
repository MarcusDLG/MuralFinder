import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import Search from './pages/Search'
import AddMural from './pages/AddMural'
import './custom.scss'
import MuralDetails from './pages/MuralDetails'
import AddArtist from './pages/AddArtist'
import ViewArtist from './pages/ViewArtist'
import SignUp from './pages/SignUp'
import 'mapbox-gl/dist/mapbox-gl.css'
import Login from './pages/Login'
import Profile from './pages/Profile'
import NewProfile from './pages/NewProfile'
export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/Tampa" component={Home} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/profile"
            render={() => {
              if (localStorage.getItem('token')) {
                return <Profile />
              } else {
                return <Redirect to="/login" />
              }
            }}
          />
          <Route exact path="/newprofile" component={NewProfile} />
          <Route exact path="/find" component={Search} />
          <Route exact path="/addArtist" component={AddArtist} />
          <Route exact path="/artist/:artistId" component={ViewArtist} />
          <Route exact path="/artist/:artistId/add" component={AddMural} />
          <Route exact path="/mural/:muralId" component={MuralDetails} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Layout>
    )
  }
}
