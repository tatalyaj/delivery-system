import React, { useState } from "react";
import "./delivery.css";

const addressesCheckList = [
  "Haifa",
  "Jerusalem",
  "Tel-Aviv",
  "Eilat",
  "Ra'anana",
  "Zichron",
  "Tiberia",
];

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

export default Driver;
