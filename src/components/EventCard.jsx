import React, { Component } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBCol,
} from "mdbreact";
import { Link } from "react-router-dom";
import Moment from "react-moment";

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
                                Date: <Moment date={this.props.event.dateTime} format="ddd, DD MMM YYYY"/> <br />
                                Time: <Moment date={this.props.event.dateTime} format="LT"/> <br />
                                Organizer: {
                                    this.props.event.organiser.username
                                }{" "}
                                <br />
                                Location: {this.props.event.location} <br />
                                Type: {this.props.event.eventType.join(", ")} <br />
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
