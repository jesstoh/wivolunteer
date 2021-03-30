import React, { Component } from 'react';
import { MDBTypography, MDBBtn } from 'mdbreact';
class NotFoundPage extends Component {
	render() {
		return (
			<React.Fragment>
				<MDBTypography className='text-center '>
					<MDBTypography tag='h1' variant='display-1'>
						<strong>Oops!</strong>
					</MDBTypography>

					<MDBTypography tag='h4' colorText='red'>
						<strong>404:</strong>
						<small className='text-muted '> Page not found.</small>
					</MDBTypography>

					<MDBTypography tag='h5' variant='h5-responsive' className='mt-5'>
						Let's get you back.
					</MDBTypography>

					<MDBBtn href='/home' color='primary'>
						Back to home
					</MDBBtn>
				</MDBTypography>
			</React.Fragment>
		);
	}
}

export default NotFoundPage;
