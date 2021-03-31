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

class HeaderPublic extends Component {
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
                    <MDBNavbarBrand href="/">
                        <strong>WiVolunteer</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.onClick} />
                    <MDBCollapse isOpen={this.state.collapse} navbar>
                        <MDBNavbarNav right>
                            <MDBNavItem active={currentPath === "/login"}>
                                <MDBNavLink to="/login">Login</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={currentPath === "/register"}>
                                <MDBNavLink to="/register">Sign Up</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </header>
        );
    }
}

export default withRouter(HeaderPublic);
