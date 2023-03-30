import React from "react";
import AdminAddresses from "../classes/adminAddresses";
import AddressDialog from "./addressDialog";
import AddressTable from "./addressTable";

const adminService = new AdminAddresses();

export default class AdminAddressesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // ADDRESSES
      addresses: adminService.getAddresses(),
      addressForEdit: null,
      showAddressDialog: false,
      city: null,
      address: null,
      deliveryType: null,
      frequency: null,
      recipientName: null,
      recipientPhone: null,
    };
  }

  // For the "GET" scenario
  getAddresses() {
    this.setState({
      addresses: adminService.getAddresses(),
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

  // The DIALOG - IN ADD SCENARIO
  handleShowAddDialog(e) {
    this.setState({ showAddressDialog: true });
  }

  // For the "DELETE" scenario
  handleDelete(id, event) {
    adminService.deleteAddress(id);
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
  // The  DIALOG - SHOW IN EDIT SCENARIO
  handleShowEditDialog(address) {
    this.setState({
      showAddressDialog: true,
      addressForEdit: address,
    });
  }

  // The  DIALOG - HANDLE CLOSE
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

  render() {
    return (
      <div>
        <button
          className="add-button "
          onClick={(e) => this.handleShowAddDialog(e)}
        >
          Add
        </button>
        <AddressTable
          key={this.state.addresses.id}
          addresses={this.state.addresses}
          onEditClick={this.handleShowEditDialog.bind(this)}
          onDelete={this.handleDelete.bind(this)}
        />
        <AddressDialog
          key={this.state.addressForEdit?.id}
          showDialog={this.state.showAddressDialog}
          addressForEdit={this.state.addressForEdit}
          onAddressChanged={this.handleAddressChanged}
          onDialogClose={this.handleClose.bind(this)}
        />
      </div>
    );
  }
}
