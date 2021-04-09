import axios from "axios";
import { MDBBtn, MDBIcon } from "mdbreact";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class FeedbackAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackDone: false,
        };
        this.fetchFeedback = this.fetchFeedback.bind(this);
    }

    // Fetch feedback status
    fetchFeedback() {
        const token = localStorage.getItem("token");
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/feedback/${this.props.eventId}`,
                { headers: { authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                console.log(response.data);
                if (
                    response.data.some(
                        (ele) => ele.participant._id === this.props.userId
                    )
                ) {
                    this.setState({ feedbackDone: true });
                }
            })
            .catch((err) => {
                console.log(err);
                switch (err.response.status) {
                    case 401:
                        this.props.handleLogout();
                        break;
                    case 404:
                        this.setState({ wish: false });
                        break;
                    default:
                        window.location.href = `/404`;
                }
            });
    }

    componentDidMount() {
        this.fetchFeedback();
    }

    render() {
        // If user never participate in the event
        if (
            !this.props.eventParticipant.some(
                (ele) => ele._id === this.props.userId
            )
        ) {
            return null;
        }
        return (
            <React.Fragment>
                {this.state.feedbackDone ? (
                    <MDBBtn disabled>
                        {" "}
                        <MDBIcon icon="edit" size="lg" />
                        Feedback Complete
                    </MDBBtn>
                ) : (
                    <Link to={"/feedback/" + this.props.eventId}>
                        <MDBBtn>
                            <MDBIcon icon="edit" size="lg" /> Leave a feedback{" "}
                        </MDBBtn>
                    </Link>
                )}
            </React.Fragment>
        );
    }
}

export default FeedbackAction;
