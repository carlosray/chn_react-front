import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import RestService from '../service/RestService.js';

class AuthenticatedRoute extends Component {
    render() {
        if (RestService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute