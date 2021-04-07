import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import EventTypeCheckboxes from "../components/EventTypeCheckbox.jsx";
import ImageUploadWidget from "../components/ImageUploadWidget.jsx";
import { Redirect } from "react-router-dom";

import axios from "axios";

class UserProfileEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDataReady: false,
			isFormSubmitted: false,
			userProfile: {
				email: "",
				interests: [],
				username: "",
				image: "",
				contact: "",
				address: "",
			},
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getImageUrl = this.getImageUrl.bind(this);
	}

	componentDidMount() {
		// retrieve token from local storage
		const token = localStorage.getItem("token");

		// get user profile
		axios
			.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
				headers: { authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// set fetched profile as state
				this.setState({ userProfile: response.data, isDataReady: true });
			});
	}
	getImageUrl(imageUrl) {
		this.setState({
			userProfile: {
				...this.state.userProfile,
				image: imageUrl,
			},
		});
	}
	handleChange(event) {
		event.preventDefault();
		// update userProfile based on event target id
		this.setState({
			userProfile: {
				...this.state.userProfile,
				[event.target.id]: event.target.value,
			},
		});
	}
	handleSubmit(event) {
		event.preventDefault();
		const token = localStorage.getItem("token");
		const data = this.state.userProfile;
		axios
			.put(`${process.env.REACT_APP_API_URL}/users/profile`, data, {
				headers: { authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({ isFormSubmitted: true });
			})
			.catch((err) => {
				alert(err);
			});
	}

	render() {
		if (this.state.isFormSubmitted) {
			return <Redirect to="/profile" />;
		}

		return (
			<React.Fragment>
				<MDBContainer className="mt-5">
					<p className="h4 text-center mb-4">Update My Profile</p>

					<form onSubmit={this.handleSubmit}>
						<label htmlFor="username" className="grey-text">
							Username:
						</label>
						<input
							type="text"
							className="form-control"
							id="username"
							value={this.state.userProfile.username}
							onChange={this.handleChange}
						/>

						<br />
						<MDBRow>
							<MDBCol size="6">
								<label htmlFor="contact" className="grey-text">
									Contact:
								</label>
								<input
									type="text"
									className="form-control"
									id="contact"
									value={this.state.userProfile.contact}
									onChange={this.handleChange}
								/>
							</MDBCol>
							<MDBCol size="6">
								<label htmlFor="address" className="grey-text">
									Address:
								</label>
								<input
									type="text"
									className="form-control"
									id="address"
									value={this.state.userProfile.address}
									onChange={this.handleChange}
								/>
							</MDBCol>
						</MDBRow>
						<br />
						{this.state.isDataReady ? (
							<EventTypeCheckboxes
								eventType={this.state.userProfile.interests}
							/>
						) : (
							""
						)}

						<br />
						<label htmlFor="image" className="grey-text">
							Upload Profile Image:
						</label>
						<ImageUploadWidget getImageUrl={this.getImageUrl} />
						<br />

						<label className="grey-text">Image Preview:</label>
						<img
							src={this.state.userProfile.image}
							style={{ height: "150px", width: "150px", objectFit: "cover" }}
							className="rounded-circle img-thumbnail mx-auto d-block m-3"
							alt="profile image"
							onChange={this.handleChange}
						/>
						<div className="text-center mt-4">
							<MDBBtn color="blue" type="submit">
								Update
							</MDBBtn>
						</div>
					</form>
				</MDBContainer>
			</React.Fragment>
		);
	}
}

export default UserProfileEdit;
