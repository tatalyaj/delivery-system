// ADDRESSSES
const addresses = [
  { id: 0, name: "Jerusalem", frequency: 0 },
  { id: 1, name: "Haifa", frequency: 0 },
  { id: 2, name: "Tel-Aviv", frequency: 0 },
  { id: 3, name: "Eilat", frequency: 0 },
  { id: 4, name: "Ra'anana", frequency: 0 },
  { id: 5, name: "Zichron", frequency: 0 },
  { id: 6, name: "Tiberia", frequency: 0 },
];
export default class Admin {
  //constructor() {}

  getAddresses() {
    return addresses;
  }

  editAddress(id, newAddress) {
    //console.log(id);
    //console.log(newAddress);
    const item = addresses.find((i) => i?.id === id);
    addresses[addresses.indexOf(item)].name = newAddress;
  }

  addAddress(name, frequency) {
    addresses.push({
      id: addresses.length,
      name: name,
      frequency: frequency,
    });
  }

  deleteAddress(id) {
    const item = addresses.find((i) => i.id === id);
    addresses.splice(addresses.indexOf(item), 1);
  }
}
