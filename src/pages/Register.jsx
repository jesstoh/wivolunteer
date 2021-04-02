import React, { Component } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBCard,
    MDBCardBody,
} from "mdbreact";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", errorMessage: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post(`${process.env.REACT_APP_API_URL}/users`, {
                email: this.state.email,
                password: this.state.password,
            })
            .then((response) => {
                this.setState({ errorMessage: "" });//  Clear error message
                this.props.handleLogin(
                    response.data.jwtToken,
                    response.data.user
                ); // Change state to authenticated and save jwt token
                
            })
            .catch((err) => {
                this.setState({
                    errorMessage: err.response.data.error,
                    email: "",
                    password: "",
                }); // Set error message to display
            });
    }

    render() {
        return (
            <MDBContainer className="pt-5">
                <MDBRow>
                    <MDBCol md="6 offset-3">
                        <MDBCard>
                            <MDBCardBody>
                                <form onSubmit={this.handleSubmit}>
                                    <p className="h5 text-center mb-4">
                                        Sign Up
                                    </p>
                                    <div className="grey-text">
                                        <MDBInput
                                            label="Type your email"
                                            icon="envelope"
                                            group
                                            type="email"
                                            validate
                                            error="wrong"
                                            success="right"
                                            value={this.state.email}
                                            id="email"
                                            onChange={this.handleChange}
                                            required
                                        />
                                        <MDBInput
                                            label="Type your password"
                                            icon="lock"
                                            group
                                            type="password"
                                            validate
                                            value={this.state.password}
                                            id="password"
                                            onChange={this.handleChange}
                                            required
                                            minLength="6"
                                        />
                                    </div>
                                    <p className="red-text">
                                        {this.state.errorMessage}
                                    </p>
                                    <div className="text-center">
                                        <MDBBtn type="submit">Sign Up</MDBBtn>
                                    </div>
                                </form>

                                <p className="text-right pt-4">
                                    Already a member?{" "}
                                    <Link to="/login">Login here</Link>
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}


export default Register;
