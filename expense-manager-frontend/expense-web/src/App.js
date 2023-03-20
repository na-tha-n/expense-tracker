
import './App.css';
import React from 'react';
import NavBar from './components/nav/NavBar';
import LoginPage from './components/containers/LoginPage';
import SignupPage from './components/containers/SignupPage';
import UserTable from './components/tables/UserTable';
import AccountSettingsPage from './components/containers/AccountSettingsPage';
import AddCompanyPage from './components/containers/AddCompanyPage';
import AddDepartmentPage from './components/containers/AddDepartmentPage';
import PrivateRoute from './components/nav/PrivateRoute';
import ExpensePage from './components/containers/ExpensePage';
import JoinCompany from './components/JoinCompany';

import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store.js"
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./store/actions/authAction";
import setAuthToken from './store/utils/setAuthToken';

import Landing from './components/Landing';
import ExpenseTable from './components/tables/ExpenseTable';
import DepartmentTable from './components/tables/DepartmentTable';
import ReportsDashboard from './components/reports/ReportsDashboard';


axios.defaults.baseURL = "http://localhost:5000/api/"

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
     store.dispatch(logoutUser());
     window.location.href = "./login";
   }
}




function App() {
  return (
    <Provider store={store}>
      <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route path="/join/:company" component={JoinCompany} />
            <PrivateRoute exact path="/users" component={UserTable} />
            <PrivateRoute exact path="/departments" component={DepartmentTable} />
            <PrivateRoute exact path="/expenses" component={ExpenseTable} />
            <PrivateRoute exact path="/reports" component={ReportsDashboard} />
            <PrivateRoute exact path="/account" component={AccountSettingsPage} />
            <Route exact path="/addcompany" component={AddCompanyPage} />
            <PrivateRoute exact path="/expense" component={ExpensePage} />
            <PrivateRoute exact path="/department/add" component={AddDepartmentPage} />
          </Switch>
      </Router >
    </Provider>
  );
}

export default App;
