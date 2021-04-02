import axios from "axios";
import React, { Component } from "react";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = { event: null, redirect: null };
    }

    fetchEvent() {
        const token = localStorage.getItem("token");
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/events/${this.props.match.params.id}`,
                { headers: { authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                this.setState({ event: response.data }, () => {
                    console.log(this.state.event);
                });
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 401:
                        this.props.handleLogout();
                        break;
                    default:
                        window.location.href = `/404`;
                }
            });
    }

    componentDidMount() {
        this.fetchEvent();
    }

    render() {
        return !this.state.event ? null : (
            <React.Fragment>
                <h1>Event Page {this.props.match.params.id}</h1>
            </React.Fragment>
        );
    }
}

export default Event;
