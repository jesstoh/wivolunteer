import { MDBBtn, MDBRow } from "mdbreact";
import React, { Component } from "react";

class EventAction extends Component {
    render() {
        if (this.props.user._id === this.props.event.organiser._id) {
            //////ORGANISER ACTION//////
            if (new Date(this.props.event.dateTime) > new Date()) {
                return (
                    <MDBBtn outline color="warning">
                        Cancel Event
                    </MDBBtn>
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
                        <MDBBtn>Wish</MDBBtn>
                    </React.Fragment>
                );
            }
        }
    }
}

export default EventAction;
