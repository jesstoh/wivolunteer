import React, { Component } from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBCol,
} from "mdbreact";
import { Link } from "react-router-dom";

class EventCard extends Component {
    render() {
        return (
            <MDBCol>
                <Link to={"/event/" + this.props.event._id}>
                    <MDBCard style={{ width: "90%" }}>
                        <MDBCardBody>
                            <MDBCardTitle>
                                {this.props.event.eventTitle}
                            </MDBCardTitle>
                            <MDBCardText>
                                Date: {this.props.event.dateTime} <br />
                                Organizer: {
                                    this.props.event.organiser.username
                                }{" "}
                                <br />
                                Location: {this.props.event.location} <br />
                                Type: {this.props.event.eventType} <br />
                                Participants:{" "}
                                {this.props.event.participants.length} /{" "}
                                {this.props.event.limit} Wish:{" "}
                                {this.props.event.interested.length}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </Link>
            </MDBCol>
        );
    }
}

export default EventCard;
