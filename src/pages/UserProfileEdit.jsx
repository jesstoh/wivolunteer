import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import axios from 'axios';

class UserProfileEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			image: '',
			interests: [],
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// retrieve token from local storage
		const token = localStorage.getItem('token');

		// get user profile
		axios
			.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
				headers: { authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// set fetched profile as state
				this.setState(response.data);
			});
	}

	handleChange(event) {
		event.preventDefault();
		this.setState({ [event.target.id]: event.target.value });
	}
	handleSubmit(event) {
		event.preventDefault();

		const token = localStorage.getItem('token');
		const data = {
			email: this.state.email,
			username: this.state.username,
			image: this.state.image,
		};
		axios
			.put(`${process.env.REACT_APP_API_URL}/users/profile`, data, {
				headers: { authorization: `Bearer ${token}` },
			})
			.then((response) => {
				alert('User profile updated successfully');
			})
			.catch((err) => {
				alert(err);
			});
	}

	render() {
		return (
			<React.Fragment>
				<MDBContainer className='mt-5'>
					<p className='h4 text-center mb-4'>Update My Profile</p>

					<form onSubmit={this.handleSubmit}>
						<MDBRow>
							<MDBCol size='6'>
								<label htmlFor='email' className='grey-text'>
									Email:
								</label>
								<input
									type='text'
									className='form-control'
									id='email'
									value={this.state.email}
									onChange={this.handleChange}
								/>
							</MDBCol>
							<MDBCol size='6'>
								<label htmlFor='username' className='grey-text'>
									Username
								</label>
								<input
									type='text'
									className='form-control'
									id='username'
									value={this.state.username}
									onChange={this.handleChange}
								/>
							</MDBCol>
						</MDBRow>
						<br />
						<label htmlFor='image' className='grey-text'>
							Image:
						</label>
						<input
							type='text'
							className='form-control'
							id='image'
							value={this.state.image}
							onChange={this.handleChange}
						/>

						<div className='text-center mt-4'>
							<MDBBtn color='blue' outline type='submit'>
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
