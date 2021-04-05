import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
class EventTypeCheckboxes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventType: [],
		};
		this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
	}

	handleChangeCheckbox(event) {
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
								onChange={this.handleChangeCheckbox}
								defaultChecked={
									this.state.eventType.includes("humanitarian") ? true : false
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
								onChange={this.handleChangeCheckbox}
								defaultChecked={
									this.state.eventType.includes("environment") ? true : false
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
								onChange={this.handleChangeCheckbox}
								defaultChecked={
									this.state.eventType.includes("animal-welfare") ? true : false
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
								onChange={this.handleChangeCheckbox}
								defaultChecked={
									this.state.eventType.includes("community") ? true : false
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
								onChange={this.handleChangeCheckbox}
								defaultChecked={
									this.state.eventType.includes("disability") ? true : false
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
								onChange={this.handleChangeCheckbox}
								defaultChecked={
									this.state.eventType.includes("health") ? true : false
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
