import React, { Component } from 'react';
import { MDBContainer, MDBBtn } from 'mdbreact';
import RadioInput from '../components/RadioInput.jsx';
class EventFeedback extends Component {
	render() {
		return (
			<React.Fragment>
				<MDBContainer className='mt-5'>
					<form>
						<p className='h4 text-center mb-4'>Feedback: *Event title*</p>
						<label>
							1. Does this event have enough resources allocated (eg. number of
							participants)
						</label>
						{/* to check Y/N as a 2 choice radio button? */}
						<RadioInput />
						<label>2. Is this event well organised?</label>
						<RadioInput />
						<br />
						<label>3. How satisfied are you after attending this event?</label>
						<RadioInput />

						<div className='text-center mt-4'>
							<MDBBtn color='blue' outline type='submit'>
								Submit Feedback
							</MDBBtn>
						</div>
					</form>
				</MDBContainer>
			</React.Fragment>
		);
	}
}

export default EventFeedback;
