import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBFormInline } from "mdbreact";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Select from "react-select";
import EventsContainer from "../components/EventsContainer.jsx";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            all: false, // all events or event of interests
            search: false, // check if it is search result
            searchValue: [],
            baseURL: `${process.env.REACT_APP_API_URL}/events`,
            url: `${process.env.REACT_APP_API_URL}/events`,
            eventData: null,
            noResultMessage:  "No related event found for next 1 month",// message of display when no event found
            message: "" // message of event display result
        };
        this.options = [
            { value: "humanitarian", label: "Humanitarian" },
            { value: "environment", label: "Environment" },
            { value: "animal-welfare", label: "Animal-Welfare" },
            { value: "community", label: "Community" },
            { value: "disability", label: "Disability" },
            { value: "health", label: "Health" },
        ];
        this.dateChange = this.dateChange.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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

    // Handle search multiple select
    handleSelect(selectedValue) {
        this.setState({ searchValue: selectedValue });
        // console.log(selectedValue)
    }

    // Toggle interest or all buttons, to show all or event of interest
    toggleAll(event) {
        if (!event.target.classList.contains("active")) {
            this.setState(
                {
                    all: event.target.id === "all",
                    search: false,
                    message: "No related event found for next 1 month",
                    url:
                        this.state.baseURL +
                        `${event.target.id !== "all" ? "" : "/all"}` +
                        `/?date=${this.state.date.toISOString()}`,
                },
                () => {
                    this.fetchData();
                }
            );
        }
    }

    // Fetch search result
    handleSearch(event) {
        event.preventDefault();
        // convert to query string
        const cat = JSON.stringify(
            this.state.searchValue.map((ele) => ele.value)
        );
        console.log(cat);
        this.setState(
            {
                search: true,
                searchValue: [],
                url:
                    this.state.baseURL +
                    `/find/?cat=${cat}&date=${this.state.date.toISOString()}`,
            },
            () => {
                console.log(this.state.url)
                this.fetchData();
            }
        );
    }

    render() {
        return (
            <MDBContainer className="pt-4">
                <MDBRow>
                    <MDBCol md="7" lg="8" className="pl-4">
                        <Select
                            options={this.options}
                            className=""
                            value={this.state.searchValue}
                            isMulti
                            onChange={this.handleSelect}
                        />
                        <MDBBtn
                            size="sm"
                            type="submit"
                            className="mr-auto"
                            gradient="aqua"
                            onClick={this.handleSearch}
                        >
                            Search
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="pt-5">
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
                <MDBRow className="pt-4">
                    <MDBCol md="7" lg="8">
                        {!this.state.eventData ? null : (
                            <EventsContainer eventData={this.state.eventData} noResultMessage={this.state.noResultMessage}/>
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
