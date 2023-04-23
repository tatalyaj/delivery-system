import React from "react";

export default class DriverTable extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      drivers: this.props.drivers,
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
          {this.props.drivers?.map((item) => (
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
                  onClick={(e) => this.handleEditClick(item, e)}
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