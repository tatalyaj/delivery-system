import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// inputs should be validated - if not valid - show error

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
  // HANDLE CLOSE DIALOG
  handleClose() {
    this.setState({
      showDriverDialog: false,
      driverForEdit: null,
      firstName: null,
      lastName: null,
      phone: null,
      distributionArea: null,
    });
    this.props.onDialogClose();
  }
  // HANDLE THE SAVE CHANGES BUTTON
  handleSaveDriver = (driver) => {
    this.props.onDriverChanged(driver);
    this.handleClose();
  };
  // HANDLE CHAMGE
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      driverForEdit: {
        ...this.state.driverForEdit,
        [name]: value,
      },
    });
  };
  render() {
    return (
      <Modal show={this.props.showDialog} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.driverForEdit ? "Edit Driver" : "Add Driver"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="form.ControlInputFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                defaultValue={this.state.driverForEdit?.firstName}
                onChange={this.handleChange}
                placeholder="First name..."
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.ControlInputLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                defaultValue={this.state.driverForEdit?.lastName}
                onChange={this.handleChange}
                placeholder="Last name..."
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="form.ControlInputPhoneNumber"
            >
              <Form.Label> Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                defaultValue={this.state.driverForEdit?.phone}
                onChange={this.handleChange}
                placeholder="Phone number..."
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="form.ControlInputDistributionArea"
            >
              <Form.Label> Distribution Area</Form.Label>
              <Form.Control
                type="text"
                name="distributionArea"
                defaultValue={this.state.driverForEdit?.distributionArea}
                onChange={this.handleChange}
                placeholder="Distribution area..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.handleCloseDriverDialog()}
          >
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
    );
  }
}
