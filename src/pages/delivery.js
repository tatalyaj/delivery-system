import React from "react";
import "../styles/delivery.css";
import Deliveries from "../classes/delivery";
import Alert from "react-bootstrap/Alert";
import DeliveryTable from "./deliveryTable";
import DeliveryDialog from "./deliveryDialog";

const deliveryService = new Deliveries();

export default class DeliveriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null, // (from backend)
      // DELIVERIES
      showDeliveryDialog: false,
      deliveryForEdit: null,
      deliveries: [],
      city: null,
      address: null,
      deliveryType: null,
      frequency: null,
      recipientName: null,
      recipientPhone: null,
      done: false,
    };
  }

  // For the "GET" scenario
  async getDeliveries() {
    const deliveries = await deliveryService.getDeliveries();
    this.setState({
      deliveries: deliveries,
    });
  }

  componentDidMount() {
    this.getDeliveries().then();
  }

  // For the "UPDATE" scenario
  async handleEditDelivery({
    id,
    city,
    address,
    deliveryType,
    frequency,
    recipientName,
    recipientPhone,
    done,
  }) {
    try {
      await deliveryService.editDelivery(
        id,
        city,
        address,
        deliveryType,
        frequency,
        recipientName,
        recipientPhone,
        done
      );
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: "Invalid Update Request",
        showAlert: true,
      });
      return;
    }
    this.setState({
      ...this.state,
      showAlert: false,
    });
    await this.getDeliveries();
  }

  // The  DIALOG - SHOW IN EDIT SCENARIO
  async handleShowEditDialog(delivery) {
    await this.setState({
      showDeliveryDialog: true,
      deliveryForEdit: delivery,
    });
  }

  // The  DIALOG - HANDLE CLOSE
  async handleClose() {
    await this.setState({
      showDeliveryDialog: false,
      deliveryForEdit: null,
      city: null,
      address: null,
      deliveryType: null,
      frequency: null,
      recipientName: null,
      recipientPhone: null,
      done: false,
    });
  }

  // For the "DELETE" scenario
  async handleDelete(id, event) {
    try {
      await deliveryService.deleteDelivery(id);
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: "User Not Found!",
        showAlert: true,
      });
      return;
    }
    this.setState({
      ...this.state,
      showAlert: false,
    });
    await this.getDeliveries();
  }
  // For the CHECK scenario
  async handleCheck(id, event) {
    try {
      if (event.target.checked) await deliveryService.checkDelivery(id);
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: "User Not Found!",
        showAlert: true,
      });
      return;
    }
    this.setState({
      ...this.state,
      showAlert: false,
    });
    await this.getDeliveries();
  }
  render() {
    return (
      <div>
        {this.state?.errorMessage ? (
          <Alert variant={"danger"} show={this.state.showAlert}>
            {this.state?.errorMessage}
          </Alert>
        ) : (
          ""
        )}

        <DeliveryTable
          key={this.state.deliveries.id}
          deliveries={this.state.deliveries}
          onEditClick={this.handleShowEditDialog.bind(this)}
          onDelete={this.handleDelete.bind(this)}
          onCheck={this.handleCheck.bind(this)}
        />
        <DeliveryDialog
          key={this.state.deliveryForEdit?.id}
          showDialog={this.state.showDeliveryDialog}
          deliveryForEdit={this.state.deliveryForEdit}
          onDeliveryChanged={this.handleDeliveryChanged}
          onDialogClose={this.handleClose.bind(this)}
        />
      </div>
    );
  }
}

/*
//const addressesCheckList = deliveryAddresses;
const Driver = () => {
  // State with list of all checked items
  const [checked, setChecked] = useState([]);

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  //Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <div className="driver">
      <div
        className="addressesCheckList>
            <div className="
        title
      >
        {" "}
        your checked addresses list is:
      </div>
      <div className="list-cotainer">
        {addressesCheckList.map((item, index) => (
          <div key={index}>
            <input value={item} type="checkbox" onChange={handleCheck} />
            <span className={isChecked(item)}>{item}</span>
          </div>
        ))}
      </div>

      <div>{`Items checked are: ${checkedItems}`}</div>
    </div>
  );
};
*/
