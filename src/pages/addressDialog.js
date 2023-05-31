import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// export const AddressDialogContext = createContext({ showDialog: false });

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
          },

      showDialog: false,
    };
  }
  // HANDLE CLOSE DIALOG
  handleClose() {
    this.props.onDialogClose();
  }
  // HANDLE THE SAVE CHANGES BUTTON
  handleSaveAddress = (address) => {
    this.props.onAddressChanged(address);
    this.handleClose();
  };
  // HANDLE CHANGE
  handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, value);
    this.setState({
      addressForEdit: {
        ...this.state.addressForEdit,
        [name]: value,
      },
    });
  };

  render() {
    return (
      <Modal show={this.props.showDialog} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.addressForEdit ? "Edit address" : "Add address"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="form.ControlInputCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                defaultValue={this.state.addressForEdit?.city}
                onChange={this.handleChange}
                placeholder="City name..."
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.ControlInputAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                defaultValue={this.state.addressForEdit?.address}
                onChange={this.handleChange}
                placeholder="Address name..."
              />
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.ControlInputFrequency">
              <Form.Label> Frequency</Form.Label>
              <Form.Control
                type="text"
                name="frequency"
                defaultValue={this.state.addressForEdit?.frequency}
                onChange={this.handleChange}
                placeholder="Frequency..."
              />
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
              />
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
              />
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
