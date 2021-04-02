import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

import EventCard from "../components/EventCard.jsx";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            all: false, // all events or event of interests
            baseURL: `${process.env.REACT_APP_API_URL}/events`,
            url: `${process.env.REACT_APP_API_URL}/events`,
            eventData: null,
        };
        this.dateChange = this.dateChange.bind(this);
        // this.showAll = this.showAll.bind(this);
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
                this.setState({ eventData: response.data });
                
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

    // When clicking on all button
    // showAll(event) {
    //     this.setState(
    //         {
    //             all: true,
    //             url:
    //                 this.state.baseURL +
    //                 `/all/?date=${this.state.date.toISOString()}`,
    //         },
    //         () => {
    //             this.fetchData();
    //         }
    //     );
    // }

    // Toggle interest or all buttons, to show all or event of interest
    toggleAll(event) {
        if (!event.target.classList.contains("active")) {
            this.setState(
                {
                    all: !this.state.all,
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
                    <MDBBtn
                        active={!this.state.all}
                        onClick={this.toggleAll}
                        className="btn-rounded"
                        color="blue-grey"
                    >
                        Interests
                    </MDBBtn>
                    <MDBBtn
                        active={this.state.all}
                        onClick={this.toggleAll}
                        className="btn-rounded"
                        color="blue-grey"
                    >
                        All
                    </MDBBtn>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="7" lg="8">
                        {!this.state.eventData
                            ? null
                            : this.state.eventData.map((event) => {
                                  return <EventCard key={event._id} event={event} />;
                              })}
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
