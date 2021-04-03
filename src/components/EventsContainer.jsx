import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import EventCard from "./EventCard.jsx";

class EventsContainer extends Component {
    render() {
        return !this.props.eventData.length ? (
            "No Relevant Event found for next seletecd 1 month"
        ) : (
            <div style={{ width: "100%" }}>
                {this.props.eventData.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        );
    }
}

export default EventsContainer;