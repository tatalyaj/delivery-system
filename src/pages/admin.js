import { useState } from "react";
import Select from "react-select";
import Button from "@mui/material/Button";

const Manager = () => {
  //******************USE-STATES******************
  // ADDRESSSES
  const [addresses, setAddresses] = useState([
    { id: 0, name: "Jerusalem" },
    { id: 1, name: "Haifa" },
    { id: 2, name: "Tel-Aviv" },
    { id: 3, name: "Eilat" },
    { id: 4, name: "Ra'anana" },
    { id: 5, name: "Zichron" },
    { id: 6, name: "Tiberia" },
  ]);
  const [addressesOptions, setAddressesOptions] = useState([]);
  const [addrName, setAddrName] = useState("");
  // DRIVERS
  const [drivers, setDrivers] = useState([
    { id: 0, name: "Jason" },
    { id: 1, name: "Johanna" },
    { id: 2, name: "Ray" },
    { id: 3, name: "John" },
    { id: 4, name: "Lana" },
    { id: 5, name: "Emma" },
    { id: 6, name: "Harry" },
  ]);
  const [driversOptions, setDriversOptions] = useState([]);
  const [driverName, setDriverName] = useState("");

  // ******************CONSTANTS******************
  // ADDRESSSES
  let nextAddrId = addresses[addresses.length - 1].id;
  // DRIVERS
  let nextDriverId = drivers[drivers.length - 1].id;
  // ******************HANDLE FUNCTIONS******************
  // ADDRESSSES
  // THE "GET" SCENARIO
  const handleAddressesOptions = (addressesOptions) =>
    setAddressesOptions(addressesOptions);
  // THE "ADD" SCENARIO
  // The input value name
  const handleSetAddrName = (e) => setAddrName(e.target.value);
  console.log(addrName);
  // The value added by the push on the "ADD BUTTON"
  const handleAddAddresses = () => {
    setAddrName("");
    var updatedAddrList = [...addresses];
    updatedAddrList = [...addresses, { id: nextAddrId++, name: addrName }];
    setAddresses(updatedAddrList);
    console.log(updatedAddrList);
  };
  // THE "DELETE" SCENARIO
  const handleDeleteAddresses = (getID) => {
    setAddresses(addresses.filter((single) => single.id !== getID));
    setAddressesOptions(
      addressesOptions.filter((single) => single.id !== getID)
    );
  };
  // DRIVERS
  // THE "GET" SCENARIO
  const handleDriversOptions = (driversOptions) =>
    setDriversOptions(driversOptions);
  // THE "ADD" SCENARIO
  // The input value name
  const handleSetDriversName = (e) => setDriverName(e.target.value);
  console.log(driverName);
  // The value added by the push on the "ADD BUTTON"
  const handleAddDrivers = () => {
    setDriverName("");
    var updatedDriversList = [...drivers];
    updatedDriversList = [...drivers, { id: nextDriverId++, name: driverName }];
    setDrivers(updatedDriversList);
    console.log(updatedDriversList);
  };
  // THE "DELETE" SCENARIO
  const handleDeleteDrivers = (getID) => {
    setDrivers(drivers.filter((single) => single.id !== getID));
    setDriversOptions(driversOptions.filter((single) => single.id !== getID));
  };
  return (
    <div className="admin">
      <div className="addresses">
        <Select
          isMulti
          isSearchable
          maxMenuHeight={200}
          isClearable={false}
          options={addresses}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          value={addressesOptions}
          onChange={handleAddressesOptions}
        />
        <div className="address-Buttons">
          <div
            className="address-Add-Button"
            style={{ marginTop: 40, marginBottom: 40 }}
          >
            <input value={addrName} onChange={handleSetAddrName} />
            <button onClick={handleAddAddresses}>Add Address</button>
          </div>
          <div
            className="address-Delete-Button"
            style={{ marginTop: 40, marginBottom: 40 }}
          >
            <Button
              onClick={() => handleDeleteAddresses(addressesOptions.id)}
              color="primary"
              style={{ marginLeft: 20 }}
            >
              Delete Address
            </Button>
          </div>
        </div>
      </div>
      <div className="drivers">
        <Select
          isMulti
          isSearchable
          maxMenuHeight={200}
          isClearable={false}
          options={drivers}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          value={driversOptions}
          onChange={handleDriversOptions}
        />
        <div className="drivers-Buttons">
          <div
            className="drivers-Add-Button"
            style={{ marginTop: 40, marginBottom: 40 }}
          >
            <input value={driverName} onChange={handleSetDriversName} />
            <button onClick={handleAddDrivers}>Add Driver</button>
          </div>
          <div
            className="drivers-Delete-Button"
            style={{ marginTop: 40, marginBottom: 40 }}
          >
            <Button
              onClick={() => handleDeleteDrivers(driversOptions.id)}
              color="primary"
              style={{ marginLeft: 20 }}
            >
              Delete Driver
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Manager;
