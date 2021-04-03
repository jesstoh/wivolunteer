import React, { Component } from "react";
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBBadge,
	MDBBtn,
	MDBIcon,
} from "mdbreact";
import EventsContainer from "../components/EventsContainer.jsx";
import axios from "axios";
class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapseID: "",
			userProfile: {
				email: "",
				interestedEvents: [],
				interests: [],
				username: "",
				image: "",
			},
		};
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
				this.setState({ userProfile: response.data });
			});
	}

	render() {
		console.log(this.state.userProfile);
		return (
			<React.Fragment>
				<MDBContainer className="mt-4 text-center">
					<h1>My Profile</h1>
					<MDBRow>
						<MDBCol>
							<img
								src={this.state.userProfile.image}
								className="rounded-circle mx-auto d-block m-3"
								alt="profile image"
							/>
						</MDBCol>
					</MDBRow>
					<h5>
						<MDBIcon icon="user" className="mr-3" />
						{this.state.userProfile.username}
					</h5>
					<h5>
						<MDBIcon icon="envelope" className="mr-3" />
						{this.state.userProfile.email}
					</h5>
					<h5>
						<span>Interests: </span>
						{!this.state.userProfile
							? ""
							: this.state.userProfile.interests.map((interest) => {
									return (
										<MDBBadge pill color="primary" className="m-2">
											{interest}
										</MDBBadge>
									);
							  })}
					</h5>

					<MDBBtn color="blue" outline type="submit" className="mb-4">
						<a href="/profile/edit">Edit Profile</a>
					</MDBBtn>
					<h5>Interested Events</h5>
					<EventsContainer
						eventData={this.state.userProfile.interestedEvents}
					/>
				</MDBContainer>
			</React.Fragment>
		);
	}
}

export default UserProfile;
