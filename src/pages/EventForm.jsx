import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import FormInput from '../components/FormInput.jsx';
class EventForm extends Component {
	render() {
		return (
			<React.Fragment>
				<MDBContainer className='mt-5'>
					<form>
						<p className='h4 text-center mb-4'>Create an Event</p>
						<FormInput
							type={'text'}
							id={'eventTitle'}
							labelTitle={'Event Title'}
						/>
						<br />
						<MDBRow>
							<MDBCol size='6'>
								<FormInput
									type={'datetime-local'}
									id={'dateTime'}
									labelTitle={'Date/Time:'}
								/>
							</MDBCol>
							<MDBCol size='6'>
								<FormInput
									type={'number'}
									id={'limit'}
									labelTitle={'Participants Limit:'}
								/>
							</MDBCol>
						</MDBRow>

						<br />
						<MDBRow>
							<MDBCol size='6'>
								<FormInput
									type={'text'}
									id={'location'}
									labelTitle={'Location:'}
								/>
							</MDBCol>
							<MDBCol size='6'>
								<FormInput
									type={'text'}
									id={'zipCode'}
									labelTitle={'Postal Code:'}
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
