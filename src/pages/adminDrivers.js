import React from "react";
import AdminDrivers from "../classes/adminDrivers";
import DriverDialog from "./driverDialog";

const adminService = new AdminDrivers();

export default class AdminDriversPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: adminService.getDrivers(),
      driverForEdit: null,
      showDriverDialog: false,
      firstName: null,
      lastName: null,
      phone: null,
      distributionArea: null,
    };
    // this.getAddresses();
  }

  // // For the "GET" scenario
  getDrivers() {
    this.setState({
      drivers: adminService.getDrivers(),
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
    adminService.addDriver(firstName, lastName, phone, distributionArea);
    this.getDrivers();
  }
  // The DIALOG - IN ADD SCENARIO
  handleShowAddDriverDialog(e) {
    this.setState({ showDriverDialog: true });
  }

  // The "DELETE" scenario
  handleDeleteDriver(id, event) {
    adminService.deleteDriver(id);
    this.getDrivers();
  }

  // The "UPDATE" scenario
  handleEditDriver({ id, firstName, lastName, phone, distributionArea }) {
    adminService.editDriver(id, firstName, lastName, phone, distributionArea);
    this.getDrivers();
  }
  // The  DIALOG - SHOW IN EDIT SCENARIO
  handleShowEditDriverDialog(driver) {
    this.setState({ showDriverDialog: true, driverForEdit: driver });
  }

  // The  DIALOG - HANDLE CLOSE
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
