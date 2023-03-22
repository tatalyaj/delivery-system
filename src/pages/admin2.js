import React from "react";
import Admin from "../classes/admin";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const adminService = new Admin();

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // ADDRESSES
      addresses: adminService.getAddresses(),
      addressForEdit: null,
      showDialog: false,
      showDriverDialog: false,
      city: null,
      address: null,
      deliveryType: null,
      frequency: null,
      recipientName: null,
      recipientPhone: null,
      // DRIVERS
      drivers: adminService.getDrivers(),
      driverForEdit: null,
      firstName: null,
      lastName: null,
      phone: null,
      distributionArea: null,
    };
    // this.getAddresses();
  }

  //**********BOTH ADDRESSES AND DRIVERS**********
  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    // this.setState({ ...this.state, [e.target?.name]: value });
    this.setState({ [name]: value });
  };

  //**********ADDRESSES**********
  // For the "GET" scenario
  getAddresses() {
    this.setState({
      addresses: adminService.getAddresses(),
    });
  }

  // The "ADD" scenario
  handleShowAddDialog(e) {
    this.setState({ showDialog: true });
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

  // For the "DELETE" scenario
  handleDelete(id, event) {
    adminService.deleteAddress(id);
    this.getAddresses();
  }

  // For the "UPDATE" scenario

  handleEditAddress(
    id,
    city,
    address,
    deliveryType,
    frequency,
    recipientName,
    recipientPhone
  ) {
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

  // The Addresses DIALOG
  handleClose() {
    this.setState({
      showDialog: false,
      addressForEdit: null,
      city: null,
      address: null,
      deliveryType: null,
      frequency: null,
      recipientName: null,
      recipientPhone: null,
    });
  }

  //**********DRIVERS**********
  // For the "GET" scenario
  getDrivers() {
    this.setState({
      drivers: adminService.getDrivers(),
    });
  }

  // The "ADD" scenario
  handleShowAddDriverDialog(e) {
    this.setState({ showDriverDialog: true });
  }
  handleAddDriver(firstName, lastName, phone, distributionArea) {
    adminService.addDriver(firstName, lastName, phone, distributionArea);
    this.getDrivers();
  }

  // The "DELETE" scenario
  handleDeleteDriver(id, event) {
    adminService.deleteDriver(id);
    this.getDrivers();
  }

  // The "UPDATE" scenario
  handleEditDriver(id, firstName, lastName, phone, distributionArea) {
    adminService.editDriver(id, firstName, lastName, phone, distributionArea);
    this.getDrivers();
  }

  handleShowEditDriverDialog(driver) {
    this.setState({ showDriverDialog: true, driverForEdit: driver });
  }

  // DIALOG
  handleCloseDriverDialog() {
    this.setState({
      showDriverDialog: false,
      driverForEdit: null,
      firstName: null,
      lastName: null,
      phone: null,
      distributionArea: null,
    });
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
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"> City </th>
              <th scope="col"> Address </th>
              <th scope="col"> Delivery Type </th>
              <th scope="col">Frequency </th>
              <th scope="col"> Recipient Name </th>
              <th scope="col"> Recipient Phone </th>
              <th scope="col"> Assigned To: </th>
              <th scope="col"> edit </th>
              <th scope="col"> delete </th>
            </tr>
          </thead>
          <tbody>
            {this.state.addresses?.map((item) => (
              <tr key={item?.id}>
                {/* <th scope="row">{item?.id}</th> */}
                <td>{item?.id}</td>
                <td>{item?.city}</td>
                <td>{item?.address}</td>
                <td>{item?.deliveryType}</td>
                <td>{item?.frequency}</td>
                <td>{item?.recipientName}</td>
                <td>{item?.recipientPhone}</td>
                <td>{`-----`}</td>
                <td>
                  <button
                    className="edit-buttons"
                    onClick={(e) => this.handleShowEditDialog(item, e)}
                  >
                    Edit
                  </button>
                  <button onClick={(e) => this.handleDelete(item.id, e)}>
                    Delete
                  </button>
                </td>
                <td></td>
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
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              Delivery type:
              <input
                type="text"
                name="deliveryType"
                value={this.state.deliveryType}
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              Frequency:
              <input
                type="text"
                name="frequency"
                value={this.state.frequency}
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              Recipient name:
              <input
                type="text"
                name="recipientName"
                value={this.state.recipientName}
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              Recipient Phone number:
              <input
                type="text"
                name="recipientPhone"
                value={this.state.recipientPhone}
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
                  this.state.city,
                  this.state.address,
                  this.state.deliveryType,
                  this.state.frequency,
                  this.state.recipientName,
                  this.state.recipientPhone
                )
              }
            >
              Save Changes
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                this.handleAddAddress(
                  this.state.city,
                  this.state.address,
                  this.state.deliveryType,
                  this.state.frequency,
                  this.state.recipientName,
                  this.state.recipientPhone
                )
              }
            >
              Add The Address
            </Button>
          </Modal.Footer>
        </Modal>
        <button
          className="add-button "
          onClick={(e) => this.handleShowAddDriverDialog(e)}
        >
          Add
        </button>
        <table className="drivers-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"> First Name </th>
              <th scope="col"> Last Name</th>
              <th scope="col"> Phone </th>
              <th scope="col">Distribution Area </th>
            </tr>
          </thead>
          <tbody>
            {this.state.drivers?.map((item) => (
              <tr key={item?.id}>
                {/* <th scope="row">{item?.id}</th> */}
                <td>{item?.id}</td>
                <td>{item?.firstName}</td>
                <td>{item?.lastName}</td>
                <td>{item?.phone}</td>
                <td>{item?.distributionArea}</td>
                <td>
                  <button
                    className="edit-buttons"
                    onClick={(e) => this.handleShowEditDriverDialog(item, e)}
                  >
                    Edit
                  </button>
                  <button onClick={(e) => this.handleDeleteDriver(item.id, e)}>
                    Delete
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          show={this.state.showDriverDialog}
          onHide={this.handleCloseDriverDialog.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <p>{this.state.addressForEdit?.name}</p> */}
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              Address:
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              Delivery type:
              <input
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              Frequency:
              <input
                type="text"
                name="distributionArea"
                value={this.state.distributionArea}
                onChange={this.handleChange}
              ></input>
            </label>
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
              onClick={() =>
                this.handleEditDriver(
                  this.state.driverForEdit?.id,
                  this.state.firstName,
                  this.state.lastName,
                  this.state.phone,
                  this.state.distributionArea
                )
              }
            >
              Save Changes
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                this.handleAddDriver(
                  this.state.firstName,
                  this.state.lastName,
                  this.state.phone,
                  this.state.distributionArea
                )
              }
            >
              Add Driver
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
