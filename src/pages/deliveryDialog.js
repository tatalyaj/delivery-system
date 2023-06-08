import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// export const AddressDialogContext = createContext({ showDialog: false });

export default class DeliveryDialog extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      deliveryForEdit: this.props?.deliveryForEdit
        ? { ...this.props?.deliveryForEdit }
        : {
            deliveryForEdit: null,
            city: null,
            address: null,
            deliveryType: null,
            frequency: null,
            recipientName: null,
            recipientPhone: null,
            done: false,
          },

      showDialog: false,
    };
  }
  // HANDLE CLOSE DIALOG
  handleClose() {
    this.setState({
      showDeliveryDialog: false,
      deliveryForEdit: null,
      city: null,
      address: null,
      deliveryType: null,
      frequency: null,
      recipientName: null,
      recipientPhone: null,
      done: null,
    });
    this.props.onDialogClose();
  }
  // HANDLE THE SAVE CHANGES BUTTON
  handleSaveDelivery = (delivery) => {
    this.props.onDeliveryChanged(delivery);
    this.handleClose();
  };
  // HANDLE CHANGE
  handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, value);
    this.setState({
      deliveryForEdit: {
        ...this.state.deliveryForEdit,
        [name]: value,
      },
    });
  };

  render() {
    return (
      <Modal show={this.props.showDialog} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.deliveryForEdit ? "Edit delivery" : "Add delivery"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group className="mb-3" controlId="form.ControlInputCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                defaultValue={this.state.deliveryForEdit?.city}
                onChange={this.handleChange}
                placeholder="City name..."
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.ControlInputAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                defaultValue={this.state.deliveryForEdit?.address}
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
                defaultValue={this.state.deliveryForEdit?.deliveryType}
                onChange={this.handleChange}
                placeholder="Delivery type..."
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.ControlInputFrequency">
              <Form.Label> Frequency</Form.Label>
              <Form.Control
                type="text"
                name="frequency"
                defaultValue={this.state.deliveryForEdit?.frequency}
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
                defaultValue={this.state.deliveryForEdit?.recipientName}
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
                defaultValue={this.state.deliveryForEdit?.recipientPhone}
                onChange={this.handleChange}
                placeholder="Recipient phone number..."
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.ControlInputDone">
              <Form.Label> Done</Form.Label>
              <Form.Control
                type="text"
                name="done"
                defaultValue={this.state.deliveryForEdit?.done}
                onChange={this.handleChange}
                placeholder="Done..."
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
            onClick={() => this.handleSaveDelivery(this.state.deliveryForEdit)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
