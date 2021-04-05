import axios from "axios";
import React, { Component } from "react";
import {
    MDBContainer,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBCol,
    MDBRow,
} from "mdbreact";
import Moment from "react-moment";

import EventAction from "../components/EventAction.jsx";
import FeedbackStats from "../components/FeedbackStats.jsx";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = { event: null };
        this.fetchEvent = this.fetchEvent.bind(this);
    }

    fetchEvent() {
        const token = localStorage.getItem("token");
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/events/${this.props.match.params.id}`,
                { headers: { authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                this.setState({ event: response.data });
            })
            .catch((err) => {
                console.log(err);
                switch (err.response.status) {
                    case 401:
                        this.props.handleLogout();
                        break;
                    default:
                        window.location.href = `/404`;
                }
            });
    }

    componentDidMount() {
        this.fetchEvent();
    }

    render() {
        return !this.state.event ? null : (
            <MDBContainer className="pt-5">
                <MDBCol md="9" className="offset-md-1">
                    <MDBCard>
                        <MDBCardImage
                            className="img-fluid"
                            top
                            src={this.state.event.image}
                            waves
                        />
                        <MDBCardBody>
                            <MDBCardTitle>
                                {this.state.event.eventTitle}
                            </MDBCardTitle>
                            <MDBCardText>
                                Date: <Moment date={this.state.event.dateTime} format="ddd, DD MMM YYYY"/><br />
                                Time: <Moment date={this.state.event.dateTime} format="LT"/><br />
                                Organized by: {this.state.event.organiser.username}
                                <br />
                                Location: {this.state.event.location} <br />
                                Event Type: {this.state.event.eventType} <br />
                                Event Description:{" "}
                                {this.state.event.description}
                                <br />
                                Attendees:{" "}
                                {this.state.event.participants.length} /{" "}
                                {this.state.event.limit} <br />
                                Wish: {this.state.event.interested.length}
                            </MDBCardText>
                            <MDBRow>
                                {this.state.event.isCancelled ? (
                                    <span className="red-text">
                                        Event Cancelled
                                    </span>
                                ) : (
                                    <EventAction
                                        event={this.state.event}
                                        user={this.props.user}
                                        fetchEvent={this.fetchEvent}
                                        handleLogout={this.props.handleLogout}
                                    />
                                )}
                            </MDBRow>
                            <MDBRow>
                                {this.state.event.isCancelled ||
                                new Date(this.state.event.dateTime) >
                                    new Date() ? null : (
                                    <FeedbackStats
                                        eventId={this.state.event._id}
                                    />
                                )}
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBContainer>
        );
    }
}

export default Event;
