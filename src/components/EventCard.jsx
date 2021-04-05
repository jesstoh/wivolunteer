import React, { Component } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBCardTitle,
    MDBCardText,
    MDBCol,
    MDBRow,
} from "mdbreact";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class EventCard extends Component {
    render() {
        return (
            <MDBCol className="mb-1">
                <Link to={"/event/" + this.props.event._id}>
                    <MDBCard style={{ width: "90%" }}>
                        <MDBCardBody>
                            <MDBCardTitle>
                                {this.props.event.eventTitle}
                            </MDBCardTitle>
                            <MDBRow>
                                <MDBCol md="4">
                                    <img
                                        src={this.props.event.image}
                                        className="img-fluid img-thumbnail"
                                        style={{ "max-height": "7rem" }}
                                    />
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBCardText>
                                        <MDBIcon far icon="calendar-alt" />{" "}
                                        <Moment
                                            date={this.props.event.dateTime}
                                            format="ddd, DD MMM YYYY"
                                        />{" "}
                                        <br />
                                        <MDBIcon far icon="clock" />{" "}
                                        <Moment
                                            date={this.props.event.dateTime}
                                            format="LT"
                                        />{" "}
                                        <br />
                                        <MDBIcon icon="map-marker-alt" />{" "}
                                        {this.props.event.location} <br />
                                        Organizer:{" "}
                                        {this.props.event.organiser.username}
                                        <br />
                                        Type:{" "}
                                        {this.props.event.eventType.join(
                                            ", "
                                        )}{" "}
                                        <br />
                                        Participants:{" "}
                                        {
                                            this.props.event.participants.length
                                        } / {this.props.event.limit}{" "}
                                        <span className="pl-3">
                                            Wish:{" "}
                                            {this.props.event.interested.length}
                                        </span>
                                    </MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </Link>
            </MDBCol>
        );
    }
}

export default EventCard;
