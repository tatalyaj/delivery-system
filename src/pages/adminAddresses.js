import React from "react";
import AdminAddresses from "../classes/adminAddresses";
import AddressDialog from "./addressDialog";
import AddressTable from "./addressTable";

const adminService = new AdminAddresses();

export default class AdminAddressesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // errorMessage (from backend)
      // ADDRESSES
      addresses: [],
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
  async getAddresses() {
    const addresses = await adminService.getAddresses();
    this.setState({
      addresses: addresses,
    });
  }

  componentDidMount() {
    this.getAddresses().then();
  }

  // For the "ADD" and "UPDATE" scenario - it chooses the func based on whether there's an ID meaning - it's the "UPDATE" scenario or else it's the "ADD" scenario
  handleAddressChanged = (address) => {
    typeof address.id === "number"
      ? this.handleEditAddress(address)
      : this.handleAddAddress(address);
    //console.log(address);
  };

  // The "ADD" scenario
  async handleAddAddress({
    city,
    address,
    deliveryType,
    frequency,
    recipientName,
    recipientPhone,
  }) {
    try {
      // catch all errors, handle them in catch
      await adminService.addAddress(
        city,
        address,
        deliveryType,
        frequency,
        recipientName,
        recipientPhone
      );
    } catch (e) {
      // display error message
      // this.setState({...this.state, errorMessage: "Invalid request"})
      // first do validations in BE - try to add invalid data from UI and display error
      // only after that - add validation in UI
      return;
    }

    await this.getAddresses();
  }

  // The DIALOG - IN ADD SCENARIO
  async handleShowAddDialog(e) {
    await this.setState({ showAddressDialog: true });
  }

  // For the "DELETE" scenario
  async handleDelete(id, event) {
    await adminService.deleteAddress(id);
    await this.getAddresses();
  }

  // For the "UPDATE" scenario
  async handleEditAddress({
    id,
    city,
    address,
    deliveryType,
    frequency,
    recipientName,
    recipientPhone,
  }) {
    await adminService.editAddress(
      id,
      city,
      address,
      deliveryType,
      frequency,
      recipientName,
      recipientPhone
    );
    await this.getAddresses();
  }
  // The  DIALOG - SHOW IN EDIT SCENARIO
  async handleShowEditDialog(address) {
    await this.setState({
      showAddressDialog: true,
      addressForEdit: address,
    });
  }

  // The  DIALOG - HANDLE CLOSE
  async handleClose() {
    await this.setState({
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
        {this.state?.errorMessage ? <div>{this.state?.errorMessage}</div> : ""}

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
