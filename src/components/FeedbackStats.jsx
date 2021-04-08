import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";

class FeedbackStats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qn1: null,
			qn2: null,
			qn3: null,
			feedbacksQty: 0
		};
	}
	componentDidMount() {
		const token = localStorage.getItem("token");
		axios
			.get(`${process.env.REACT_APP_API_URL}/feedback/${this.props.eventId}`, {
				headers: { authorization: `Bearer ${token}` },
			})
			.then((response) => {
				if (response.data.length) {
					// PROCESS DATA INTO ARRAY///
					// create array of 0 value corresponding to number of options in each question
					const qn1 = new Array(3).fill(0);
					const qn2 = new Array(5).fill(0);
					const qn3 = new Array(5).fill(0);
					response.data.forEach((feedback) => {
						qn1[feedback.hasEnoughResources - 1]++; // Adding count to each question array
						qn2[feedback.isWellOrganised - 1]++; // Adding count to each question array
						qn3[feedback.isSatisfied - 1]++;
					});
					this.setState({ qn1: qn1, qn2: qn2, qn3: qn3, feedbacksQty: response.data.length }, () => {
						console.log(this.state);
					});
				}
			});
	}

	render() {
		const chartOptions = {
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
						},
					},
				],
			},
		};
		const chartColors = {
			pieColors: ["#BA274A", "#3ED388", "#2191FB"],
			hoverPieColors: ["#FF6384", "#60F2A8", "#5FB9F7"],

			barColors: [
				"rgb(199, 0, 57)",
				"rgb(255, 87, 51)",
				"rgb(255, 195, 0)",
				"rgb(24, 203, 157)",
				"rgb(23, 203, 11)",
			],
			hoverBarColors: [
				"rgba(199, 0, 57,0.5)",
				"rgba(255, 87, 51,0.5)",
				"rgba(255, 195, 0,0.5)",
				"rgba(24, 203, 157,0.5)",
				"rgba(23, 203, 11,0.5)",
			],
		};

		const resourcesFeedback = {
			labels: ["Not enough", "Just Nice", "More than enough "],
			datasets: [
				{
					data: this.state.qn1,
					backgroundColor: chartColors.pieColors, //green //blue //red
					hoverBackgroundColor: chartColors.hoverPieColors, //green //blue //red
				},
			],
		};

		const data1 = {
			labels: ["1", "2", "3", "4", "5"],
			datasets: [
				{
					backgroundColor: chartColors.barColors,
					hoverBackgroundColor: chartColors.hoverBarColors,
					data: [5, 5, 7, 8, 10],
				},
			],
		};
		return (
			<MDBContainer>
				<p>{this.props.participantsQty}/{this.props.limit}, ie. {Math.round(this.props.participantsQty / this.props.limit * 100)}% have participated in the event </p>
				<p>{this.state.feedbacksQty}/{this.props.limit}, ie. {Math.round(this.state.feedbacksQty / this.props.limit * 100)}% of participants have submitted feedbacks</p>
				<h5>Event statistics</h5>
				<p>Did you allocated sufficient resources for your event?</p>

				<Pie data={resourcesFeedback} />
				<br />
				<p>How well organized is your event?</p>
				<Bar data={data1} width={100} height={50} options={chartOptions} />
				<br />
				<p>How satisfied are participants after your event?</p>
				<Bar data={data1} width={100} height={50} options={chartOptions} />
				<br />
				<h5>Additional Information</h5>
				<p>- {"data here"} have submitted feedback for your event.</p>
				<p>- {"data here"} have participated in your event.</p>
			</MDBContainer>
		);
	}
}

export default FeedbackStats;
