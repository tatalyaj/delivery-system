import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import regexValidation from "../utils/regexUtils";
import { Autocomplete } from "@react-google-maps/api";
// const API_KEY = "AIzaSyAxpENORc-fSayGHWY-gbKeI8lH2sqeG1A";

export default class AddressDialog extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      addressForEdit: this.props?.addressForEdit
        ? { ...this.props?.addressForEdit }
        : {
            addressForEdit: null,
            city: null,
            address: null,
            deliveryType: null,
            frequency: null,
            recipientName: null,
            recipientPhone: null,
            assignedTo: null,
            coordinates: null,
          },

      showDialog: false,
      coordinates: null,
      autocomplete: null,
    };
  }
  // HANDLE CLOSE DIALOG
  handleClose() {
    this.setState({
      showAddressDialog: false,
      addressForEdit: null,
      city: null,
      address: null,
      deliveryType: null,
      frequency: null,
      recipientName: null,
      recipientPhone: null,
      assignedTo: null,
      errors: {
        eCity: null,
        eAddress: null,
        eDeliveryType: null,
        eFrequency: null,
        eRecipientName: null,
        eRecipientPhone: null,
        eAssignedTo: null,
      },
    });
    this.props.onDialogClose();
  }

  // Validation function can be used in post and put
  isAddressValidFunc = (address) => {
    let isAddressValid = true;
    const validPhone = regexValidation.validPhoneRegex;
    const validName = regexValidation.validNameRegex;
    // For the field names - An array containing all the Object's properties
    let fieldNames = Object.getOwnPropertyNames(address);
    const errors = {};
    for (const item of fieldNames) {
      switch (item) {
        case "city":
          if (!address.city) {
            errors["eCity"] = "Please choose a valid  city name.";
            isAddressValid = false;
          }
          break;
        case "address":
          if (!address.address) {
            errors["eAddress"] = "Please choose a valid  address name.";
            isAddressValid = false;
          }
          break;
        case "deliveryType":
          if (!address.deliveryType) {
            errors["eDeliveryType"] = "Please choose a valid  delivery type.";
            isAddressValid = false;
          }
          break;
        case "frequency":
          if (!address.frequency) {
            errors["eFrequency"] = "Please choose a valid  frequency type.";
            isAddressValid = false;
          }
          break;
        case "recipientName":
          if (
            !validName.test(address.recipientName) ||
            !address.recipientName
          ) {
            errors["eRecipientName"] = "Please choose a valid  name.";
            isAddressValid = false;
          }
          break;
        case "recipientPhone":
          if (
            !validPhone.test(address.recipientPhone) ||
            !address.recipientPhone
          ) {
            errors["eRecipientPhone"] = "Please choose a valid  phone number.";
            isAddressValid = false;
          }
          break;
        case "assignedTo":
          if (!address.assignedTo) {
            errors["eAssignedTo"] = "Please choose a valid  name.";
            isAddressValid = false;
          }
          break;

        default:
          break;
      }
    }
    this.setState({ ...this.state, errors: errors });
    return isAddressValid;
  };

  // HANDLE THE SAVE CHANGES BUTTON
  handleSaveAddress = (address) => {
    let isValid = this.isAddressValidFunc(address);
    if (isValid) {
      this.props.onAddressChanged(address);
      console.log("Address is valid");
      this.handleClose();
    } else {
      console.log("not valid");
    }
  };
  // HANDLE CHANGE
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      addressForEdit: {
        ...this.state.addressForEdit,
        [name]: value,
      },
    });
  };
  // For the map
  onLoad(autocomplete) {
    console.log("autocomplete: ", autocomplete);

    this.autocomplete = autocomplete;
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }
  render() {
    return (
      <Modal show={this.props.showDialog} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.addressForEdit ? "Edit address" : "Add address"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group className="mb-3" controlId="form.ControlInputCity">
              <Form.Label>City</Form.Label>

              <Form.Control
                type="text"
                name="city"
                defaultValue={this.state.addressForEdit?.city}
                onChange={this.handleChange}
                placeholder="City name..."
                isInvalid={!!this.state.errors?.eCity}
              />

              <Form.Control.Feedback type="invalid">
                {this.state.errors?.eCity}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.ControlInputAddress">
              <Form.Label>Address</Form.Label>
              <Autocomplete
                onLoad={this.onLoad.bind(this)}
                onPlaceChanged={this.onPlaceChanged.bind(this)}
              >
                <Form.Control
                  type="text"
                  name="address"
                  defaultValue={this.state.addressForEdit?.address}
                  onChange={this.handleChange}
                  placeholder="Address name..."
                  isInvalid={!!this.state.errors?.eAddress}
                />
              </Autocomplete>
              <Form.Control.Feedback type="invalid">
                {this.state.errors?.eAddress}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="form.ControlInputDeliveryType"
            >
              <Form.Label> Delivery Type</Form.Label>
              <Form.Control
                type="text"
                name="deliveryType"
                defaultValue={this.state.addressForEdit?.deliveryType}
                onChange={this.handleChange}
                placeholder="Delivery type..."
                isInvalid={!!this.state.errors?.eDeliveryType}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors?.eDeliveryType}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.ControlInputFrequency">
              <Form.Label> Frequency</Form.Label>
              <Form.Control
                type="text"
                name="frequency"
                defaultValue={this.state.addressForEdit?.frequency}
                onChange={this.handleChange}
                placeholder="Frequency..."
                isInvalid={!!this.state.errors?.eFrequency}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors?.eFrequency}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="form.ControlInputRecipientName"
            >
              <Form.Label> Recipient Name</Form.Label>
              <Form.Control
                type="text"
                name="recipientName"
                defaultValue={this.state.addressForEdit?.recipientName}
                onChange={this.handleChange}
                placeholder="Frequency..."
                isInvalid={!!this.state.errors?.eRecipientName}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors?.eRecipientName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="form.ControlInputRecipientPhone"
            >
              <Form.Label> Recipient Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="recipientPhone"
                defaultValue={this.state.addressForEdit?.recipientPhone}
                onChange={this.handleChange}
                placeholder="Recipient phone number..."
                isInvalid={!!this.state.errors?.eRecipientPhone}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors?.eRecipientPhone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="form.ControlInputAssignedTo"
            >
              <Form.Label> Assigned to </Form.Label>
              <Form.Control
                type="text"
                name="assignedTo"
                defaultValue={this.state.addressForEdit?.assignedTo}
                onChange={this.handleChange}
                placeholder="Assigned to..."
                isInvalid={!!this.state.errors?.eAssignedTo}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors?.eAssignedTo}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleClose()}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => this.handleSaveAddress(this.state.addressForEdit)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

/**
 * GooglePlacesAutocomplete:
 *  <GooglePlacesAutocomplete
                apiKey={API_KEY}
                name="address"
                defaultValue={this.state.addressForEdit?.address}
                selectProps={{
                  onChange: this.handleChange,
                }}
                isInvalid={!!this.state.errors?.eAddress}
              />
 */
/**
 * PlacesAutocomplete:
 *  { <PlacesAutocomplete
                defaultValue={this.state.addressForEdit?.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              /> }

    THE FUNC:

     // //  HANDLE SELECT
  // handleSelect = async (value) => {
  //   // const results = await geocodeByAddress(value);
  //   // const latLing = await getLatLng(results[0]);
  //   this.setState({
  //     ...this.state,
  //     address: value,
  //     // coordinates: latLing,
  //   });
  // };
 */
