import { addresses } from "./mock-data";
export default class AdminAddresses {
  async getAddresses() {
    let addresses;
    try {
      const res = await fetch("http://localhost:5000/addresses");
      addresses = (await res.json()).addresses;
    } catch (e) {
      addresses = [];
    }
    return addresses;
  }
  // ADD
  async addAddress(
    newCity,
    newAddress,
    newDeliveryType,
    newFrequency,
    newRecipientName,
    newRecipientPhone
  ) {
    let addresses;
    try {
      const res = await fetch(
        `http://localhost:5000/postAddress/${newCity}/${newAddress}/${newDeliveryType}/${newFrequency}/${newRecipientName}/${newRecipientPhone} `
      );
      addresses = (await res.json()).addresses;
    } catch (e) {
      addresses = [];
    }
    return addresses;
  }

  // DELETE
  async deleteAddress(id) {
    let addresses;
    try {
      const res = await fetch(`http://localhost:5000/deleteAddress/${id}`);
      addresses = (await res.json()).addresses;
    } catch (e) {
      addresses = [];
    }
    return addresses;
  }
  // EDIT
  async editAddress(
    id,
    updatedCity,
    updatedAddress,
    updatedDeliveryType,
    updatedFrequency,
    updatedRecipientName,
    updatedRecipientPhone
  ) {
    let addresses;
    try {
      const res = await fetch(
        `http://localhost:5000/putAddress/${id}/${updatedCity}/${updatedAddress}/${updatedDeliveryType}/${updatedFrequency}/${updatedRecipientName}/${updatedRecipientPhone} `
      );
      addresses = (await res.json()).addresses;
    } catch (e) {
      addresses = [];
    }
    return addresses;
  }
}
