import axios from "axios";
import React, { Component } from "react";
import {
    MDBContainer,
    MDBIcon,
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
        return !this.state.event ? (
            <div className="text-center pt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        ) : (
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
                            <MDBCardTitle className="pl-3 font-weight-bolder">
                                {this.state.event.eventTitle}
                            </MDBCardTitle>
                            <MDBCol className="text-black-50">
                                <MDBIcon
                                    far
                                    icon="calendar-alt"
                                    className="pr-2"
                                />
                                <Moment
                                    date={this.state.event.dateTime}
                                    format="ddd, DD MMM YYYY"
                                />
                                <br />
                                <MDBIcon far icon="clock" className="pr-1" />
                                <Moment
                                    date={this.state.event.dateTime}
                                    format="LT"
                                />
                                <br />
                                <MDBIcon
                                    icon="map-marker-alt"
                                    className="pr-2"
                                />
                                {this.state.event.location} <br />
                                <MDBIcon icon="user" className="pr-1" />
                                Organised by{" "}
                                {this.state.event.organiser.username}
                                <br />
                                Event Type: {this.state.event.eventType} <br />
                                Attendees:{" "}
                                {this.state.event.participants.length} /{" "}
                                {this.state.event.limit}
                                <span className="pl-4">
                                    Wish: {this.state.event.interested.length}
                                </span>
                                <h5 className="text-dark pt-3 ">
                                    About the event
                                </h5>
                                <p>{this.state.event.description}</p>
                            </MDBCol>

                            <MDBRow className="pl-4 pt-2">
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
