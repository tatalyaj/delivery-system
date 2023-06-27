import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import regexValidation from "./../utils/Regex";

export default class DriverDialog extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      driverForEdit: this.props?.driverForEdit
        ? { ...this.props?.driverForEdit }
        : {
            driverForEdit: null,
            firstName: null,
            lastName: null,
            phone: null,
            distributionArea: null,
          },
      showDialog: false,
    };
  }

  // Validation function can be used in post and put
  isDriverValidFunc = (driver) => {
    let isDriverValid = true;
    const validPhone = regexValidation.validPhoneRegex;
    const validName = regexValidation.validNameRegex;
    // For the field names - An array containing all the Object's properties
    let fieldNames = Object.getOwnPropertyNames(driver);
    const errors = {};
    for (const item of fieldNames) {
      switch (item) {
        case "firstName":
          if (!validName.test(driver.firstName) || !driver.firstName) {
            errors["eFirstName"] = "Please choose a valid  first name.";
            isDriverValid = false;
          }
          break;
        case "lastName":
          if (!validName.test(driver.lastName) || !driver.lastName) {
            errors["eLastName"] = "Please choose a valid  last name.";
            isDriverValid = false;
          }
          break;
        case "phone":
          if (!validPhone.test(driver.phone) || !driver.phone) {
            errors["ePhone"] = "Please choose a valid  phone number.";
            isDriverValid = false;
          }
          break;
        case "distributionArea":
          if (!driver.distributionArea) {
            errors["eDistributionArea"] =
              "Please choose a valid  distribution area.";
            isDriverValid = false;
          }
          break;
        default:
          break;
      }
    }
    this.setState({ ...this.state, errors: errors });
    return isDriverValid;
  };

  // HANDLE CLOSE DIALOG
  handleClose() {
    this.setState({
      showDriverDialog: false,
      driverForEdit: null,
      firstName: null,
      lastName: null,
      phone: null,
      distributionArea: null,
      errors: {
        eFirstName: null,
        eLastName: null,
        ePhone: null,
        eDistributionArea: null,
      },
    });
    this.props.onDialogClose();
  }
  // HANDLE THE SAVE CHANGES BUTTON
  handleSaveDriver = (driver) => {
    let isValid = this.isDriverValidFunc(driver);
    if (isValid) {
      this.props.onDriverChanged(driver);
      console.log("Driver is valid");
      this.handleClose();
    } else {
      console.log("not valid");
    }
  };
  // HANDLE CHAMGE
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      driverForEdit: {
        ...this.state.driverForEdit,
        [name]: value,
      },
      errors: {
        ...this.state.errors,
        ["e" + name.charAt(0).toUpperCase() + name.slice(1)]: null,
      },
    });
  };

  render() {
    return (
      <Form noValidate>
        <Modal
          show={this.props.showDialog}
          onHide={this.handleClose.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.driverForEdit ? "Edit Driver" : "Add Driver"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3" controlId="form.ControlInputFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="firstName"
                defaultValue={this.state.driverForEdit?.firstName}
                onChange={this.handleChange}
                placeholder="First name..."
                isInvalid={!!this.state.errors?.eFirstName}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors?.eFirstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.ControlInputLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="lastName"
                defaultValue={this.state.driverForEdit?.lastName}
                onChange={this.handleChange}
                placeholder="Last name..."
                isInvalid={!!this.state.errors?.eLastName}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors?.eLastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="form.ControlInputPhoneNumber"
            >
              <Form.Label> Phone Number</Form.Label>
              <Form.Control
                required
                type="text"
                name="phone"
                defaultValue={this.state.driverForEdit?.phone}
                onChange={this.handleChange}
                placeholder="Phone number..."
                isInvalid={!!this.state.errors?.ePhone}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors?.ePhone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="form.ControlInputDistributionArea"
            >
              <Form.Label> Distribution Area</Form.Label>
              <Form.Control
                required
                type="text"
                name="distributionArea"
                defaultValue={this.state.driverForEdit?.distributionArea}
                onChange={this.handleChange}
                placeholder="Distribution area..."
                isInvalid={!!this.state.errors?.eDistributionArea}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors?.eDistributionArea}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => this.handleSaveDriver(this.state.driverForEdit)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    );
  }
}
