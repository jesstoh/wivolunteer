import React, { Component } from 'react';
import { MDBContainer, MDBTypography, MDBCol, MDBRow } from 'mdbreact';
import axios from 'axios';
class UserEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userEvents: {},
		};

		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		event.preventDefault();
	}

	componentDidMount() {
		// get token from local storage
		const token = localStorage.getItem('token');

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
				<MDBContainer className='text-center mt-4 '>
					<h1>My Events</h1>
					<MDBRow className='mt-4'>
						<MDBCol size='4'>
							<h5 onClick={this.onClick}>
								<a>Current Events</a>
							</h5>
						</MDBCol>
						<MDBCol size='4'>
							<h5 onClick={this.onClick}>
								<a>Leave Feedback</a>
							</h5>
						</MDBCol>
						<MDBCol size='4'>
							<h5 onClick={this.onClick}>
								<a>Past Events</a>
							</h5>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</React.Fragment>
		);
	}
}

export default UserEvents;
