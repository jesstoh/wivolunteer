import React, { Component } from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

class Footer extends Component {
    render() {
        return (
            <MDBFooter
                color="gray"
                className="font-small pt-4 mt-4 fixed-bottom"
            >
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; 2021 Copyright:
                        <a href="https://wivolunteer.herokuapp.com/">
                            WiVolunteer
                        </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        );
    }
}

export default Footer;
