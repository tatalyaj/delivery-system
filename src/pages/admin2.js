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
      updatedAddress: null,
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
      updatedAddress: null,
    });
  }
  // For the "UPDATE" scenario
  handleChange(addressName) {
    //console.log(addressName);
    this.setState({ updatedAddress: addressName });
  }
  handleEditAddress(id, addressName) {
    //his.setState({ updatedAddress: addressName });
    //console.log(addressName);
    adminService.editAddress(id, addressName);
    this.getAddresses();
  }

  handleShowEditDialog(address) {
    this.setState({ showDialog: true, addressForEdit: address });
  }

  render() {
    return (
      <div>
        <table className="table">
          <tbody>
            <thead>
              <td>Name</td>
            </thead>
            {this.state.addresses?.map((item) => (
              <tr key={item?.id}>
                <td>{item?.name}</td>
                <td>
                  <button onClick={(e) => this.handleDelete(item.id, e)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button onClick={(e) => this.handleShowEditDialog(item, e)}>
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
              Updated address name:
              <input
                type="text"
                onChange={(e) => this.handleChange(e.target.value)}
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
                  this.state.updatedAddress
                )
              }
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
