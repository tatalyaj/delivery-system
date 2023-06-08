const BACKEND_HOST = "http://localhost:5000";

export default class Deliveries {
  // GET
  async getDeliveries() {
    let deliveries;
    try {
      const res = await fetch(`${BACKEND_HOST}/deliveries`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(), // body data type must match "Content-Type" header
      });
      deliveries = (await res.json()).deliveries;
    } catch (e) {
      deliveries = [];
    }
    return deliveries;
  }

  // PUT / UPDATE
  async editDelivery(
    id,
    city,
    address,
    deliveryType,
    frequency,
    recipientName,
    recipientPhone,
    done
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
      done: done,
    };
    //console.log(payload);

    try {
      const res = await fetch(`${BACKEND_HOST}/deliveries/${id}`, {
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
  async deleteDelivery(id) {
    try {
      const res = await fetch(`${BACKEND_HOST}/deliveries/${id}`, {
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

  // CHECK
  async checkDelivery(id) {
    try {
      const res = await fetch(`${BACKEND_HOST}/deliveries/${id}`, {
        method: "DELETE", // CHECK is like DELETE to the server
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
