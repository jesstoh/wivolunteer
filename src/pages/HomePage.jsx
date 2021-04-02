import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            baseURL: `${process.env.REACT_APP_API_URL}/events`,
            url: `${process.env.REACT_APP_API_URL}/events`,
        };
        this.dateChange = this.dateChange.bind(this);
    }

    // Handle date change on calendar
    dateChange(value, event) {
        this.setState({ date: value, url: this.state.baseURL + `/?date=${value.toISOString()}`}, () => {
            this.fetchData();
        });
    }

    // Fetch event data
    fetchData() {
        const token = localStorage.getItem("token");
        axios
            .get(this.state.url, {
                headers: { authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response.data);
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

    render() {
        return (
            <MDBContainer className="pt-4">
                <MDBRow>Search Bar</MDBRow>
                <MDBRow>
                    <MDBBtn>Interest</MDBBtn>
                    <MDBBtn>All</MDBBtn>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="7" lg="8">
                        Event Display
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
