import React, { Component } from "react";
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBRow,
    MDBCol,
} from "mdbreact";

class ParticipantsModal extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }

    render() {
        return (
            <React.Fragment>
                <MDBBtn onClick={this.toggle}>Participants Info</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>
                        Participant Contact Details
                    </MDBModalHeader>
                    <MDBModalBody>
                        {this.props.participants.map((participant) => {
                            return (
                                <MDBRow key={participant._id}>
                                    <MDBCol>{participant.username}</MDBCol>
                                    <MDBCol>{participant.email}</MDBCol>
                                    <MDBCol>{participant.contact}</MDBCol>
                                </MDBRow>
                            );
                        })}
                    </MDBModalBody>
                    <MDBModalFooter>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>
        );
    }
}

export default ParticipantsModal;
