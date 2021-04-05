import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import EventTypeCheckboxes from "../components/EventTypeCheckbox.jsx";
import { Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";
class EventForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFormSubmitted: false,
			eventID: "",
			formData: {
				eventTitle: "",
				dateTime: "",
				limit: 1,
				location: "",
				zipCode: "",
				description: "",
				image: "",
				eventType: [],
			},
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			formData: {
				...this.state.formData,
				[event.target.id]: event.target.value,
			},
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		// set data state
		const data = this.state.formData;
		// get token from localStorage
		const token = localStorage.getItem("token");

		// create event
		axios
			.post(`${process.env.REACT_APP_API_URL}/events`, data, {
				headers: { authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({ isFormSubmitted: true, eventID: response.data._id });
			})
			.catch((err) => {
				alert(err);
			});
	}

	render() {
		if (this.state.isFormSubmitted) {
			return <Redirect to={`/event/${this.state.eventID}`} />;
		}

		return (
			<React.Fragment>
				<MDBContainer className="mt-5 mb-5" size="lg">
					<form onSubmit={this.handleSubmit}>
						<p className="h4 text-center mb-4">Create an Event</p>

						<label htmlFor="eventTitle" className="grey-text">
							Event Title
						</label>
						<input
							type="text"
							className="form-control"
							id="eventTitle"
							value={this.state.formData.eventTitle}
							onChange={this.handleChange}
						/>
						<br />

						<MDBRow>
							<MDBCol size="6">
								<label htmlFor="dateTime" className="grey-text">
									Date/Time:
								</label>
								<input
									type="datetime-local"
									className="form-control"
									id="dateTime"
									min={
										moment()
											.seconds(0)
											.milliseconds(0)
											.toISOString()
											.split(".")[0]
									}
									value={this.state.formData.dateTime}
									onChange={this.handleChange}
								/>
								<br />
							</MDBCol>
							<MDBCol size="6">
								<label htmlFor="limit" className="grey-text">
									Participant Limit:
								</label>
								<input
									type="number"
									className="form-control"
									id="limit"
									min="1"
									value={this.state.formData.limit}
									onChange={this.handleChange}
								/>
								<br />
							</MDBCol>
						</MDBRow>

						<br />
						<MDBRow>
							<MDBCol size="6">
								<label htmlFor="location" className="grey-text">
									Location:
								</label>
								<input
									type="text"
									className="form-control"
									id="location"
									value={this.state.formData.location}
									onChange={this.handleChange}
								/>
							</MDBCol>
							<MDBCol size="6">
								<label htmlFor="zipCode" className="grey-text">
									Postal Code:
								</label>
								<input
									type="text"
									className="form-control"
									id="zipCode"
									value={this.state.formData.zipCode}
									onChange={this.handleChange}
								/>
							</MDBCol>
						</MDBRow>

						<br />

						<div>
							<label htmlFor="description" className="grey-text">
								Event Description:
							</label>
							<textarea
								type="text"
								id="description"
								className="form-control"
								rows="3"
								value={this.state.formData.description}
								onChange={this.handleChange}
							/>
						</div>
						<br />

						<EventTypeCheckboxes eventType={this.state.formData.eventType} />

						<br />
						<label htmlFor="image" className="grey-text">
							Image:
						</label>
						<input
							type="text"
							className="form-control"
							id="image"
							value={this.state.formData.image}
							onChange={this.handleChange}
						/>
						<div className="text-center mt-4">
							<MDBBtn color="blue" outline type="submit">
								Create Event
							</MDBBtn>
						</div>
					</form>
				</MDBContainer>
			</React.Fragment>
		);
	}
}

export default EventForm;
