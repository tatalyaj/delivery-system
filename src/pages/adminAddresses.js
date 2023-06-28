import React from "react";
import Button from "react-bootstrap/Button";
import AdminAddresses from "../classes/adminAddresses";
import AddressDialog from "./addressDialog";
import AddressTable from "./addressTable";

const adminService = new AdminAddresses();

export default class AdminAddressesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null, // (from backend)
      addresses: [],
      addressForEdit: null,
      showAddressDialog: false,
      city: null,
      address: null,
      deliveryType: null,
      frequency: null,
      recipientName: null,
      recipientPhone: null,
      assignedTo: null,
      showAlert: false,
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
  };

  // The "ADD" scenario
  async handleAddAddress({
    city,
    address,
    deliveryType,
    frequency,
    recipientName,
    recipientPhone,
    assignedTo,
  }) {
    try {
      // catch all errors, handle them in catch
      await adminService.addAddress(
        city,
        address,
        deliveryType,
        frequency,
        recipientName,
        recipientPhone,
        assignedTo
      );
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: "Invalid Add Request",
        showAlert: true,
      });
      return;
    }
    await this.getAddresses();
  }

  // The DIALOG - IN ADD SCENARIO
  async handleShowAddDialog(e) {
    await this.setState({ showAddressDialog: true });
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
    assignedTo,
  }) {
    try {
      await adminService.editAddress(
        id,
        city,
        address,
        deliveryType,
        frequency,
        recipientName,
        recipientPhone,
        assignedTo
      );
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: "Invalid Update Request",
      });
      return;
    }

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

  // For the "DELETE" scenario
  async handleDelete(id, event) {
    try {
      await adminService.deleteAddress(id);
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: "User Not Found!",
      });
      return;
    }

    await this.getAddresses();
  }

  render() {
    return (
      <div>
        <Button
          className="add-button "
          variant="outline-success"
          onClick={(e) => this.handleShowAddDialog(e)}
        >
          Add
        </Button>
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
