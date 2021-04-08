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
        };
    }
    componentDidMount() {
        const token = localStorage.getItem("token");
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/feedback/${this.props.eventId}`,
                { headers: { authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                if (!response.data.length) {
                    // PROCESS DATA INTO ARRAY///
                    // create array of 0 value corresponding to number of options in each question
                    const qn1 = new Array(3).fill(0);
                    const qn2 = new Array(5).fill(0);
                    const qn3 = new Array(5).fill(0);
                    response.data.forEach((feedback) => {
                        // For question, will change schema to Number and corresponding to string, to make it easier to process
                        if (feedback.hasEnoughResources === "Not enough") {
                            qn1[0]++;
                        } else if (
                            feedback.hasEnoughResources === "Just nice"
                        ) {
                            qn1[1]++;
                        } else {
                            qn1[2]++;
                        }
                        qn2[feedback.isWellOrganised - 1]++; // Adding count to each question array
                        qn3[feedback.isSatisfied - 1]++;
                    });
                    this.setState({ qn1: qn1, qn2: qn2, qn3: qn3 });
                    // console.log(qn1, qn2, qn3);
                }
            });
    }

    render() {
        const data = {
            labels: ["Just Nice", "More than enough ", "Not enough"],
            datasets: [
                {
                    data: [65, 59, 80],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
            ],
        };

        const data1 = {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [
                {
                    label: "My First dataset",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: [5, 7, 8, 10, 8],
                },
            ],
        };

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
        return (
            <MDBContainer>
                <h1>Event statistics</h1>
                <h2>Did you allocated sufficient resources for your event?</h2>
                <Pie data={data} />
                <h2>How well organized is your event?</h2>
                <Bar
                    data={data1}
                    width={100}
                    height={50}
                    options={chartOptions}
                />
                <h2>How satisfied are participants after your event?</h2>

                <h2>How satisfied are participants after your event?</h2>
                <h1>Additional Information</h1>
            </MDBContainer>
        );
    }
}

export default FeedbackStats;
