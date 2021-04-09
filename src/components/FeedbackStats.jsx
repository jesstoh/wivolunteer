import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";

class FeedbackStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qn1: null,
            qn2: null,
            qn3: null,
            feedbacksQty: 0,
        };
    }
    componentDidMount() {
        const token = localStorage.getItem("token");
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/feedback/${this.props.eventId}`,
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            )
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
                    this.setState(
                        {
                            qn1: qn1,
                            qn2: qn2,
                            qn3: qn3,
                            feedbacksQty: response.data.length,
                        },
                        () => {
                            console.log(this.state);
                        }
                    );
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
            // pie chart colors
            pieColors: ["#BA274A", "#3ED388", "#2191FB"],
            hoverPieColors: ["#FF6384", "#60F2A8", "#5FB9F7"],
            // bar chart colors
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

        const isOrganized = {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [
                {
                    label: "Event Organization Score",
                    backgroundColor: chartColors.barColors,
                    hoverBackgroundColor: chartColors.hoverBarColors,
                    data: this.state.qn2,
                },
            ],
        };

        const isSatisfied = {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [
                {
                    label: "Participant Satisfaction Score",
                    backgroundColor: chartColors.barColors,
                    hoverBackgroundColor: chartColors.hoverBarColors,
                    data: this.state.qn3,
                },
            ],
        };
        return (
            <MDBContainer className="m-4 pt-3 z-depth-1 rgba-blue-slight">
                <h4 className="font-weight-bolder text-center">
                    Event Statistics
                </h4>
                <MDBContainer className="my-5">
                    <h5 className="text-black-50 font-weight-bold">Basic Info</h5>
                    {/* <MDBCol> */}
                    <span>
                        {this.props.participantsQty}/{this.props.limit}, ie.{" "}
                        {Math.round(
                            (this.props.participantsQty / this.props.limit) *
                                100
                        )}
                        % of event spots taken up{" "}
                    </span>
                    <br />
                    <span>
                        {this.state.feedbacksQty}/{this.props.participantsQty},
                        ie.{" "}
                        {Math.round(
                            (this.state.feedbacksQty /
                                this.props.participantsQty) *
                                100
                        )}
                        % of participants have submitted feedbacks
                    </span>
                    <br />
                </MDBContainer>

                <MDBContainer className="pt-2">
                    <h5 className="text-black-50 font-weight-bold">
                        Participant Feedbacks
                    </h5>
                    <MDBRow>
                        <MDBCol md="6" className="pb-4 pt-2">
                            <p className="font-italic ">
                                Is there sufficient resources for the event?
                            </p>
                            <Pie data={resourcesFeedback} />
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBRow>
                                <MDBCol size="12" className="p-2">
                                    <p className="font-italic ">
                                        How well organized is the event?
                                    </p>
                                    <Bar
                                        data={isOrganized}
                                        width={100}
                                        height={50}
                                        options={chartOptions}
                                    />
                                </MDBCol>
                                <MDBCol size="12" className="p-4">
                                    <p className="font-italic">
                                        How satisfied are participants after the
                                        event?
                                    </p>
                                    <Bar
                                        data={isSatisfied}
                                        width={100}
                                        height={50}
                                        options={chartOptions}
                                    />
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBContainer>
        );
    }
}

export default FeedbackStats;
