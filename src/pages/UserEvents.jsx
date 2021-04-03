import React, { Component } from "react";
import { MDBContainer, MDBTypography, MDBCol, MDBRow } from "mdbreact";
import EventsContainer from "../components/EventsContainer.jsx";
import axios from "axios";
class UserEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedEvents: [],
			userEvents: {
				interestedEvents: [],
				joinedEvents: [],
				organizedEvents: [],
			},
		};

		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		event.preventDefault();
		// set selected events based on clicked tag
		const selectedEventType = event.target.id;
		this.setState({ selectedEvents: this.state.userEvents[selectedEventType] });
	}

	componentDidMount() {
		// get token from local storage
		const token = localStorage.getItem("token");

		// fetch user events
		axios
			.get(`${process.env.REACT_APP_API_URL}/users/events`, {
				headers: { authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// set user events to state
				this.setState({ userEvents: response.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<React.Fragment>
				<MDBContainer className="text-center mt-4 ">
					<h1>My Events</h1>
					<MDBRow className="mt-4">
						<MDBCol size="4">
							<h5 onClick={this.onClick}>
								<a id="joinedEvents">Particpated Events</a>
							</h5>
						</MDBCol>
						<MDBCol size="4">
							<h5 onClick={this.onClick}>
								<a id="organizedEvents">Organized Events</a>
							</h5>
						</MDBCol>
						<MDBCol size="4">
							<h5 onClick={this.onClick}>
								<a id="interestedEvents">Interested Events</a>
							</h5>
						</MDBCol>
					</MDBRow>
					<br />
					<MDBRow>
						<MDBCol size="12">
							<EventsContainer eventData={this.state.selectedEvents} />
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</React.Fragment>
		);
	}
}

export default UserEvents;
