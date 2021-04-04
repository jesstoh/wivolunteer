import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

import EventsContainer from "../components/EventsContainer.jsx";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            all: false, // all events or event of interests
            search: false, // check if it is search result
            baseURL: `${process.env.REACT_APP_API_URL}/events`,
            url: `${process.env.REACT_APP_API_URL}/events`,
            eventData: null,
        };
        this.dateChange = this.dateChange.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    // Fetch event data
    fetchData() {
        const token = localStorage.getItem("token");
        axios
            .get(this.state.url, {
                headers: { authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({ eventData: response.data }, () => {
                    console.log(this.state.eventData);
                    console.log(this.state.eventData === []);
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    this.props.handleLogout();
                }
            });
    }

    componentDidMount() {
        // Fetch events of interests based on date today
        this.fetchData();
    }

    // Handle date change on calendar
    dateChange(value, event) {
        this.setState(
            {
                date: value,
                url:
                    this.state.baseURL +
                    `${this.state.all ? "/all" : ""}` +
                    `/?date=${value.toISOString()}`,
            },
            () => {
                this.fetchData();
            }
        );
    }

    // Toggle interest or all buttons, to show all or event of interest
    toggleAll(event) {
        if (!event.target.classList.contains("active")) {
            this.setState(
                {
                    all: (event.target.id === "all"),
                    search: false,
                    url:
                        this.state.baseURL +
                        `${this.state.all ? "" : "/all"}` +
                        `/?date=${this.state.date.toISOString()}`,
                },
                () => {
                    this.fetchData();
                }
            );
        }
    }

    render() {
        return (
            <MDBContainer className="pt-4">
                <MDBRow>Search Bar</MDBRow>
                <MDBRow>
                    <MDBCol className="pl-4">
                        <MDBBtn
                            active={this.state.all}
                            onClick={this.toggleAll}
                            className="btn-rounded"
                            id="all"
                            color="light-blue"
                            size="sm"
                        >
                            All
                        </MDBBtn>
                        <MDBBtn
                            active={!this.state.all && !this.state.search}
                            onClick={this.toggleAll}
                            className="btn-rounded"
                            color="light-blue"
                            size="sm"
                        >
                            Interests
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="pt-5">
                    <MDBCol md="7" lg="8">
                        {!this.state.eventData ? null : (
                            <EventsContainer eventData={this.state.eventData} />
                        )}
                    </MDBCol>
                    <MDBCol md="5" lg="4">
                        <Calendar
                            className="mx-auto"
                            minDate={new Date()}
                            value={this.state.date}
                            onChange={this.dateChange}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default HomePage;
