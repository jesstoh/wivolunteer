import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import axios from 'axios';

class EventForm extends Component {
	constructor(props) {
		super(props);
		// set initial state of form data
		this.initialState = {
			eventTitle: '',
			dateTime: '',
			limit: 1,
			location: '',
			zipCode: '',
			description: '',
			image: '',
		};
		// set as initial state
		this.state = this.initialState;

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.id]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		// set data state
		const data = this.state;
		// get token from localStorage
		const token = localStorage.getItem('token');

		// create event
		axios
			.post(`${process.env.REACT_APP_API_URL}/events`, data, {
				headers: { authorization: `Bearer ${token}` },
			})
			.then((response) => {
				alert('Event Created');
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
				<MDBContainer className='mt-5'>
					<form onSubmit={this.handleSubmit}>
						<p className='h4 text-center mb-4'>Create an Event</p>

						<label htmlFor='eventTitle' className='grey-text'>
							Event Title
						</label>
						<input
							type='text'
							className='form-control'
							id='eventTitle'
							value={this.state.eventTitle}
							onChange={this.handleChange}
						/>
						<br />

						<MDBRow>
							<MDBCol size='6'>
								<label htmlFor='dateTime' className='grey-text'>
									Date/Time:
								</label>
								<input
									type='datetime-local'
									className='form-control'
									id='dateTime'
									value={this.state.dateTime}
									onChange={this.handleChange}
								/>
								<br />
							</MDBCol>
							<MDBCol size='6'>
								<label htmlFor='limit' className='grey-text'>
									Participant Limit:
								</label>
								<input
									type='number'
									className='form-control'
									id='limit'
									min='1'
									value={this.state.limit}
									onChange={this.handleChange}
								/>
								<br />
							</MDBCol>
						</MDBRow>

						<br />
						<MDBRow>
							<MDBCol size='6'>
								<label htmlFor='location' className='grey-text'>
									Location:
								</label>
								<input
									type='text'
									className='form-control'
									id='location'
									value={this.state.location}
									onChange={this.handleChange}
								/>
							</MDBCol>
							<MDBCol size='6'>
								<label htmlFor='zipCode' className='grey-text'>
									Postal Code:
								</label>
								<input
									type='text'
									className='form-control'
									id='zipCode'
									value={this.state.zipCode}
									onChange={this.handleChange}
								/>
							</MDBCol>
						</MDBRow>

						<br />
						<div>
							<label htmlFor='description' className='grey-text'>
								Event Description:
							</label>
							<textarea
								type='text'
								id='description'
								className='form-control'
								rows='3'
								value={this.state.description}
								onChange={this.handleChange}
							/>
						</div>
						<br />

						{/* Event type as checkbox or dropdown menu? */}

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
						{/* <div>
							<label htmlFor='image' className='grey-text'>
								Image
							</label>
							<div className='custom-file'>
								<input
									type='file'
									className='custom-file-input'
									id='inputGroupFile01'
									aria-describedby='inputGroupFileAddon01'
								/>
								<label className='custom-file-label' htmlFor='inputGroupFile01'>
									Select Image
								</label>
							</div>
						</div> */}

						<div className='text-center mt-4'>
							<MDBBtn color='blue' outline type='submit'>
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
