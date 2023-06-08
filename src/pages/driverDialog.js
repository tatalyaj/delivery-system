import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import * as formik from "formik";
import regexValidation from "./../utils/Regex";
//import InputGroup from "react-bootstrap/InputGroup";

// inputs should be validated - if not valid - show error

export default class DriverDialog extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

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
      errors: {
        // eFirstName: null,
        // eLastName: null,
        // ePhone: null,
        // eDistributionArea: null,
      },
      // valid: true,
    };
  }

  // // Validation function can be used in post and put
  // isDriverValidFunc = (driver) => {
  //   let isDriverValid = null;
  //   const validPhone = regexValidation.validPhoneRegex;
  //   const validName = regexValidation.validNameRegex;
  //   if (!validName.test(driver.firstName) || !driver.firstName) {
  //     this.setState({
  //       //...this.state,
  //       errors: {
  //         ...this.state.errors,
  //         eFirstName: "Please choose a valid  first name.",
  //       },
  //     });
  //     console.log(
  //       `isDriverValid func: eFirstName is : ${this.state.errors?.eFirstName}`
  //     );
  //     isDriverValid = false;
  //   } else if (!validName.test(driver.lastName) || !driver.lastName) {
  //     this.setState({
  //       //...this.state,
  //       errors: {
  //         ...this.state.errors,
  //         eLastName: "Please choose a valid  last name.",
  //       },
  //     });
  //     console.log(
  //       `isDriverValid func: eLastName is : ${this.state.errors?.eLastName}`
  //     );
  //     isDriverValid = false;
  //   } else if (!validPhone.test(driver.phone) || !driver.phone) {
  //     this.setState({
  //       //...this.state,
  //       errors: {
  //         ...this.state.errors,
  //         ePhone: "Please choose a valid  phone number.",
  //       },
  //     });
  //     console.log(
  //       `isDriverValid func: ePhone is : ${this.state.errors?.ePhone}`
  //     );
  //     isDriverValid = false;
  //   } else if (!driver.distributionArea) {
  //     this.setState({
  //       //...this.state,
  //       errors: {
  //         ...this.state.errors,
  //         eDistributionArea: "Please choose a valid  distribution area.",
  //       },
  //     });

  //     console.log(
  //       `isDriverValid func: eDistributionArea is : ${this.state.errors?.eDistributionArea}`
  //     );
  //     isDriverValid = false;
  //   } else {
  //     isDriverValid = true;
  //   }

  //   return isDriverValid;
  // };

  // Validation function can be used in post and put
  isDriverValidFunc = (driver) => {
    let isDriverValid = true;
    const validPhone = regexValidation.validPhoneRegex;
    const validName = regexValidation.validNameRegex;
    // For the field names - An array containing all the Object's properties
    let fieldNames = Object.getOwnPropertyNames(driver);
    //console.log(fieldNames[1]);
    const arraySize = fieldNames.length;
    for (let i = 1; i < arraySize; i++) {
      switch (fieldNames[i]) {
        case "firstName":
          if (!validName.test(driver.firstName) || !driver.firstName) {
            this.setState({
              //...this.state,
              errors: {
                ...this.state.errors,
                eFirstName: "Please choose a valid  first name.",
              },
            });
            console.log(i);
            console.log(
              `isDriverValid func: eFirstName is : ${this.state.errors?.eFirstName}`
            );
            isDriverValid = false;
          }
          break;
        case "lastName":
          if (!validName.test(driver.lastName) || !driver.lastName) {
            this.setState({
              //...this.state,
              errors: {
                ...this.state.errors,
                eLastName: "Please choose a valid  last name.",
              },
            });
            console.log(i);
            console.log(
              `isDriverValid func: eLastName is : ${this.state.errors?.eLastName}`
            );

            isDriverValid = false;
          }
          break;
        case "phone":
          if (!validPhone.test(driver.phone) || !driver.phone) {
            this.setState({
              //...this.state,
              errors: {
                ...this.state.errors,
                ePhone: "Please choose a valid  phone number.",
              },
            });
            console.log(i);
            console.log(
              `isDriverValid func: ePhone is : ${this.state.errors?.ePhone}`
            );

            isDriverValid = false;
          }
          break;
        case "distributionArea":
          if (!driver.distributionArea) {
            this.setState({
              //...this.state,
              errors: {
                ...this.state.errors,
                eDistributionArea: "Please choose a valid  distribution area.",
              },
            });
            console.log(i);
            console.log(
              `isDriverValid func: eDistributionArea is : ${this.state.errors?.eDistributionArea}`
            );

            isDriverValid = false;
          }
          break;
        default:
          break;
      }
    }
    return isDriverValid;
  };

  // HANDLE CLOSE DIALOG
  handleClose() {
    this.setState({
      showDriverDialog: false,
      driverForEdit: null,
      firstName: null,
      lastName: null,
      phone: null,
      distributionArea: null,
      errors: {
        eFirstName: null,
        eLastName: null,
        ePhone: null,
        eDistributionArea: null,
      },
      // valid: true,
    });
    this.props.onDialogClose();
  }
  // HANDLE THE SAVE CHANGES BUTTON
  handleSaveDriver = (driver) => {
    let isValid = this.isDriverValidFunc(driver);
    if (isValid) {
      this.setState({
        ...this.state,
        errors: {
          //...this.state.errors,
          // eFirstName: null,
          // eLastName: null,
          // ePhone: null,
          // eDistributionArea: null,
        },
        //valid: true
      });
      this.props.onDriverChanged(driver);
      console.log("Driver is valid");
      this.handleClose();
    } else {
      // this.setState({
      //   ...this.state,
      //   errors: {
      //     ...this.state.errors,
      //   },
      //   //valid: false,
      // });
      console.log("not valid");
    }
  };
  // HANDLE CHAMGE
  handleChange = (e) => {
    const { name, value } = e.target;
    //let currentError = "e" + name.charAt(0).toUpperCase() + name.slice(1);
    this.setState({
      driverForEdit: {
        ...this.state.driverForEdit,
        [name]: value,
      },
      errors: {
        ...this.state.errors,
        ["e" + name.charAt(0).toUpperCase() + name.slice(1)]: null,
      },
    });
    //console.log(currentError);
    // console.log(`In onChange currentError is ${this.errors} `);
  };

  render() {
    return (
      <Form noValidate>
        <Modal
          show={this.props.showDialog}
          onHide={this.handleClose.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.driverForEdit ? "Edit Driver" : "Add Driver"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3" controlId="form.ControlInputFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="firstName"
                defaultValue={this.state.driverForEdit?.firstName}
                onChange={this.handleChange}
                placeholder="First name..."
                isInvalid={!!this.state.errors.eFirstName}
              />
              {/* {this.state.errors.eFirstName ? (
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.eFirstName}
                </Form.Control.Feedback>
              ) : null} */}
              <Form.Control.Feedback type="invalid">
                {this.state.errors.eFirstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.ControlInputLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="lastName"
                defaultValue={this.state.driverForEdit?.lastName}
                onChange={this.handleChange}
                placeholder="Last name..."
                isInvalid={!!this.state.errors.eLastName}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors.eLastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="form.ControlInputPhoneNumber"
            >
              <Form.Label> Phone Number</Form.Label>
              <Form.Control
                required
                type="text"
                name="phone"
                defaultValue={this.state.driverForEdit?.phone}
                onChange={this.handleChange}
                placeholder="Phone number..."
                isInvalid={!!this.state.errors.ePhone}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors.ePhone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="form.ControlInputDistributionArea"
            >
              <Form.Label> Distribution Area</Form.Label>
              <Form.Control
                required
                type="text"
                name="distributionArea"
                defaultValue={this.state.driverForEdit?.distributionArea}
                onChange={this.handleChange}
                placeholder="Distribution area..."
                isInvalid={!!this.state.errors.eDistributionArea}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors.eDistributionArea}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
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
      </Form>
    );
  }
}

// required
// validated={this.state.valid}
// isInvalid={!this.state.valid}
