import React, { Component } from "react";
import { MDBContainer, MDBBtn, MDBCol, MDBRow } from "mdbreact";
import EventsContainer from "../components/EventsContainer.jsx";
import axios from "axios";
class UserEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			noResultMessage: "View your events here.",
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
		const selectedEventType = event.currentTarget.id;
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
				// store fetched data
				const data = response.data;
				// set user events into state
				this.setState({
					userEvents: data,
					selectedEvents: data.organizedEvents,
					noResultMessage: "No events avaliable to display.",
				});
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
							<MDBBtn
								color="primary"
								size="md"
								id="joinedEvents"
								className="btn-rounded"
								onClick={this.onClick}
								rounded
							>
								Particpated Events
							</MDBBtn>
						</MDBCol>
						<MDBCol size="4">
							<MDBBtn
								color="primary"
								size="md"
								id="organizedEvents"
								className="btn-rounded"
								onClick={this.onClick}
								rounded
							>
								Organized Events
							</MDBBtn>
						</MDBCol>
						<MDBCol size="4">
							<MDBBtn
								color="primary"
								size="md"
								id="interestedEvents"
								className="btn-rounded"
								onClick={this.onClick}
								rounded
							>
								Interested Events
							</MDBBtn>
						</MDBCol>
					</MDBRow>
					<br />
					<MDBRow>
						<MDBCol size="12">
							<EventsContainer
								eventData={this.state.selectedEvents}
								noResultMessage={this.state.noResultMessage}
							/>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</React.Fragment>
		);
	}
}

export default UserEvents;
