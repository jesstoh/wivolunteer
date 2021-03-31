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
                            <MDBNavItem active={currentPath === "/home"}>
                                <MDBNavLink to="/home">
                                    <MDBIcon icon="home" size="lg" />
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={currentPath === "/profile"}>
                                <MDBNavLink to="/profile">
                                    <MDBIcon icon="user" size="lg" />{" "}
                                    {this.props.user.username}
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={currentPath === "/user/events"}>
                                <MDBNavLink to="/user/events">
                                    My Event
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem onClick={this.props.handleLogout}>
                                <MDBNavLink to="#">Logout</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </header>
        );
    }
}

export default withRouter(Header);
