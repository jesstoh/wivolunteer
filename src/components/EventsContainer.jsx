import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import EventCard from "./EventCard.jsx";

class EventsContainer extends Component {
    render() {
        return (
            <div style={{width: "100%"}}>
                {this.props.eventData.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        );
    }
}

export default EventsContainer;
