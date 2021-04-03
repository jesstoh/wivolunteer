import axios from "axios";
import { MDBBtn, MDBRow } from "mdbreact";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class EventAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wish: this.props.user.interestedEvents.includes(
                this.props.event._id
            ),
        };
        this.cancelEvent = this.cancelEvent.bind(this);
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

    render() {
        if (this.props.user._id === this.props.event.organiser._id) {
            //////ORGANISER ACTION//////
            if (new Date(this.props.event.dateTime) > new Date()) {
                return (
                    <React.Fragment>
                        <MDBBtn
                            outline
                            color="danger"
                            onClick={this.cancelEvent}
                        >
                            Cancel Event
                        </MDBBtn>
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
            if (this.props.user.pastEvents.includes(this.props.event._id)) {
                // Action to un-join event
                return <MDBBtn>Not Going</MDBBtn>;
            } else {
                // Action to join event or add to wish list
                return (
                    <React.Fragment>
                        <MDBBtn>Join</MDBBtn>
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
