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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                defaultValue={this.state.addressForEdit?.city}
                onChange={this.handleChange}
                placeholder="City name..."
              />
            </Form.Group>

            {/* add other inputs here */}
          </Form>
          {/* <label>
            City:
            <input
              type="text"
              name="city"
              value={this.state.addressForEdit?.city}
              onChange={this.handleChange}
            ></input>
          </label> */}
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={this.state.addressForEdit?.address}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            Delivery type:
            <input
              type="text"
              name="deliveryType"
              value={this.state.addressForEdit?.deliveryType}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            Frequency:
            <input
              type="text"
              name="frequency"
              value={this.state.addressForEdit?.frequency}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            Recipient name:
            <input
              type="text"
              name="recipientName"
              value={this.state.addressForEdit?.recipientName}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            Recipient Phone number:
            <input
              type="text"
              name="recipientPhone"
              value={this.state.addressForEdit?.recipientPhone}
              onChange={this.handleChange}
            ></input>
          </label>
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
