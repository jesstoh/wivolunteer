import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import axios from "axios";

class EventForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventTitle: "",
			dateTime: "",
			limit: 1,
			location: "",
			zipCode: "",
			description: "",
			image: "",
			eventType: [],
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handelChangeCheckbox = this.handelChangeCheckbox.bind(this);
	}
	componentDidMount() {}
	handleChange(event) {
		this.setState({ [event.target.id]: event.target.value });
	}
	handelChangeCheckbox(event) {
		const checkBox = event.target;
		const eventType = this.state.eventType;
		if (checkBox.checked) {
			eventType.push(checkBox.id);
			this.setState(eventType);
		} else {
			let index = eventType.indexOf(checkBox.id);
			if (index > -1) {
				eventType.splice(index, 1);
				this.setState({
					eventType: eventType,
				});
			}
		}
		console.log(this.state.eventType);
	}

	handleSubmit(event) {
		event.preventDefault();
		// set data state
		const data = this.state;
		// get token from localStorage
		const token = localStorage.getItem("token");
		// get id from url params
		const id = this.props.match.params.id;

		// update event
		axios
			.put(`${process.env.REACT_APP_API_URL}/events/${id}/edit`, data, {
				headers: { authorization: `Bearer ${token}` },
			})
			.then((response) => {
				alert("Event Updated");
			})
			.catch((err) => {
				alert(err);
			});
		this.setState(this.initialState);
		// reset the form data
	}

	render() {
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
							value={this.state.eventTitle}
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
									value={this.state.dateTime}
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
									value={this.state.limit}
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
									value={this.state.location}
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
									value={this.state.zipCode}
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
								value={this.state.description}
								onChange={this.handleChange}
							/>
						</div>
						<br />
						<MDBRow>
							<MDBCol size="4">
								<div class="custom-control custom-checkbox">
									<input
										type="checkbox"
										class="custom-control-input"
										id="humanitarian"
										onChange={this.handelChangeCheckbox}
									/>
									<label class="custom-control-label" for="humanitarian">
										Humanitarian
									</label>
								</div>
							</MDBCol>
							<MDBCol size="4">
								<div class="custom-control custom-checkbox">
									<input
										type="checkbox"
										class="custom-control-input"
										id="environment"
										onChange={this.handelChangeCheckbox}
									/>
									<label class="custom-control-label" for="environment">
										Environment
									</label>
								</div>
							</MDBCol>
							<MDBCol size="4">
								<div class="custom-control custom-checkbox">
									<input
										type="checkbox"
										class="custom-control-input"
										id="animal-welfare"
										onChange={this.handelChangeCheckbox}
									/>
									<label class="custom-control-label" for="animal-welfare">
										Animal-Welfare
									</label>
								</div>
							</MDBCol>
						</MDBRow>
						<br />
						<MDBRow>
							<MDBCol size="4">
								<div class="custom-control custom-checkbox">
									<input
										type="checkbox"
										class="custom-control-input"
										id="community"
										onChange={this.handelChangeCheckbox}
									/>
									<label class="custom-control-label" for="community">
										Community
									</label>
								</div>
							</MDBCol>
							<MDBCol size="4">
								<div class="custom-control custom-checkbox">
									<input
										type="checkbox"
										class="custom-control-input"
										id="disability"
										onChange={this.handelChangeCheckbox}
									/>
									<label class="custom-control-label" for="disability">
										Disability
									</label>
								</div>
							</MDBCol>
							<MDBCol size="4">
								<div class="custom-control custom-checkbox">
									<input
										type="checkbox"
										class="custom-control-input"
										id="health"
										onChange={this.handelChangeCheckbox}
									/>
									<label class="custom-control-label" for="health">
										Health
									</label>
								</div>
							</MDBCol>
						</MDBRow>

						<br />
						<label htmlFor="image" className="grey-text">
							Image:
						</label>
						<input
							type="text"
							className="form-control"
							id="image"
							value={this.state.image}
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
