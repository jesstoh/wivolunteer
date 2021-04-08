import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { MDBContainer, MDBFormInline, MDBInput, MDBBtn } from "mdbreact";
import axios from "axios";

class EventFeedback extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFeedbackDone: false,
			eventTitle: this.props.eventTitle,
			qn1: "Just nice",
			qn2: 3,
			qn3: 3,
		};
		this.onClick = this.onClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	onClick = (nr) => (event) => {
		this.setState({
			[event.target.id]: nr,
		});
	};
	handleSubmit(event) {
		event.preventDefault();
		// set data payload
		const data = {
			hasEnoughResources: this.state.qn1,
			isWellOrganised: this.state.qn2,
			isSatisfied: this.state.qn3,
		};
		// get token from localStorage
		const token = localStorage.getItem("token");
		// get id from url params
		const id = this.props.match.params.id;

		// create feedback
		axios
			.post(`${process.env.REACT_APP_API_URL}/feedback/${id}`, data, {
				headers: { authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({ isFeedbackDone: true });
			})
			.catch((err) => {
				alert(err);
			});
	}
	render() {
		// if feedback is submitted redirect to home
		if (this.state.isFeedbackDone) {
			return <Redirect to="/home" />;
		}

		return (
			<React.Fragment>
				<MDBContainer className="mt-5">
					<p className="h4 text-center mb-4">
						{this.state.eventTitle} Event Feedback
					</p>

					<p>
						1. Does this event have enough resources allocated (eg. number of
						participants)
					</p>
					<MDBFormInline>
						<MDBInput
							onClick={this.onClick("More than enough")}
							checked={this.state.qn1 === "More than enough" ? true : false}
							label="More than enough."
							type="radio"
							id="qn1"
							containerClass="mr-5"
						/>
						<MDBInput
							gap
							onClick={this.onClick("Not enough")}
							checked={this.state.qn1 === "Not enough" ? true : false}
							label="Not enough."
							type="radio"
							id="qn1"
							containerClass="mr-5"
						/>
						<MDBInput
							gap
							onClick={this.onClick("Just nice")}
							checked={this.state.qn1 === "Just nice" ? true : false}
							label="Just nice."
							type="radio"
							id="qn1"
							containerClass="mr-5"
						/>
					</MDBFormInline>
					<br />

					<p>2. Is this event well organised?</p>
					<MDBFormInline>
						<MDBInput
							onClick={this.onClick(1)}
							checked={this.state.qn2 === 1 ? true : false}
							label="1"
							type="radio"
							id="qn2"
							containerClass="mr-5"
						/>
						<MDBInput
							gap
							onClick={this.onClick(2)}
							checked={this.state.qn2 === 2 ? true : false}
							label="2"
							type="radio"
							id="qn2"
							containerClass="mr-5"
						/>
						<MDBInput
							gap
							onClick={this.onClick(3)}
							checked={this.state.qn2 === 3 ? true : false}
							label="3"
							type="radio"
							id="qn2"
							containerClass="mr-5"
						/>
						<MDBInput
							gap
							onClick={this.onClick(4)}
							checked={this.state.qn2 === 4 ? true : false}
							label="4"
							type="radio"
							id="qn2"
							containerClass="mr-5"
						/>
						<MDBInput
							gap
							onClick={this.onClick(5)}
							checked={this.state.qn2 === 5 ? true : false}
							label="5"
							type="radio"
							id="qn2"
							containerClass="mr-5"
						/>
					</MDBFormInline>
					<br />

					<p>3. How satisfied are you after attending this event?</p>
					<MDBFormInline>
						<MDBInput
							onClick={this.onClick(1)}
							checked={this.state.qn3 === 1 ? true : false}
							label="1"
							type="radio"
							id="qn3"
							containerClass="mr-5"
						/>
						<MDBInput
							gap
							onClick={this.onClick(2)}
							checked={this.state.qn3 === 2 ? true : false}
							label="2"
							type="radio"
							id="qn3"
							containerClass="mr-5"
						/>
						<MDBInput
							gap
							onClick={this.onClick(3)}
							checked={this.state.qn3 === 3 ? true : false}
							label="3"
							type="radio"
							id="qn3"
							containerClass="mr-5"
						/>
						<MDBInput
							gap
							onClick={this.onClick(4)}
							checked={this.state.qn3 === 4 ? true : false}
							label="4"
							type="radio"
							id="qn3"
							containerClass="mr-5"
						/>
						<MDBInput
							gap
							onClick={this.onClick(5)}
							checked={this.state.qn3 === 5 ? true : false}
							label="5"
							type="radio"
							id="qn3"
							containerClass="mr-5"
						/>
					</MDBFormInline>
					<form onSubmit={this.handleSubmit}>
						<div className="text-center mt-4">
							<MDBBtn color="blue" type="submit">
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
