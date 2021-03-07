/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Route, Router, Switch} from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import LoginComponent from "./components/LoginComponent";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import NotFoundPage from "./layouts/NotFoundPage";
import RegisterComponent from "./components/RegisterComponent";
import RestService from "./service/RestService";

const hist = createBrowserHistory();
RestService.setupAxiosInterceptors();

function getRoutes() {
    if (RestService.isUserLoggedIn()) {
        return (
            <Route path="/admin" exact component={AdminLayout}/>
        );
    } else {
        return null;
    }
}

ReactDOM.render(
  <Router history={hist}>
    <Switch>
        {getRoutes()}
        <Route path="/" exact component={LoginComponent} />
        <Route path="/login" exact component={LoginComponent} />
        <Route path="/register" exact component={RegisterComponent} />
        <AuthenticatedRoute path="/admin/*" exact component={AdminLayout} />
        <AuthenticatedRoute path="/admin" exact component={AdminLayout} />
        <Route path="*" component={NotFoundPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
