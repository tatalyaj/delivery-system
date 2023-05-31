// import { drivers } from "./mock-data";
const BACKEND_HOST = "http://localhost:5000";

export default class AdminDrivers {
  // GET
  async getDrivers() {
    let drivers;
    try {
      const res = await fetch(`${BACKEND_HOST}/drivers`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(), // body data type must match "Content-Type" header
      });
      drivers = (await res.json()).drivers;
    } catch (e) {
      drivers = [];
    }

    return drivers;
  }

  // ADD / POST
  async addDriver(firstName, lastName, phone, distributionArea) {
    // data/payload
    const payload = {
      first_name: firstName,
      last_name: lastName,
      phone_num: phone,
      distribution_area: distributionArea,
    };
    try {
      const res = await fetch(`${BACKEND_HOST}/drivers`, {
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

  // UPDATE / PUT
  async editDriver(id, firstName, lastName, phone, distributionArea) {
    const payload = {
      id: id,
      first_name: firstName,
      last_name: lastName,
      phone_num: phone,
      distribution_area: distributionArea,
    };

    try {
      const res = await fetch(`${BACKEND_HOST}/drivers/${id}`, {
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

  //DELETE
  async deleteDriver(id) {
    try {
      const res = await fetch(`${BACKEND_HOST}/drivers/${id}`, {
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
