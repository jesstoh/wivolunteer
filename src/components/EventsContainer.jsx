import React, { Component } from 'react';
import EventCard from './EventCard.jsx';

class EventsContainer extends Component {
	render() {
		return !this.props.eventData.length ? (
			<div style={{ width: '100%' }}>{this.props.noResultMessage}</div>
		) : (
			<div style={{ width: '100%' }}>
				<span>{this.props.message}</span>
				{this.props.eventData.map((event) => (
					<EventCard key={event._id} event={event} />
				))}
			</div>
		);
	}
}

export default EventsContainer;
