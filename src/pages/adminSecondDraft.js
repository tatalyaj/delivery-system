import React from "react";
import AdminAddresses from "../classes/adminAddresses";
import AdminDrivers from "../classes/adminDrivers";
import AddressDialog from "./addressDialog";
import DriverDialog from "./driverDialog";

const adminServiceAddress = new AdminAddresses();
const adminServiceDriver = new AdminDrivers();

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // ADDRESSES
      addresses: adminServiceAddress.getAddresses(),
      addressForEdit: null,
      showAddressDialog: false,
      city: null,
      address: null,
      deliveryType: null,
      frequency: null,
      recipientName: null,
      recipientPhone: null,
      // DRIVERS
      drivers: adminServiceDriver.getDrivers(),
      driverForEdit: null,
      showDriverDialog: false,
      firstName: null,
      lastName: null,
      phone: null,
      distributionArea: null,
    };
    // this.getAddresses();
  }

  //**********ADDRESSES**********
  // For the "GET" scenario
  getAddresses() {
    this.setState({
      addresses: adminServiceAddress.getAddresses(),
    });
  }

  // For the "ADD" and "UPDATE" scenario - it chooses the func based on whether there's an ID meaning - it's the "UPDATE" scenario or else it's the "ADD" scenario
  handleAddressChanged = (address) => {
    typeof address.id === "number"
      ? this.handleEditAddress(address)
      : this.handleAddAddress(address);
    //console.log(address);
  };

  // The "ADD" scenario
  handleAddAddress({
    city,
    address,
    deliveryType,
    frequency,
    recipientName,
    recipientPhone,
  }) {
    adminServiceAddress.addAddress(
      city,
      address,
      deliveryType,
      frequency,
      recipientName,
      recipientPhone
    );
    this.getAddresses();
  }

  // The Addresses DIALOG - IN ADD SCENARIO
  handleShowAddDialog(e) {
    this.setState({ showAddressDialog: true });
  }

  // For the "DELETE" scenario
  handleDelete(id, event) {
    adminServiceAddress.deleteAddress(id);
    this.getAddresses();
  }

  // For the "UPDATE" scenario
  handleEditAddress({
    id,
    city,
    address,
    deliveryType,
    frequency,
    recipientName,
    recipientPhone,
  }) {
    adminServiceAddress.editAddress(
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
  // The Addresses DIALOG - SHOW IN EDIT SCENARIO
  handleShowEditDialog(address) {
    this.setState({
      showAddressDialog: true,
      addressForEdit: address,
    });
  }

  // The Addresses DIALOG - HANDLE CLOSE
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
    });
  }

  // //**********DRIVERS**********
  // // For the "GET" scenario
  getDrivers() {
    this.setState({
      drivers: adminServiceDriver.getDrivers(),
    });
  }

  // For the "ADD" and "UPDATE" scenario - it chooses the func based on whether there's an ID meaning - it's the "UPDATE" scenario or else it's the "ADD" scenario
  handleDriverChanged = (driver) => {
    typeof driver.id === "number"
      ? this.handleEditDriver(driver)
      : this.handleAddDriver(driver);
    //
    console.log(driver);
  };

  // The "ADD" scenario
  handleAddDriver({ firstName, lastName, phone, distributionArea }) {
    adminServiceDriver.addDriver(firstName, lastName, phone, distributionArea);
    this.getDrivers();
  }
  // The Driver DIALOG - IN ADD SCENARIO
  handleShowAddDriverDialog(e) {
    this.setState({ showDriverDialog: true });
  }

  // The "DELETE" scenario
  handleDeleteDriver(id, event) {
    adminServiceDriver.deleteDriver(id);
    this.getDrivers();
  }

  // The "UPDATE" scenario
  handleEditDriver({ id, firstName, lastName, phone, distributionArea }) {
    adminServiceDriver.editDriver(
      id,
      firstName,
      lastName,
      phone,
      distributionArea
    );
    this.getDrivers();
  }
  // The Driver DIALOG - SHOW IN EDIT SCENARIO
  handleShowEditDriverDialog(driver) {
    this.setState({ showDriverDialog: true, driverForEdit: driver });
  }

  // The Driver DIALOG - HANDLE CLOSE
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
        <AddressDialog
          key={this.state.addressForEdit?.id}
          showDialog={this.state.showAddressDialog}
          addressForEdit={this.state.addressForEdit}
          onAddressChanged={this.handleAddressChanged}
          onDialogClose={this.handleClose.bind(this)}
        />
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
        <DriverDialog
          key={this.state.driverForEdit?.id}
          showDialog={this.state.showDriverDialog}
          driverForEdit={this.state.driverForEdit}
          onDriverChanged={this.handleDriverChanged}
          onDialogClose={this.handleCloseDriverDialog.bind(this)}
        />
      </div>
    );
  }
}
