//import { DropDownList } from "@progress/kendo-react-dropdowns";
import React, { useState } from "react";
//import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
//import Combobox from "react-widgets/Combobox";
//import { DropDownList } from "@progress/kendo-react-dropdowns";
import DropdownList from "react-widgets/DropdownList";

// CoboBox addresses
let addresses = [
  { id: 0, name: "Jerusalem" },
  { id: 1, name: "Haifa" },
  { id: 2, name: "Tel-Aviv" },
  { id: 3, name: "Eilat" },
  { id: 4, name: "Ra'anana" },
  { id: 5, name: "Zichron" },
  { id: 6, name: "Tiberia" },
];

// CoboBox drivers
let drivers = [
  { id: 0, name: "Jason" },
  { id: 1, name: "Johanna" },
  { id: 2, name: "Ray" },
  { id: 3, name: "John" },
  { id: 4, name: "Lana" },
  { id: 5, name: "Emma" },
  { id: 6, name: "Harry" },
];

// Events
//let alertWhenSelected = () => alert("selected");
//let alertWhenChanged = () => alert("changed");

const Manager = () => {
  const [value, setValue] = useState(addresses[0].name);
  const [person, setPerson] = useState(drivers[0].name);

  return (
    <section className="admin">
      <form className="addressesList">
        <p>
          Current Value: <strong>{value}</strong>
        </p>
        <DropdownList
          value={value}
          data={addresses}
          dataKey="id"
          textField="name"
          //defaultValue={0}
          onChange={(e) => setValue(e.value)}
          //placeholder="Select an address"
        />
      </form>
      <form className="driversList">
        <p>
          Current Value: <strong>{person}</strong>
        </p>
        <DropdownList
          value={person}
          data={drivers}
          dataKey="id"
          textField="name"
          onChange={(e) => setPerson(e.value)}
          //placeholder="Select a driver"
        />
      </form>
    </section>
  );
};

export default Manager;
