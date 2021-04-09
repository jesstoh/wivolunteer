import React, { Component } from "react";
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardTitle,
	MDBCardBody,
	MDBBCardText,
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
				contact: "",
				address: "",
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
								style={{ height: "150px", width: "150px", objectFit: "cover" }}
								className="rounded-circle img-thumbnail mx-auto d-block m-3"
								alt="profile image"
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow className="mb-4">
						<MDBCol>
							<h3 className=" font-weight-bolder">
								{this.state.userProfile.username}
							</h3>
						</MDBCol>
					</MDBRow>
					<MDBCard>
						<MDBCardBody>
							<MDBRow>
								<MDBCol xl="12" className="mt-3 ">
									<h5 className="mb-4 text-center">
										<MDBIcon icon="envelope" className="mr-2" />
										{this.state.userProfile.email}
									</h5>

									<h5>
										<MDBIcon icon="phone" className="mr-2 ml-2" />
										{this.state.userProfile.contact}
									</h5>

									<h5>
										<MDBIcon icon="map-marked" className="mr-3" />
										{this.state.userProfile.address}
									</h5>
								</MDBCol>
							</MDBRow>
							<MDBRow>
								<MDBCol xl="12" className="mt-3">
									<h5>
										<MDBIcon icon="heart" />
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
								</MDBCol>
							</MDBRow>
						</MDBCardBody>
					</MDBCard>
					<Link to="/profile/edit">
						<MDBBtn color="blue" type="submit" className="mb-4 mt-5">
							Edit Profile
						</MDBBtn>
					</Link>
				</MDBContainer>
			</React.Fragment>
		);
	}
}

export default UserProfile;
