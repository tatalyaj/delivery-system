import React from "react";

export default class AddressTable extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      addresses: this.props.addresses,

      //   city: null,
      //   address: null,
      //   deliveryType: null,
      //   frequency: null,
      //   recipientName: null,
      //   recipientPhone: null,
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
                <button
                  className="edit-buttons"
                  onClick={() => this.handleEditClick(item)}
                >
                  Edit
                </button>
                <button onClick={(e) => this.handleDeleteClick(item.id, e)}>
                  Delete
                </button>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}