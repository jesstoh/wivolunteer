import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import { Pie, Bar } from "react-chartjs-2";

class FeedbackStats extends Component {
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
					data: [65, 59, 80],
					backgroundColor: chartColors.pieColors, //green //blue //red
					hoverBackgroundColor: chartColors.hoverPieColors, //green //blue //red
				},
			],
		};

		const data1 = {
			labels: ["1", "2", "3", "4", "5"],
			datasets: [
				{
					label: ["1", "2", "3", "4", "5"],
					backgroundColor: chartColors.barColors,
					hoverBackgroundColor: chartColors.hoverBarColors,
					data: [5, 5, 7, 8, 10],
				},
			],
		};
		return (
			<MDBContainer>
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
