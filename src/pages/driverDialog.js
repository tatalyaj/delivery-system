import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default class DriverDialog extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    //console.log(props);

    this.state = {
      driverForEdit: this.props?.driverForEdit
        ? { ...this.props?.driverForEdit }
        : {
            driverForEdit: null,
            firstName: null,
            lastName: null,
            phone: null,
            distributionArea: null,
          },
      showDialog: false,
    };
  }
  // HANDLE CLOSE DIALOG
  handleClose() {
    this.props.onDialogClose();
  }
  // HANDLE THE SAVE CHANGES BUTTON
  handleSaveDriver = (driver) => {
    this.props.onDriverChanged(driver);
    this.handleClose();
  };
  // HANDLE CHAMGE
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      driverForEdit: {
        ...this.state.driverForEdit,
        [name]: value,
      },
    });
  };
  render() {
    return (
      <Modal show={this.props.showDialog} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.driverForEdit ? "Edit Driver" : "Add Driver"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <p>{this.state.addressForEdit?.name}</p> */}
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={this.state.driverForEdit?.firstName}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            Address:
            <input
              type="text"
              name="lastName"
              value={this.state.driverForEdit?.lastName}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phone"
              value={this.state.driverForEdit?.phone}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            Distribution Area:
            <input
              type="text"
              name="distributionArea"
              value={this.state.driverForEdit?.distributionArea}
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
            onClick={() => this.handleSaveDriver(this.state.driverForEdit)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
