// ADDRESSSES
const addresses = [
  {
    id: 0,
    city: "Jerusalem",
    address: "King george 22",
    deliveryType: "medicine",
    frequency: 0,
    recipientName: "John",
    recipientPhone: "0528736440",
  },
  {
    id: 1,
    city: "Haifa",
    address: "Bar gyora 10",
    deliveryType: "medicine",
    frequency: 0,
    recipientName: "James",
    recipientPhone: "0503827110",
  },
  {
    id: 2,
    city: "Tel-Aviv",
    address: "Shenkin 20",
    deliveryType: "medicine",
    frequency: 0,
    recipientName: "Sarah",
    recipientPhone: "0507231009",
  },
  {
    id: 3,
    city: "Eilat",
    address: "Hanachal 12",
    deliveryType: "medicine",
    frequency: 0,
    recipientName: "Josh",
    recipientPhone: "026745899",
  },
  {
    id: 4,
    city: "Ra'anana",
    address: "Haneviim 3",
    deliveryType: "food",
    frequency: 0,
    recipientName: "Julian",
    recipientPhone: "0507837664",
  },
  {
    id: 5,
    city: "Zichron",
    address: "Neve 15",
    deliveryType: "food",
    frequency: 0,
    recipientName: "Natasha",
    recipientPhone: "0523478660",
  },
  {
    id: 6,
    city: "Tiberia",
    address: "Kineret 6",
    deliveryType: "food",
    frequency: 0,
    recipientName: "Ron",
    recipientPhone: "0504323119",
  },
];
// DRIVERS
const drivers = [
  {
    id: 0,
    firstName: "Jason",
    lastName: "Jones",
    phone: "0523473667",
    distributionArea: "North",
  },
  {
    id: 1,
    firstName: "Johanna",
    lastName: "Smith",
    phone: "0502876485",
    distributionArea: "South",
  },
  {
    id: 2,
    firstName: "Ray",
    lastName: "Johnson",
    phone: "0502874995",
    distributionArea: "East",
  },
  {
    id: 3,
    firstName: "John",
    lastName: "Williams",
    phone: "0507284775",
    distributionArea: "South",
  },
  {
    id: 4,
    firstName: "Lana",
    lastName: "Brown",
    phone: "0502875996",
    distributionArea: "North",
  },
  {
    id: 5,
    firstName: "Emma",
    lastName: "Davis",
    phone: "0538759665",
    distributionArea: "South",
  },
  {
    id: 6,
    firstName: "Harry",
    lastName: "Miller",
    phone: "0528475996",
    distributionArea: "West",
  },
];
export default class Admin {
  //constructor() {}
  // ADDRESSES
  getAddresses() {
    return addresses;
  }
  addAddress(
    newCity,
    newAddress,
    newDeliveryType,
    newFrequency,
    newRecipientName,
    newRecipientPhone
  ) {
    addresses.push({
      id: addresses.length,
      city: newCity,
      address: newAddress,
      deliveryType: newDeliveryType,
      frequency: newFrequency,
      recipientName: newRecipientName,
      recipientPhone: newRecipientPhone,
    });
  }
  deleteAddress(id) {
    const item = addresses.find((i) => i.id === id);
    addresses.splice(addresses.indexOf(item), 1);
  }
  editAddress(
    id,
    updatedCity,
    updatedAddress,
    updatedDeliveryType,
    updatedFrequency,
    updatedRecipientName,
    updatedRecipientPhone
  ) {
    const item = addresses.find((i) => i?.id === id);
    updatedCity !== null
      ? (addresses[addresses.indexOf(item)].city = updatedCity)
      : (addresses[addresses.indexOf(item)].city =
          addresses[addresses.indexOf(item)].city);
    updatedAddress !== null
      ? (addresses[addresses.indexOf(item)].address = updatedAddress)
      : (addresses[addresses.indexOf(item)].address =
          addresses[addresses.indexOf(item)].address);
    updatedDeliveryType !== null
      ? (addresses[addresses.indexOf(item)].deliveryType = updatedDeliveryType)
      : (addresses[addresses.indexOf(item)].deliveryType =
          addresses[addresses.indexOf(item)].deliveryType);
    updatedFrequency !== null
      ? (addresses[addresses.indexOf(item)].frequency = updatedFrequency)
      : (addresses[addresses.indexOf(item)].frequency =
          addresses[addresses.indexOf(item)].frequency);
    updatedRecipientName !== null
      ? (addresses[addresses.indexOf(item)].recipientName =
          updatedRecipientName)
      : (addresses[addresses.indexOf(item)].recipientName =
          addresses[addresses.indexOf(item)].recipientName);
    updatedRecipientPhone !== null
      ? (addresses[addresses.indexOf(item)].recipientPhone =
          updatedRecipientPhone)
      : (addresses[addresses.indexOf(item)].recipientPhone =
          addresses[addresses.indexOf(item)].recipientPhone);
  }
  // DRIVERS
  getDrivers() {
    return drivers;
  }
  addDriver(newFirstName, newLastName, newPhone, newDistributionArea) {
    drivers.push({
      id: drivers.length,
      firstName: newFirstName,
      lastName: newLastName,
      phone: newPhone,
      distributionArea: newDistributionArea,
    });
  }
  deleteDriver(id) {
    const item = drivers.find((i) => i.id === id);
    drivers.splice(drivers.indexOf(item), 1);
  }
  // !== null ? : =
  editDriver(
    id,
    updatedFirstName,
    updatedLastName,
    updatedPhone,
    updatedDistributionArea
  ) {
    const item = drivers.find((i) => i?.id === id);
    updatedFirstName !== null
      ? (drivers[drivers.indexOf(item)].firstName = updatedFirstName)
      : (drivers[drivers.indexOf(item)].firstName =
          drivers[drivers.indexOf(item)].firstName);
    updatedLastName !== null
      ? (drivers[drivers.indexOf(item)].lastName = updatedLastName)
      : (drivers[drivers.indexOf(item)].lastName =
          drivers[drivers.indexOf(item)].lastName);
    updatedPhone !== null
      ? (drivers[drivers.indexOf(item)].phone = updatedPhone)
      : (drivers[drivers.indexOf(item)].phone =
          drivers[drivers.indexOf(item)].phone);
    updatedDistributionArea !== null
      ? (drivers[drivers.indexOf(item)].distributionArea =
          updatedDistributionArea)
      : (drivers[drivers.indexOf(item)].distributionArea =
          drivers[drivers.indexOf(item)].distributionArea);
  }
}
