import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default class AddressTable extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      addresses: this.props.addresses,
    };
  }

  handleEditClick = (item) => {
    this.props.onEditClick(item);
  };

  handleDeleteClick = (item_id, e) => {
    this.props.onDelete(item_id, e);
  };
  render() {
    return (
      <Table className="addresses-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> City </th>
            <th scope="col"> Address </th>
            <th scope="col"> Delivery Type </th>
            <th scope="col"> Frequency </th>
            <th scope="col"> Recipient Name </th>
            <th scope="col"> Recipient Phone </th>
            <th scope="col"> Assigned To: </th>
            <th scope="col"> Edit </th>
            <th scope="col"> Delete </th>
          </tr>
        </thead>
        <tbody>
          {this.props.addresses?.map((item) => (
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
                <Button
                  className="edit-buttons"
                  variant="outline-dark"
                  onClick={() => this.handleEditClick(item)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={(e) => this.handleDeleteClick(item.id, e)}
                >
                  Delete
                </Button>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
