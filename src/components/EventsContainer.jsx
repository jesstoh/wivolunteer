import React, { Component } from 'react';
import EventCard from './EventCard.jsx';

class EventsContainer extends Component {
	render() {
		return !this.props.eventData.length ? (
			<div style={{ width: '100%' }}><p className="pl-4">{this.props.noResultMessage}</p></div>
		) : (
			<div style={{ width: '100%' }}>
				<p className="pl-4">{this.props.message}</p>
				{this.props.eventData.map((event) => (
					<EventCard key={event._id} event={event} />
				))}
			</div>
		);
	}
}

export default EventsContainer;
