//import { DropDownList } from "@progress/kendo-react-dropdowns";
import React, { useState, useRef, useEffect } from "react";
import { ComboBox } from "@progress/kendo-react-dropdowns";
//import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
//import Combobox from "react-widgets/Combobox";
//import { DropDownList } from "@progress/kendo-react-dropdowns";
import DropdownList from "react-widgets/DropdownList";

// CoboBox addresses
let addrItems = [
  { id: 0, name: "Jerusalem" },
  { id: 1, name: "Haifa" },
  { id: 2, name: "Tel-Aviv" },
  { id: 3, name: "Eilat" },
  { id: 4, name: "Ra'anana" },
  { id: 5, name: "Zichron" },
  { id: 6, name: "Tiberia" },
];

// CoboBox drivers
let driversItems = [
  { id: 0, name: "Jason" },
  { id: 1, name: "Johanna" },
  { id: 2, name: "Ray" },
  { id: 3, name: "John" },
  { id: 4, name: "Lana" },
  { id: 5, name: "Emma" },
  { id: 6, name: "Harry" },
];

const Manager = () => {
  //const [value, setValue] = useState(addrItems[0].name);
  //const [person, setPerson] = useState(driversItems[0].name);

  const [selectedAddr, setSelectedAddr] = useState(addrItems.name);
  const [selectedAssignee, setSelectedAssignee] = useState(driversItems.name);

  const onChange = () => {
    if (this.div === "admin-combox") setSelectedAddr(this.event.value);
    else if (this.div === "driver-combox")
      setSelectedAssignee(this.event.value);
  };

  return (
    <div className="comboxes">
      <div className="admin-combox">
        {/* <p>
          Current Value: <strong>{value}</strong>
        </p> */}
        <ComboBox
          //defaultValue={addrItems[0].name}
          data={addrItems}
          value={selectedAddr}
          //dataKey="id"
          textField="name"
          onChange={onChange}
          //onSelect={onSelect}
          placeholder="Select an address"
        />
      </div>
      <div className="driver-combox">
        {/* <p>
          Current Value: <strong>{person}</strong>
        </p> */}
        <ComboBox
          data={driversItems}
          value={selectedAssignee}
          //dataKey="name"
          textField="name"
          onChange={onChange}
          //onSelect={selectedAssignee}
          //onSelect={onSelect}
          placeholder="Select a driver"
        />
      </div>
    </div>
  );
};

export default Manager;
