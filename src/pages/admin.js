import { useState } from "react";
import Select from "react-select";
import Button from "@mui/material/Button";
//import { c } from "tar";

const Manager = () => {
  //******************USE-STATES******************
  // ADDRESSSES
  const [addresses, setAddresses] = useState([
    { id: 0, name: "Jerusalem", frequency: 0 },
    { id: 1, name: "Haifa", frequency: 0 },
    { id: 2, name: "Tel-Aviv", frequency: 0 },
    { id: 3, name: "Eilat", frequency: 0 },
    { id: 4, name: "Ra'anana", frequency: 0 },
    { id: 5, name: "Zichron", frequency: 0 },
    { id: 6, name: "Tiberia", frequency: 0 },
  ]);
  const [addressesOptions, setAddressesOptions] = useState([]);
  const [addrName, setAddrName] = useState("");
  const [addrUpdatedName, setUpdatedAddrName] = useState("");
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
  const [driverUpdatedName, setUpdatedDriverName] = useState("");
  //  TYPE OF DELIVERY
  const [types, setTypes] = useState([
    { id: 0, name: "food" },
    { id: 1, name: "medicine" },
  ]);
  const [typesOptions, setTypesOptions] = useState([]);
  // ******************CONSTANTS******************
  // ADDRESSSES
  let nextAddrId = addresses[addresses.length - 1].id;

  // DRIVERS
  let nextDriverId = drivers[drivers.length - 1].id;
  // ******************HANDLE FUNCTIONS******************
  // ADDRESSSES
  // THE "GET" SCENARIO
  const handleAddressesOptions = (addressesOptions) => {
    setAddressesOptions(addressesOptions);
    //console.log(addressesOptions.length);
    // In each Select the FREQUENCY goes up by one
    for (let i = 0; i <= addressesOptions.length - 1; i++) {
      addressesOptions[i].frequency++;
      //console.log(addressesOptions[i]);
    }
  };

  // THE "ADD" SCENARIO
  // The input value name
  const handleSetAddrName = (e) => setAddrName(e.target.value);
  //console.log(addrName);
  // The value added by the push on the "ADD BUTTON"
  const handleAddAddresses = () => {
    setAddrName("");
    var updatedAddrList = [...addresses];
    updatedAddrList = [
      ...addresses,
      { id: nextAddrId++, name: addrName, frequency: 0 },
    ];
    setAddresses(updatedAddrList);
    //console.log(updatedAddrList);
  };
  // THE "DELETE" SCENARIO
  const handleDeleteAddresses = (addressesChosen) => {
    for (let i = 0; i <= addressesChosen.length - 1; i++)
      addresses.splice(addressesChosen[i].id, 1);
    //console.log(addresses);

    // var chosenIDList = [];
    // var chosenAddr = [];
    // // addressesChosen - Its a list of the addresses The user chose
    // for (let i = 0; i <= addressesChosen.length - 1; i++) {
    //   chosenIDList[i] = addressesChosen[i].id;
    // }
    // // console.log(chosenIDList);
    // for (let i = 0; i <= chosenIDList.length - 1; i++) {
    //   chosenAddr[i] = addresses.filter((single) => {
    //     return single.id === chosenIDList[i]
    //       ? addresses.splice(single.id, 1)
    //       : addresses;
    //   });
    // }
  };
  // THE "UPDATE" SCENARIO
  const handleUpdatedAddrName = (e) => {
    setUpdatedAddrName(e.target.value);
  };
  // The value updated by the click on the "UPDATE BUTTON"
  const handleUpdateAddresses = (addressesChosen) => {
    setUpdatedAddrName("");
    for (let i = 0; i <= addressesChosen.length - 1; i++) {
      addressesChosen[i].name = addrUpdatedName;
      //console.log(addressesChosen);
    }
  };

  // DRIVERS
  // THE "GET" SCENARIO
  const handleDriversOptions = (driversOptions) =>
    setDriversOptions(driversOptions);
  // THE "ADD" SCENARIO
  // The input value name
  const handleSetDriversName = (e) => setDriverName(e.target.value);
  //console.log(driverName);
  // The value added by the click on the "ADD BUTTON"
  const handleAddDrivers = () => {
    setDriverName("");
    var updatedDriversList = [...drivers];
    updatedDriversList = [...drivers, { id: nextDriverId++, name: driverName }];
    setDrivers(updatedDriversList);
    //console.log(updatedDriversList);
  };
  // THE "DELETE" SCENARIO
  const handleDeleteDrivers = (driversChosen) => {
    for (let i = 0; i <= driversChosen.length - 1; i++)
      drivers.splice(driversChosen[i].id, 1);
    //console.log(drivers);

    // var chosenIDList = [];
    // var chosenDriver = [];
    // // driversChosen - Its a list of the drivers The user chose
    // for (let i = 0; i <= driversChosen.length - 1; i++) {
    //   chosenIDList[i] = driversChosen[i].id;
    // }
    // // console.log(chosenIDList);
    // for (let i = 0; i <= chosenIDList.length - 1; i++) {
    //   chosenDriver[i] = drivers.filter((single) => {
    //     return single.id === chosenIDList[i]
    //       ? drivers.splice(single.id, 1)
    //       : drivers;
    //   });
    // }
  };
  // THE "UPDATE" SCENARIO
  const handleUpdatedDriverName = (e) => {
    setUpdatedDriverName(e.target.value);
    //console.log(e.target.value);
  };
  // The value updated by the click on the "UPDATE BUTTON"
  const handleUpdateDriver = (driversChosen) => {
    setUpdatedDriverName("");
    for (let i = 0; i <= driversChosen.length - 1; i++) {
      driversChosen[i].name = driverUpdatedName;
      //console.log(driversChosen);
    }
  };
  //  TYPE OF DELIVERY
  // THE "GET" SCENARIO
  const handleTypesOptions = (typesOptions) => setTypesOptions(typesOptions);
  return (
    <div className="admin">
      <div className="addresses">
        <Select
          isMulti
          isSearchable
          maxMenuHeight={200}
          isClearable={false}
          placeholder="Select an address..."
          options={addresses}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          value={addressesOptions}
          onChange={handleAddressesOptions}
        />
        <div className="address-buttons">
          <div
            className="address-add-button"
            style={{ marginTop: 40, marginBottom: 40 }}
          >
            <input value={addrName} onChange={handleSetAddrName} />
            <Button
              onClick={handleAddAddresses}
              color="primary"
              style={{ marginLeft: 20 }}
            >
              Add Address
            </Button>
          </div>
          <div
            className="address-delete-button"
            style={{ marginTop: 40, marginBottom: 40 }}
          >
            <Button
              onClick={() => handleDeleteAddresses(addressesOptions)}
              //onClick={handleDeleteAddresses()}
              color="primary"
              style={{ marginLeft: 20 }}
            >
              Delete Address
            </Button>
          </div>
          <div
            className="address-update-button"
            style={{ marginTop: 40, marginBottom: 40 }}
          >
            <input value={addrUpdatedName} onChange={handleUpdatedAddrName} />
            <Button
              onClick={() => handleUpdateAddresses(addressesOptions)}
              //onClick={handleDeleteAddresses()}
              color="primary"
              style={{ marginLeft: 20 }}
            >
              Update Address
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
          placeholder="Select a driver..."
          options={drivers}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          value={driversOptions}
          onChange={handleDriversOptions}
        />
        <div className="drivers-buttons">
          <div
            className="drivers-add-button"
            style={{ marginTop: 40, marginBottom: 40 }}
          >
            <input value={driverName} onChange={handleSetDriversName} />
            <Button
              onClick={handleAddDrivers}
              color="primary"
              style={{ marginLeft: 20 }}
            >
              Add Driver
            </Button>
          </div>
          <div
            className="drivers-delete-button"
            style={{ marginTop: 40, marginBottom: 40 }}
          >
            <Button
              onClick={() => handleDeleteDrivers(driversOptions)}
              color="primary"
              style={{ marginLeft: 20 }}
            >
              Delete Driver
            </Button>
          </div>
          <div
            className="drivers-update-button"
            style={{ marginTop: 40, marginBottom: 40 }}
          >
            <input
              value={driverUpdatedName}
              onChange={handleUpdatedDriverName}
            />
            <Button
              onClick={() => handleUpdateDriver(driversOptions)}
              color="primary"
              style={{ marginLeft: 20 }}
            >
              Update Driver
            </Button>
          </div>
        </div>
      </div>
      <div className="types-of-delivery">
        <Select
          isMulti
          isSearchable
          maxMenuHeight={200}
          isClearable={false}
          placeholder="Select a delivery type..."
          options={types}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          value={typesOptions}
          onChange={handleTypesOptions}
        />
      </div>
    </div>
  );
};
export default Manager;
