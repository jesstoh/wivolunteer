import React, { Component } from "react";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavItem,
    MDBNavLink,
    MDBIcon,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
} from "mdbreact";
import { withRouter } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { collapse: false };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    render() {
        const currentPath = this.props.location.pathname;
        return (
            <header>
                <MDBNavbar
                    style={{ background: "#2BBBAD" }}
                    dark
                    expand="md"
                    scrolling
                    fixed="top"
                >
                    <MDBNavbarBrand href="/home">
                        <strong>WiVolunteer</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.onClick} />
                    <MDBCollapse isOpen={this.state.collapse} navbar>
                        <MDBNavbarNav right>
                            <MDBNavItem active={currentPath === "/home"} className="mr-3">
                                <MDBNavLink to="/home">
                                    <MDBIcon icon="home" size="lg" />
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className="mr-2">
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <span className="mr-2">
                                            <MDBIcon icon="user" size="lg" />{" "}
                                            {this.props.user.username}
                                        </span>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem href="/user/events">
                                            My Event
                                        </MDBDropdownItem>
                                        <MDBDropdownItem href="/profile">
                                            My Profile
                                        </MDBDropdownItem>
                                        <MDBDropdownItem
                                            onClick={this.props.handleLogout}
                                        >
                                            Logout
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                            <MDBNavItem active={currentPath === "/event/form"} className="mr-2">
                                <MDBNavLink to="/event/form">
                                    New Event
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </header>
        );
    }
}

export default withRouter(Header);
