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
    try {
      const res = await fetch(`${BACKEND_HOST}/addresses`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // body data type must match "Content-Type" header
      });

      if (!res.ok) {
        throw new Error(`Error status: ${res.status}`);
      }
    } catch (e) {
      throw e;
    }
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
    //console.log(payload);

    try {
      const res = await fetch(`${BACKEND_HOST}/addresses/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // body data type must match "Content-Type" header
      });
      if (!res.ok) {
        throw new Error(`Error status: ${res.status}`);
      }
    } catch (e) {
      throw e;
    }
  }

  // DELETE
  async deleteAddress(id) {
    try {
      const res = await fetch(`${BACKEND_HOST}/addresses/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(), // body data type must match "Content-Type" header
      });

      if (!res.ok) {
        throw new Error(`Error status: ${res.status}`);
      }
    } catch (e) {
      throw e;
    }
  }
}
