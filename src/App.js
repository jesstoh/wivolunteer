import "./App.css";
import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import axios from "axios";

import Authentication from "./pages/Authentication.jsx";
import Event from "./pages/Event.jsx";
import EventFeedback from "./pages/EventFeedback.jsx";
import EventForm from "./pages/EventForm.jsx";
import EventFormEdit from "./pages/EventFormEdit.jsx";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserEvents from "./pages/UserEvents.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import UserProfileEdit from "./pages/UserProfileEdit.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import Header from "./components/Header.jsx";
import HeaderPublic from "./components/HeaderPublic.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: null,
			token: "",
			user: null,
		};
		this.handleLogout = this.handleLogout.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.updateHeader = this.updateHeader.bind(this);
	}

	// Check if user is login when page load
	componentDidMount() {
		// Retrieve token from local storage
		const token = localStorage.getItem("token");
		if (token) {
			// Check validity of token
			axios
				.get(`${process.env.REACT_APP_API_URL}/users/authenticate`, {
					headers: { authorization: `Bearer ${token}` },
				})
				.then((response) => {
					// If token is valid, set isAuthenticated as true to redirect user to home page
					this.setState({
						isAuthenticated: true,
						token: token,
						user: response.data,
					});
				})
				.catch((err) => {

             this.handleLogout();

				});
		} else {
			this.setState({ isAuthenticated: false });
		}
	}

	// Log user out if click on logout button or token invalid
	handleLogout() {
		localStorage.removeItem("token");
		this.setState({ isAuthenticated: false, token: "", user: null });
	}

	handleLogin(token, user) {
		localStorage.setItem("token", token);
		this.setState({ isAuthenticated: true, token: token, user: user });
	}

	updateHeader(username) {
		this.setState({user: {...this.state.user, username: username}})
	}

	render() {
		return this.state.isAuthenticated === null ? null : (
			<React.Fragment>
				<Router>
					{this.state.isAuthenticated ? (
						<Header user={this.state.user} handleLogout={this.handleLogout} />
					) : (
						<HeaderPublic />
					)}
					<main>
						<Switch>
							<PublicRoute
								exact
								path="/"
								isAuthenticated={this.state.isAuthenticated}
								component={Authentication}
							/>
							<PublicRoute
								exact
								path="/login"
								isAuthenticated={this.state.isAuthenticated}
								component={Login}
								handleLogin={this.handleLogin}
							/>
							<PublicRoute
								exact
								path="/register"
								isAuthenticated={this.state.isAuthenticated}
								component={Register}
								handleLogin={this.handleLogin}
							/>
							<ProtectedRoute
								exact
								path="/home"
								isAuthenticated={this.state.isAuthenticated}
								handleLogout={this.handleLogout}
								component={HomePage}
							/>
							<ProtectedRoute
								exact
								path="/event/form"
								isAuthenticated={this.state.isAuthenticated}
								handleLogout={this.handleLogout}
								component={EventForm}
							/>

							<ProtectedRoute
								exact
								path="/event/edit/:id"
								isAuthenticated={this.state.isAuthenticated}
								handleLogout={this.handleLogout}
								component={EventFormEdit}
							/>

							<ProtectedRoute
								exact
								path="/event/:id"
								isAuthenticated={this.state.isAuthenticated}
								handleLogout={this.handleLogout}
								component={Event} user={this.state.user}
							/>

							<ProtectedRoute
								exact
								path="/profile/edit"
								isAuthenticated={this.state.isAuthenticated}
								handleLogout={this.handleLogout} updateHeader={this.updateHeader}
								component={UserProfileEdit}
							/>
							<ProtectedRoute
								exact
								path="/profile"
								isAuthenticated={this.state.isAuthenticated}
								handleLogout={this.handleLogout}
								component={UserProfile}
							/>
							<ProtectedRoute
								exact
								path="/user/events"
								isAuthenticated={this.state.isAuthenticated}
								handleLogout={this.handleLogout}
								component={UserEvents}
							/>
							<ProtectedRoute
								exact
								path="/feedback/:id"
								isAuthenticated={this.state.isAuthenticated}
								handleLogout={this.handleLogout}
								component={EventFeedback}
							/>
							<Route exact path="/404" component={NotFoundPage} />
							<Redirect to="/404" />
						</Switch>
					</main>
					<Footer />
				</Router>
			</React.Fragment>
		);
	}
}

export default App;
