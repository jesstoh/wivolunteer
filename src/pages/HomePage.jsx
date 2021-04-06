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
            noResultMessage: "No related event found for next 1 month", // message of display when no event found
            message: "", // message of event display result
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
    fetchData(message, noResultMessage) {
        const token = localStorage.getItem("token");
        axios
            .get(this.state.url, {
                headers: { authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    eventData: response.data,
                    message: message,
                    noResultMessage: noResultMessage,
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
        this.fetchData(this.state.message, this.state.noResultMessage);
    }

    // Handle date change on calendar
    dateChange(value, event) {
        let newURL = "";
        // Generate url of search
        if (this.state.search) {
            const searchCat = this.state.searchValue.map((ele) => ele.value);
            const cat = JSON.stringify(searchCat);
            newURL =
                this.state.baseURL +
                `/find/?cat=${cat}&date=${value.toISOString()}`;
        } else {
            newURL =
                this.state.baseURL +
                `${this.state.all ? "/all" : ""}` +
                `/?date=${value.toISOString()}`;
        }
        this.setState(
            {
                date: value,
                url: newURL,
            },
            () => {
                this.fetchData(this.state.message, this.state.noResultMessage);
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
                    searchValue: [],
                    url:
                        this.state.baseURL +
                        `${event.target.id !== "all" ? "" : "/all"}` +
                        `/?date=${this.state.date.toISOString()}`,
                },
                () => {
                    this.fetchData(
                        "",
                        "No related event found for next 1 month"
                    );
                }
            );
        }
    }

    // Fetch search result
    handleSearch(event) {
        event.preventDefault();
        // convert to query string
        const searchCat = this.state.searchValue.map((ele) => ele.value);
        const cat = JSON.stringify(searchCat);

        // If not empty search string
        if (searchCat.length) {
            this.setState(
                {
                    search: true,
                    all: false,
                    // searchValue: [],
                    url:
                        this.state.baseURL +
                        `/find/?cat=${cat}&date=${this.state.date.toISOString()}`,
                },
                () => {
                    // console.log(this.state.url)
                    this.fetchData(
                        `Search Result for ${searchCat.join(", ")}`,
                        `No Search Result for ${searchCat.join(
                            ", "
                        )} in next 1 month`
                    );
                }
            );
        } else { //Show all result if search bar is empty string
            this.setState(
                {
                    all: true,
                    search: false,
                    url:
                        this.state.baseURL +
                        `/all/?date=${this.state.date.toISOString()}`,
                },
                () => {
                    this.fetchData(
                        "",
                        "No related event found for next 1 month"
                    );
                }
            );
        }
    }

    render() {
        return (
            <MDBContainer className="pt-4">
                <MDBRow>
                    <MDBCol sm="5" md="5" className="pl-4">
                        <Select
                            options={this.options}
                            className=""
                            value={this.state.searchValue}
                            isMulti
                            onChange={this.handleSelect}
                        />
                    </MDBCol>
                    <MDBCol sm="1">
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

                <MDBRow className="pt-4">
                    <MDBCol md="5" lg="4" className="pt-5 order-sm-last mb-5">
                        <p className="font-italic pt-2" style={{"font-size":"smaller"}}>Pick a date to find related events from selected date to next 1 month</p>
                        <Calendar
                            className="mx-auto mt-3"
                            minDate={new Date()}
                            value={this.state.date}
                            onChange={this.dateChange}
                        />
                    </MDBCol>
                    <MDBCol md="7" lg="8">
                        <MDBRow className="pb-2">
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
                                    active={
                                        !this.state.all && !this.state.search
                                    }
                                    onClick={this.toggleAll}
                                    className="btn-rounded"
                                    color="light-blue"
                                    size="sm"
                                >
                                    Interests
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                        {!this.state.eventData ? null : (
                            <EventsContainer
                                eventData={this.state.eventData}
                                noResultMessage={this.state.noResultMessage}
                                message={this.state.message}
                            />
                        )}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default HomePage;
