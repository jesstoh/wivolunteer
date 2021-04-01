import React, { Component } from 'react';

class FormInput extends Component {
	render() {
		return (
			<>
				<label htmlFor={this.props.id}>{this.props.labelTitle}</label>
				<input
					type={this.props.type}
					className='form-control'
					id={this.props.id}
					min='1'
				/>
			</>
		);
	}
}

export default FormInput;
