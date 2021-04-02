import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
        this.dateChange = this.dateChange.bind(this);
    }

    // Handle date change on calendar
    dateChange(value, event) {
        this.setState({ date: value }, () => {
            console.log(this.state.date);
        });
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
