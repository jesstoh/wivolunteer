import React, { Component } from "react";
import { MDBContainer, MDBBtn } from "mdbreact";

class ImageUploadWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageUrl: "",
			imageAlt: "",
			cloudName: "eclixpe",
		};
	}
	openWidget = () => {
		// create the widget
		const widget = window.cloudinary.createUploadWidget(
			{
				cloudName: this.state.cloudName,
				uploadPreset: "nkhmpywj",
			},
			(error, result) => {
				if (result.event === "success") {
					this.setState({
						imageUrl: result.info.secure_url,
						imageAlt: result.info.original_filename,
					});
				} else {
					console.log(error);
				}
			}
		);
		widget.open(); // open up the widget after creation
	};

	render() {
		return <MDBBtn onClick={this.openWidget}>Upload Image</MDBBtn>;
	}
}

export default ImageUploadWidget;
