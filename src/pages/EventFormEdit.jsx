import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { Redirect } from "react-router-dom";
import EventTypeCheckboxes from "../components/EventTypeCheckbox.jsx";
import ImageUploadWidget from "../components/ImageUploadWidget.jsx";
import axios from "axios";
import moment from "moment";
class EventForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDataReady: false,
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
		this.getImageUrl = this.getImageUrl.bind(this);
	}
	componentDidMount() {
		// get token from localStorage
		const token = localStorage.getItem("token");
		// get id from url params
		this.eventID = this.props.match.params.id;

		axios
			.get(`${process.env.REACT_APP_API_URL}/events/${this.eventID}`, {
				headers: { authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// format date to display in dateTime input
				response.data.dateTime = moment(response.data.dateTime)
					.toISOString(true)
					.split(".")[0];
				// set data as state
				this.setState({ formData: response.data, isDataReady: true });
			});
	}
	getImageUrl(imageUrl) {
		this.setState({
			formData: {
				...this.state.formData,
				image: imageUrl,
			},
		});
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
		// format  date time
		data.dateTime = moment(data.dateTime).toISOString(true);
		// get token from localStorage
		const token = localStorage.getItem("token");
		// update event
		axios
			.put(
				`${process.env.REACT_APP_API_URL}/events/${this.eventID}/edit`,
				data,
				{
					headers: { authorization: `Bearer ${token}` },
				}
			)
			.then((response) => {
				this.setState({ isFormSubmitted: true });
			})
			.catch((err) => {
				alert(err);
			});
	}

	render() {
		if (this.state.isFormSubmitted) {
			return <Redirect to={`/event/${this.eventID}`} />;
		}

		return (
			<React.Fragment>
				<MDBContainer className="mt-5 mb-5" size="lg">
					<form onSubmit={this.handleSubmit}>
						<p className="h4 text-center mb-4">Edit Event</p>

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
									value={this.state.formData.dateTime}
									min={
										moment()
											.seconds(0)
											.milliseconds(0)
											.toISOString()
											.split(".")[0]
									}
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

						{this.state.isDataReady ? (
							<EventTypeCheckboxes eventType={this.state.formData.eventType} />
						) : (
							""
						)}

						<br />
						<label htmlFor="image" className="grey-text">
							Update Event Image:
						</label>
						<ImageUploadWidget getImageUrl={this.getImageUrl} />
						<br />

						<div className="text-center mt-4">
							<MDBBtn color="blue" type="submit">
								Update Event
							</MDBBtn>
						</div>
					</form>
				</MDBContainer>
			</React.Fragment>
		);
	}
}

export default EventForm;
