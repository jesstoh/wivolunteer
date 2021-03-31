import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
class EventForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventTitle: '',
			dateTime: '',
		};
	}
	render() {
		return (
			<React.Fragment>
				<MDBContainer className='mt-5'>
					<form>
						<p className='h4 text-center mb-4'>Create an Event</p>
						<label htmlFor='eventTitle'>Event Title:</label>
						<input
							type='text'
							className='form-control'
							id='eventTitle'
							placeholder='My Event'
							required
						/>
						<br />
						<MDBRow>
							<MDBCol size='6'>
								<label htmlFor='dateTime'>Date/Time:</label>
								<input
									type='datetime-local'
									className='form-control'
									id='dateTime'
									required
								/>
							</MDBCol>
							<MDBCol size='6'>
								<label htmlFor='dateTime'>Participants Limit:</label>
								<input
									type='number'
									className='form-control'
									id='limit'
									min='1'
									placeholder='1'
									required
								/>
							</MDBCol>
						</MDBRow>

						<br />
						<MDBRow>
							<MDBCol size='6'>
								<label htmlFor='location'>Location:</label>
								<input type='text' className='form-control' id='location' />
							</MDBCol>
							<MDBCol size='6'>
								<label htmlFor='zipCode'>Postal Code:</label>
								<input type='text' className='form-control' id='zipCode' />
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
							/>
						</div>
						<br />

						{/* Event type as checkbox or dropdown menu? */}
						<div>
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
						</div>

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
