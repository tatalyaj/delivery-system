import React from "react";
import AdminAddresses from "../classes/adminAddresses";
import AddressDialog from "./addressDialog";
import AddressTable from "./addressesTable";

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
      </div>
    );
  }
}
