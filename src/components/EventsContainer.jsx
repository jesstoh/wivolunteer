import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import EventCard from './EventCard.jsx';

class EventsContainer extends Component {
	render() {
		return !this.props.eventData.length ? (
			<div style={{ width: '100%' }}>{this.props.message}</div>
		) : (
			<div style={{ width: '100%' }}>
				{this.props.eventData.map((event) => (
					<EventCard key={event._id} event={event} />
				))}
			</div>
		);
	}
}

export default EventsContainer;
