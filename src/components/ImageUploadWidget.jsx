import React, { Component } from "react";
import { MDBContainer, MDBBtn } from "mdbreact";

class ImageUploadWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUploaded: false,
			cloudName: "eclixpe",
		};
	}
	openWidget = () => {
		// create the widget

		const widget = window.cloudinary.createUploadWidget(
			{
				cloudName: this.state.cloudName,
				uploadPreset: "nkhmpywj",
				multiple: false,
				showAdvancedOptions: false,
				defaultSource: "local",
				sources: [
					"local",
					"camera",
					"google_drive",
					"facebook",
					"instagram",
					"url",
				],
			},
			(error, response) => {
				if (response.event === "success") {
					this.props.getImageUrl(response.info.secure_url);
					this.setState({ isUploaded: true });
				} else {
					console.log(error);
				}
			}
		);
		widget.open(); // open up the widget after creation
	};

	render() {
		return (
			<MDBBtn
				className="btn-rounded ml-4 text-center"
				outline={this.state.isUploaded ? false : true}
				size="sm"
				onClick={this.openWidget}
			>
				{this.state.isUploaded ? "Image Uploaded" : "Upload Image"}
			</MDBBtn>
		);
	}
}

export default ImageUploadWidget;
