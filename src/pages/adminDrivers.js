import React from "react";
import AdminDrivers from "../classes/adminDrivers";
import DriverDialog from "./driverDialog";
import DriverTable from "./driverTable";

const adminService = new AdminDrivers();

export default class AdminDriversPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: [],
      driverForEdit: null,
      showDriverDialog: false,
      firstName: null,
      lastName: null,
      phone: null,
      distributionArea: null,
    };
  }

  // // For the "GET" scenario
  async getDrivers() {
    const drivers = await adminService.getDrivers();

    this.setState({
      drivers: drivers,
    });
  }

  // component is ready for action
  componentDidMount() {
    this.getDrivers().then();
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
        <DriverTable
          key={this.state.drivers.id}
          drivers={this.state.drivers}
          onEditClick={this.handleShowEditDriverDialog.bind(this)}
          onDelete={this.handleDeleteDriver.bind(this)}
        />
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
