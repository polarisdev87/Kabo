import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { history } from './utils'
import { PrivateRoute } from './route'
import LoginPage from './pages/login'
import AccountPage from './pages/account'
import AllOrdersPage from './pages/order'
import { Navbar } from './components/navbar'
import { Alert } from './components/alert'
import ProfilePage from './pages/profile'
import EditPlan from './pages/meal-plan'

function App() {
  return (
    <div className="h-screen container">
      <Navbar />
      <Alert />
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/edit-plan/:id" component={EditPlan} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/orders" exact component={AllOrdersPage} />
          <PrivateRoute component={AccountPage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default connect(null, null)(App)
