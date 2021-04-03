import axios from "axios";
import { MDBBtn, MDBRow, MDBIcon } from "mdbreact";
import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        console.log(token);
        console.log(this.props.event._id);
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
                        <Link to={"/event/" + this.props.event._id + "/edit"}>
                            <MDBBtn outline color="warning">
                                Edit Event
                            </MDBBtn>
                        </Link>
                    </React.Fragment>
                );
            }
            return null;
        } else {
            //////USER ACTION//////
            // Render feedback action component for past event
            if (new Date(this.props.event.dateTime) < new Date()) {
                return "Feedback Action";
            }

            // Render available user action for on-going event
            if (
                this.props.event.participants.some(
                    (ele) => ele._id === this.props.user._id
                )
            ) {
                // Action to un-join event
                return <MDBBtn onClick={this.dropEvent}>Not Going</MDBBtn>;
            } else {
                // Action to join event or add to wish list
                return (
                    <React.Fragment>
                        <MDBBtn onClick={this.joinEvent}>
                            <MDBIcon icon="check" size="lg" /> Join
                        </MDBBtn>
                        <MDBBtn active={this.state.wish}>
                            {this.state.wish ? "Wished" : "Add to wish list"}
                        </MDBBtn>
                    </React.Fragment>
                );
            }
        }
    }
}

export default EventAction;
