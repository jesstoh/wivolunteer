import React, { Component } from 'react';
import { MDBFormInline, MDBInput } from 'mdbreact';

class RadioInput extends React.Component {
	state = {
		radio: 3,
	};

	onClick = (nr) => () => {
		this.setState({
			radio: nr,
		});
	};

	render() {
		return (
			<MDBFormInline className='text-center'>
				<MDBInput
					onClick={this.onClick(1)}
					checked={this.state.radio === 1 ? true : false}
					label='1'
					type='radio'
					id='radio1'
					containerClass='mr-5'
				/>
				<MDBInput
					onClick={this.onClick(2)}
					checked={this.state.radio === 2 ? true : false}
					label='2'
					type='radio'
					id='radio2'
					containerClass='mr-5'
				/>
				<MDBInput
					onClick={this.onClick(3)}
					checked={this.state.radio === 3 ? true : false}
					label='3'
					type='radio'
					id='radio3'
					containerClass='mr-5'
				/>
				<MDBInput
					onClick={this.onClick(4)}
					checked={this.state.radio === 4 ? true : false}
					label='4'
					type='radio'
					id='radio4'
					containerClass='mr-5'
				/>
				<MDBInput
					onClick={this.onClick(5)}
					checked={this.state.radio === 5 ? true : false}
					label='5'
					type='radio'
					id='radio5'
					containerClass='mr-5'
				/>
			</MDBFormInline>
		);
	}
}

export default RadioInput;
