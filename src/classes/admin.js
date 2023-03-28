import { addresses, drivers } from "./mock-data";
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
    // TODO: on edit - replace the entire object
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
