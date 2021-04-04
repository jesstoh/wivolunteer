import React, { Component } from "react";
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBBadge,
	MDBBtn,
	MDBIcon,
} from "mdbreact";
import { Link } from "react-router-dom";
import EventsContainer from "../components/EventsContainer.jsx";
import axios from "axios";
class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
										<MDBBadge
											key={interest}
											pill
											color="primary"
											className="m-2"
										>
											{interest}
										</MDBBadge>
									);
							  })}
					</h5>
					<Link to="/profile/edit">
						<MDBBtn color="blue" outline type="submit" className="mb-4">
							Edit Profile
						</MDBBtn>
					</Link>
					{/* User event participation/ organisation statistic goes here */}
				</MDBContainer>
			</React.Fragment>
		);
	}
}

export default UserProfile;
