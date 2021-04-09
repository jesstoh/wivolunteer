import axios from "axios";
import { MDBBtn, MDBIcon } from "mdbreact";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import FeedbackAction from "../components/FeedbackAction.jsx";
import ParticipantsModal from "../components/ParticipantsModal.jsx";

class EventAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wish: this.props.event.interested.some(
                (ele) => ele._id === this.props.user._id
            ),
        };
        this.cancelEvent = this.cancelEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.joinEvent = this.joinEvent.bind(this);
        this.dropEvent = this.dropEvent.bind(this);
        this.toggleWish = this.toggleWish.bind(this);
    }

    // Organizer cancel event
    cancelEvent() {
        const token = localStorage.getItem("token");
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/events/${this.props.event._id}/edit`,
                { isCancelled: true },
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            )
            .then((response) => this.props.fetchEvent())
            .catch((err) => {
                if (err.response.status === 401) {
                    this.props.handleLogout();
                }
            });
    }

    // Delete Event
    deleteEvent() {
        const token = localStorage.getItem("token");
        axios
            .delete(
                `${process.env.REACT_APP_API_URL}/events/${this.props.event._id}`,
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                window.location.href = "/home";
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    this.props.handleLogout();
                }
            });
    }

    // Join Event
    joinEvent() {
        const token = localStorage.getItem("token");
        // console.log(token);
        // console.log(this.props.event._id);
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/events/${this.props.event._id}/join`,
                {},
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                this.props.fetchEvent();
            });
    }

    // Quit event
    dropEvent() {
        const token = localStorage.getItem("token");
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/events/${this.props.event._id}/drop`,
                {},
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            )
            .then((response) => this.props.fetchEvent())
            .catch((err) => {
                if (err.response.status === 401) {
                    this.props.handleLogout();
                }
            });
    }

    // Add or remove from wish list based on current wish list status
    toggleWish() {
        const token = localStorage.getItem("token");

        // Get url param whether to add or remove from wish list
        let wishStatus = "interested";
        if (this.state.wish) {
            wishStatus = "uninterested";
        }
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/events/${this.props.event._id}/${wishStatus}`,
                {},
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                this.props.fetchEvent();
                this.setState({ wish: !this.state.wish });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    this.props.handleLogout();
                }
            });
    }

    render() {
        // Check if anyone already join or show interest to the event
        const noInterest =
            this.props.event.participants.length === 0 &&
            this.props.event.interested.length === 0;

        if (this.props.user._id === this.props.event.organiser._id) {
            //////ORGANISER ACTION//////
            if (new Date(this.props.event.dateTime) > new Date()) {
                return (
                    <React.Fragment>
                        {noInterest ? (
                            <MDBBtn
                                outline
                                color="danger"
                                onClick={this.deleteEvent}
                            >
                                Delete Event
                            </MDBBtn>
                        ) : (
                            <MDBBtn
                                outline
                                color="danger"
                                onClick={this.cancelEvent}
                            >
                                Cancel Event
                            </MDBBtn>
                        )}
                        <Link to={"/event/edit/" + this.props.event._id}>
                            <MDBBtn outline color="warning">
                                Edit Event
                            </MDBBtn>
                        </Link>
                        {/* Display Participant contacts */}
                        <ParticipantsModal
                            participants={this.props.event.participants}
                        />
                    </React.Fragment>
                );
            }
            return null;
        } else {
            //////USER ACTION//////
            // Render feedback action component for past event
            if (new Date(this.props.event.dateTime) < new Date()) {
                return (
                    <FeedbackAction
                        eventId={this.props.event._id}
                        eventParticipant={this.props.event.participants}
                        userId={this.props.user._id}
                    />
                );
            }

            // Render available user action for on-going event
            if (
                this.props.event.participants.some(
                    (ele) => ele._id === this.props.user._id
                )
            ) {
                // Action to un-join event
                return (
                    <MDBBtn
                        onClick={this.dropEvent}
                        color="warning"
                        className="btn-rounded"
                    >
                        <MDBIcon icon="times" size="lg" className="pl-1"/> Not Going
                    </MDBBtn>
                );
            } else {
                // Action to join event or add to wish list
                return (
                    <React.Fragment>
                        {this.props.event.participants.length ===
                        this.props.event.limit ? (
                            <MDBBtn disabled color="blue-grey btn-rounded">
                                Full
                            </MDBBtn>
                        ) : (
                            <MDBBtn
                                onClick={this.joinEvent}
                                className="btn-rounded"
                            >
                                <MDBIcon icon="check" size="lg" className="pr-1"/> Join
                            </MDBBtn>
                        )}
                        <MDBBtn
                            onClick={this.toggleWish}
                            color="white"
                            className="btn-rounded"
                        >
                            {this.state.wish ? (
                                <React.Fragment>
                                    <MDBIcon
                                        icon="heart"
                                        size="lg"
                                        className="red-text"
                                    ></MDBIcon>
                                    <span className="red-text pl-1">
                                        Wished
                                    </span>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <MDBIcon
                                        far
                                        icon="heart"
                                        size="lg"
                                        className="black-text"
                                    ></MDBIcon>
                                    <span className="black-text pl-1">
                                        Add to wish list
                                    </span>
                                </React.Fragment>
                            )}
                        </MDBBtn>
                    </React.Fragment>
                );
            }
        }
    }
}

export default EventAction;
