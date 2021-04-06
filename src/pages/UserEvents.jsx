import React, { Component } from "react";
import { MDBContainer, MDBBtn, MDBCol, MDBRow } from "mdbreact";
import EventsContainer from "../components/EventsContainer.jsx";
import axios from "axios";
import userEvent from "@testing-library/user-event";
class UserEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedButton: "joinedEvents",
			noResultMessage: "View your events here.",
			selectedEvents: [],
			userEvents: {
				interestedEvents: [],
				organizedEvents: [],
				joinedEvents: [],
			},
		};

		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		event.preventDefault();
		// set selected events based on clicked tag
		const selectedEventType = event.currentTarget.id;
		this.setState({
			selectedButton: selectedEventType,
			selectedEvents: this.state.userEvents[selectedEventType],
		});
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
					selectedEvents: data.joinedEvents,
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
				<MDBContainer className="mt-4 ">
					<h1 className="text-center">My Events</h1>
					<MDBRow className=" text-center mt-4">
						<MDBCol size="4">
							<MDBBtn
								color="primary"
								size="md"
								id="joinedEvents"
								className="btn-rounded"
								active={
									this.state.selectedButton === "joinedEvents" ? true : false
								}
								onClick={this.onClick}
							>
								Participated Events
							</MDBBtn>
						</MDBCol>
						<MDBCol size="4">
							<MDBBtn
								color="primary"
								size="md"
								id="organizedEvents"
								className="btn-rounded"
								active={
									this.state.selectedButton === "organizedEvents" ? true : false
								}
								onClick={this.onClick}
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
								active={
									this.state.selectedButton === "interestedEvents"
										? true
										: false
								}
								onClick={this.onClick}
							>
								Interested Events
							</MDBBtn>
						</MDBCol>
					</MDBRow>
					<br />
					<MDBRow className="ml-5">
						<MDBCol size="12" className="ml-2">
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
