import React from "react";
import Combobox from "react-widgets/Combobox";
//import { DropDownList } from "@progress/kendo-react-dropdowns";

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

const Manager = () => {
  return (
    <section className="admin">
      <form className="addressesList">
        <Combobox
          data={addresses}
          dataKey="id"
          textField="name"
          defaultValue={0}
          placeholder="Select an address"
        />
        <Combobox
          data={drivers}
          dataKey="id"
          textField="name"
          placeholder="Select a driver"
        />
      </form>
    </section>
  );
};

export default Manager;
