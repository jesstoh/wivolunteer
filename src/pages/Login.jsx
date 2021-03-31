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

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <MDBContainer className="pt-5">
                <MDBRow>
                    <MDBCol md="6 offset-3">
                        <MDBCard>
                            <MDBCardBody>
                                <form>
                                    <p className="h5 text-center mb-4">
                                        Sign in
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
                                        />
                                        <MDBInput
                                            label="Type your password"
                                            icon="lock"
                                            group
                                            type="password"
                                            validate
                                        />
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn>Login</MDBBtn>
                                    </div>
                                </form>
                                <p className="text-right pt-4">
                                    Not a member yet?{" "}
                                    <Link to="/register">Sign Up Now</Link>
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Login;
