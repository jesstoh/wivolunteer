import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

class EventTypeCheckboxes extends Component {
	constructor(props) {
		super(props);

		this.handelChangeCheckbox = this.handelChangeCheckbox.bind(this);
	}

	handelChangeCheckbox(event) {
		const checkBox = event.target;

		if (checkBox.checked) {
			this.props.eventType.push(checkBox.id);
		} else {
			let index = this.props.eventType.indexOf(checkBox.id);
			if (index > -1) {
				this.props.eventType.splice(index, 1);
			}
		}
	}
	render() {
		return (
			<MDBContainer>
				<MDBRow>
					<MDBCol size="4">
						<div className="custom-control custom-checkbox">
							<input
								type="checkbox"
								className="custom-control-input"
								id="humanitarian"
								onChange={this.handelChangeCheckbox}
								defaultChecked={
									this.props.eventType.includes("humanitarian") ? true : false
								}
							/>
							<label className="custom-control-label" htmlFor="humanitarian">
								Humanitarian
							</label>
						</div>
					</MDBCol>
					<MDBCol size="4">
						<div className="custom-control custom-checkbox">
							<input
								type="checkbox"
								className="custom-control-input"
								id="environment"
								onChange={this.handelChangeCheckbox}
								defaultChecked={
									this.props.eventType.includes("environment") ? true : false
								}
							/>
							<label className="custom-control-label" htmlFor="environment">
								Environment
							</label>
						</div>
					</MDBCol>
					<MDBCol size="4">
						<div className="custom-control custom-checkbox">
							<input
								type="checkbox"
								className="custom-control-input"
								id="animal-welfare"
								onChange={this.handelChangeCheckbox}
								defaultChecked={
									this.props.eventType.includes("animal-welfare") ? true : false
								}
							/>
							<label className="custom-control-label" htmlFor="animal-welfare">
								Animal-Welfare
							</label>
						</div>
					</MDBCol>
				</MDBRow>
				<br />
				<MDBRow>
					<MDBCol size="4">
						<div className="custom-control custom-checkbox">
							<input
								type="checkbox"
								className="custom-control-input"
								id="community"
								onChange={this.handelChangeCheckbox}
								defaultChecked={
									this.props.eventType.includes("community") ? true : false
								}
							/>
							<label className="custom-control-label" htmlFor="community">
								Community
							</label>
						</div>
					</MDBCol>
					<MDBCol size="4">
						<div className="custom-control custom-checkbox">
							<input
								type="checkbox"
								className="custom-control-input"
								id="disability"
								onChange={this.handelChangeCheckbox}
								defaultChecked={
									this.props.eventType.includes("disability") ? true : false
								}
							/>
							<label className="custom-control-label" htmlFor="disability">
								Disability
							</label>
						</div>
					</MDBCol>
					<MDBCol size="4">
						<div className="custom-control custom-checkbox">
							<input
								type="checkbox"
								className="custom-control-input"
								id="health"
								onChange={this.handelChangeCheckbox}
								defaultChecked={
									this.props.eventType.includes("health") ? true : false
								}
							/>
							<label className="custom-control-label" htmlFor="health">
								Health
							</label>
						</div>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		);
	}
}

export default EventTypeCheckboxes;
