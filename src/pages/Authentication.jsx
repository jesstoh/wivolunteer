import React, { Component } from "react";
import {
    MDBCarousel,
    MDBCarouselCaption,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBView,
    MDBMask
} from "mdbreact";

import landingImage1 from "../images/landing_page_1.jpg";
import landingImage2 from "../images/landing_page_2.jpg";
import landingImage3 from "../images/landing_page_3.jpg";

class Authentication extends Component {
    render() {
        return (
            <React.Fragment>
                <MDBCarousel
                    activeItem={1}
                    length={3}
                    interval={4000}
                    className="z-depth-1"
                >
                    <MDBCarouselInner>
                        <MDBCarouselItem itemId="1">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src={landingImage1}
                                    alt="First slide"
                                />
                                <MDBMask overlay="stylish-light" />
                            </MDBView>
                            <MDBCarouselCaption>
                                <h3 className="h3-responsive">
                                    Be a volunteer
                                </h3>
                                <p></p>
                            </MDBCarouselCaption>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="2">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src={landingImage2}
                                    alt="Second slide"
                                />
                                <MDBMask overlay="stylish-light" />
                            </MDBView>
                            <MDBCarouselCaption>
                                <h3 className="h3-responsive">
                                    Organize Event
                                </h3>
                                <p></p>
                            </MDBCarouselCaption>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="3">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src={landingImage3}
                                    alt="Third slide"
                                />
                                <MDBMask overlay="stylish-light" />
                            </MDBView>
                            <MDBCarouselCaption>
                                <h3 className="h3-responsive">
                                    Give Feedbacks
                                </h3>
                                <p></p>
                            </MDBCarouselCaption>
                        </MDBCarouselItem>
                    </MDBCarouselInner>
                </MDBCarousel>
            </React.Fragment>
        );
    }
}

export default Authentication;
