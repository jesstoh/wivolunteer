import React, { Component } from 'react';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBBtn,
	MDBIcon,
	MDBCollapse,
} from 'mdbreact';
import axios from 'axios';
class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapseID: '',
			userProfile: { interestedEvents: ['asdasda', 'asdasdas'] },
		};
		this.toggleCollapse = this.toggleCollapse.bind(this);
	}
	toggleCollapse = (collapseID) => () => {
		this.setState((prevState) => ({
			collapseID: prevState.collapseID !== collapseID ? collapseID : '',
		}));
	};

	componentDidMount() {
		// retrieve token from local storage
		const token = localStorage.getItem('token');

		// get user profile
		axios
			.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
				headers: { authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// set user profile as state
				this.setState({ userProfile: response.data });
				//interested events interests
			});
	}

	render() {
		return (
			<React.Fragment>
				<MDBContainer className='mt-4 text-center'>
					<h1>My Profile</h1>
					<MDBRow>
						<MDBCol>
							<img
								src='https://image.flaticon.com/icons/png/128/1946/1946429.png'
								className='rounded-circle mx-auto d-block img-th m-5'
								alt='aligment'
							/>
						</MDBCol>
					</MDBRow>

					<h2>
						<MDBIcon icon='user' className='mr-3' />
						{this.state.userProfile.username}
					</h2>
					<h2>
						<MDBIcon icon='envelope' className='mr-3' />
						{this.state.userProfile.email}
					</h2>
					<MDBBtn
						color='primary'
						onClick={this.toggleCollapse('basicCollapse')}
					>
						COLLAPSE BUTTON
					</MDBBtn>
					<MDBCollapse
						id='basicCollapse'
						isOpen={this.state.collapseID}
					></MDBCollapse>
				</MDBContainer>
			</React.Fragment>
		);
	}
}

export default UserProfile;
