import { addresses } from "./mock-data";
export default class AdminAddresses {
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
    // DONE : on edit - replace the entire object
    addresses[addresses.indexOf(item)].city = updatedCity;
    addresses[addresses.indexOf(item)].address = updatedAddress;
    addresses[addresses.indexOf(item)].deliveryType = updatedDeliveryType;
    addresses[addresses.indexOf(item)].frequency = updatedFrequency;
    addresses[addresses.indexOf(item)].recipientName = updatedRecipientName;
    addresses[addresses.indexOf(item)].recipientPhone = updatedRecipientPhone;
  }
}
