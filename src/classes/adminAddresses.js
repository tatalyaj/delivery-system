//import { addresses } from "./mock-data";
// const res = await fetch(url, {method: 'POST', headers?, body: JSON.stringify(payload)})

const BACKEND_HOST = "http://localhost:5000";

export default class AdminAddresses {
  // GET
  async getAddresses() {
    let addresses;
    try {
      const res = await fetch(`${BACKEND_HOST}/addresses`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(), // body data type must match "Content-Type" header
      });
      addresses = (await res.json()).addresses;
    } catch (e) {
      addresses = [];
    }
    return addresses;
  }

  // ADD / POST
  async addAddress(
    city,
    address,
    deliveryType,
    frequency,
    recipientName,
    recipientPhone
  ) {
    // data/payload
    const payload = {
      city: city,
      address: address,
      delivery_type: deliveryType,
      frequency: frequency,
      recipient_name: recipientName,
      recipient_phone: recipientPhone,
    };
    let addresses;
    try {
      const res = await fetch(`${BACKEND_HOST}/addresses`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // body data type must match "Content-Type" header
      });
      // BEFORE - addresses = (await res.json()).addresses;
      addresses = await res.json(); // usually we don't receive the updated list on actions like add, edit , delete
    } catch (e) {
      addresses = []; // <--- this is a bug
      // throw e
    }
    return addresses;
  }

  // PUT / UPDATE
  async editAddress(
    id,
    city,
    address,
    deliveryType,
    frequency,
    recipientName,
    recipientPhone
  ) {
    // data/payload
    const payload = {
      id: id,
      city: city,
      address: address,
      delivery_type: deliveryType,
      frequency: frequency,
      recipient_name: recipientName,
      recipient_phone: recipientPhone,
    };
    console.log(payload);
    let addresses;
    try {
      const res = await fetch(`${BACKEND_HOST}/addresses/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // body data type must match "Content-Type" header
      });
      //addresses = (await res.json()).addresses;
      addresses = await res.json();
    } catch (e) {
      // addresses = [];
    }
    return addresses;
  }

  // DELETE
  async deleteAddress(id) {
    let addresses;
    try {
      const res = await fetch(`${BACKEND_HOST}/addresses/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(), // body data type must match "Content-Type" header
      });
      //addresses = (await res.json()).addresses;
      addresses = await res.json();
    } catch (e) {
      addresses = [];
    }
    return addresses;
  }
}
