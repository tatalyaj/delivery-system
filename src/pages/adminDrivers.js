import React from "react";
import Button from "react-bootstrap/Button";
//import Alert from "react-bootstrap/Alert";
import AdminDrivers from "../classes/adminDrivers";
import DriverDialog from "./driverDialog";
import DriverTable from "./driverTable";

const adminService = new AdminDrivers();

export default class AdminDriversPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null, // (from backend)
      drivers: [],
      driverForEdit: null,
      showDriverDialog: false,
      firstName: null,
      lastName: null,
      phone: null,
      distributionArea: null,
      // showAlert: false,
      //validated: true,
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
  };

  // The "ADD" scenario
  async handleAddDriver({ firstName, lastName, phone, distributionArea }) {
    try {
      await adminService.addDriver(
        firstName,
        lastName,
        phone,
        distributionArea
      );
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: "Invalid Add Request",
        // showAlert: true,
        //validated: false,
      });
      return;
    }
    this.setState({
      ...this.state,
      // showAlert: false,
      //validated: true,
    });
    await this.getDrivers();
  }
  // The DIALOG - IN ADD SCENARIO
  async handleShowAddDriverDialog(e) {
    await this.setState({ showDriverDialog: true });
  }

  // The "UPDATE" scenario
  async handleEditDriver({ id, firstName, lastName, phone, distributionArea }) {
    try {
      await adminService.editDriver(
        id,
        firstName,
        lastName,
        phone,
        distributionArea
      );
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: "Invalid Update Request",
        // showAlert: true,
        //validated: false,
      });
      return;
    }
    this.setState({
      ...this.state,
      // showAlert: false,
      //validated: true,
    });
    await this.getDrivers();
  }
  // The  DIALOG - SHOW IN EDIT SCENARIO
  async handleShowEditDriverDialog(driver) {
    await this.setState({ showDriverDialog: true, driverForEdit: driver });
  }

  // The  DIALOG - HANDLE CLOSE
  async handleCloseDriverDialog() {
    await this.setState({
      showDriverDialog: false,
      driverForEdit: null,
      firstName: null,
      lastName: null,
      phone: null,
      distributionArea: null,
      validate: true,
    });
  }

  // The "DELETE" scenario
  //id, event
  async handleDeleteDriver(id) {
    try {
      await adminService.deleteDriver(id);
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: "User Not Found!",
        // showAlert: true,
        //validated: false,
      });
      return;
    }
    this.setState({
      ...this.state,
      // showAlert: false,
      //validated: true,
    });
    await this.getDrivers();
  }

  render() {
    return (
      <div>
        {/* {this.state?.errorMessage ? (
          <Alert variant={"danger"} show={this.state.showAlert}>
            {this.state?.errorMessage}
          </Alert>
        ) : (
          ""
        )} */}
        <Button
          className="add-button "
          variant="outline-success"
          onClick={(e) => this.handleShowAddDriverDialog(e)}
        >
          Add
        </Button>
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
