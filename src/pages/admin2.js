import React from "react";
import Admin from "../classes/admin";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const adminService = new Admin();

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: adminService.getAddresses(),
      addressForEdit: null,
      showDialog: false,
      updatedCity: null,
      updatedAddress: null,
      updatedDeliveryType: null,
      updatedFrequency: null,
      updatedRecipientName: null,
      updatedRecipientPhone: null,
      newCity: null,
      newAddress: null,
      newDeliveryType: null,
      newFrequency: null,
      newRecipientName: null,
      newRecipientPhone: null,
    };

    // this.getAddresses();
  }
  // ADDRESSES
  // For the "GET" scenario
  getAddresses() {
    this.setState({
      addresses: adminService.getAddresses(),
    });
  }
  // For the "DELETE" scenario
  handleDelete(id, event) {
    adminService.deleteAddress(id);
    this.getAddresses();
  }
  handleClose() {
    this.setState({
      showDialog: false,
      addressForEdit: null,
      updatedCity: null,
      updatedAddress: null,
      updatedDeliveryType: null,
      updatedFrequency: null,
      updatedRecipientName: null,
      updatedRecipientPhone: null,
      newCity: null,
      newAddress: null,
      newDeliveryType: null,
      newFrequency: null,
      newRecipientName: null,
      newRecipientPhone: null,
    });
  }

  // For the "UPDATE" scenario
  handleChange = (e) => {
    // const value = e.target.value;
    //if(e.className == "edit.button")
    const { name, value } = e.target;
    console.log(name, value);
    //console.log([name]);
    // this.setState({ ...this.state, [e.target?.name]: value });
    this.setState({ [name]: value });
    //console.log(this.state.updatedAddress);
  };
  //   handleChange = (e) => {
  //     const updateNameKey = "updated";
  //     const newNameKey = "new";
  //     console.log(e);
  //     console.log(e.className);
  //     if (e.className === "edit.button") {
  //       const { name, value } = e.target;
  //       const updatedName = updateNameKey + name;
  //       console.log(updatedName);
  //       this.setState({ [updatedName]: value });
  //     } else if (e.className === "add.button") {
  //       const { name, value } = e.target;
  //       const newName = newNameKey + name;
  //       console.log(newName);
  //       this.setState({ [newName]: value });
  //     }
  //   };
  handleEditAddress(
    id,
    city,
    address,
    deliveryType,
    frequency,
    recipientName,
    recipientPhone
  ) {
    //his.setState({ updatedAddress: addressName });
    //console.log(addressName);
    console.log(
      id,
      city,
      address,
      deliveryType,
      frequency,
      recipientName,
      recipientPhone
    );

    adminService.editAddress(
      id,
      city,
      address,
      deliveryType,
      frequency,
      recipientName,
      recipientPhone
    );
    this.getAddresses();
  }

  handleShowEditDialog(address) {
    this.setState({ showDialog: true, addressForEdit: address });
  }
  // The "ADD" scenario
  handleShowAddDialog(e) {
    this.setState({ showDialog: true });
    console.log(e);
  }

  handleAddAddress(
    city,
    address,
    deliveryType,
    frequency,
    recipientName,
    recipientPhone
  ) {
    adminService.addAddress(
      city,
      address,
      deliveryType,
      frequency,
      recipientName,
      recipientPhone
    );
    this.getAddresses();
  }

  render() {
    return (
      <div>
        <button
          className="add-button "
          onClick={(e) => this.handleShowAddDialog(e)}
        >
          Add
        </button>
        <table className="addresses-table">
          <tbody>
            <thead>
              <td>Name</td>
            </thead>
            {this.state.addresses?.map((item) => (
              <tr key={item?.id}>
                <td>{item?.city}</td>
                <td>
                  <button onClick={(e) => this.handleDelete(item.id, e)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="edit-buttons"
                    onClick={(e) => this.handleShowEditDialog(item, e)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          show={this.state.showDialog}
          onHide={this.handleClose.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <p>{this.state.addressForEdit?.name}</p> */}
            <label>
              City:
              <input
                type="text"
                name="updatedCity"
                value={this.state.updatedCity}
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              Address:
              <input
                type="text"
                name="updatedAddress"
                value={this.state.updatedAddress}
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              Delivery type:
              <input
                type="text"
                name="updatedDeliveryType"
                value={this.state.updatedDeliveryType}
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              Frequency:
              <input
                type="text"
                name="updatedFrequency"
                value={this.state.updatedFrequency}
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              Recipient name:
              <input
                type="text"
                name="updatedRecipientName"
                value={this.state.updatedRecipientName}
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              Recipient Phone number:
              <input
                type="text"
                name="updatedRecipientPhone"
                value={this.state.updatedRecipientPhone}
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
              onClick={() =>
                this.handleEditAddress(
                  this.state.addressForEdit?.id,
                  this.state.updatedCity,
                  this.state.updatedAddress,
                  this.state.updatedDeliveryType,
                  this.state.updatedFrequency,
                  this.state.updatedRecipientName,
                  this.state.updatedRecipientPhone
                )
              }
            >
              Save Changes
            </Button>
            <Button
              variant="primary"
              //   style={{ display: "none" }}
              onClick={() =>
                this.handleAddAddress(
                  this.state.newCity,
                  this.state.newAddress,
                  this.state.newDeliveryType,
                  this.state.newFrequency,
                  this.state.newRecipientName,
                  this.state.newRecipientPhone
                )
              }
            >
              Add Address
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
