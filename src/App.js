import "./App.css";
import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import { MDBBtn } from "mdbreact";

import Authentication from "./pages/Authentication.jsx";
import Event from "./pages/Event.jsx";
import EventFeedback from "./pages/EventFeedback.jsx";
import EventForm from "./pages/EventForm.jsx";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserEvents from "./pages/UserEvents.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";


class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Authentication}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/home" component={HomePage}/>
                        <Route exact path="/event" component={Event}/>
                        <Route exact path="/event/form" component={EventForm}/>
                        <Route exact path="/profile" component={UserProfile}/>
                        <Route exact path="/user/events" component={UserEvents}/>
                        <Route exact path="/feedback" component={EventFeedback}/>
                        <Route exact path="/404" component={NotFoundPage} />
                        <Redirect to="/404" />
                    </Switch>
                    <Footer />
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
