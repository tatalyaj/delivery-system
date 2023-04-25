// import { drivers } from "./mock-data";
export default class AdminDrivers {
  async getDrivers() {
    let drivers;
    try {
      const res = await fetch("http://localhost:5000/drivers");
      drivers = (await res.json()).drivers;
    } catch (e) {
      drivers = [];
    }

    return drivers;
  }
  // ADD
  async addDriver(newFirstName, newLastName, newPhone, newDistributionArea) {
    let drivers;
    try {
      const res = await fetch(
        `http://localhost:5000/postDriver/${newFirstName}/${newLastName}/${newPhone}/${newDistributionArea} `
      );
      drivers = (await res.json()).drivers;
    } catch (e) {
      drivers = [];
    }
    return drivers;
  }
  //DELETE
  async deleteDriver(id) {
    let drivers;
    try {
      const res = await fetch(`http://localhost:5000/deleteDriver/${id} `);
      drivers = (await res.json()).drivers;
    } catch (e) {
      drivers = [];
    }
    return drivers;
  }

  //EDIT
  async editDriver(
    id,
    updatedFirstName,
    updatedLastName,
    updatedPhone,
    updatedDistributionArea
  ) {
    let drivers;
    try {
      const res = await fetch(
        `http://localhost:5000/putDriver/${id}/${updatedFirstName}/${updatedLastName}/${updatedPhone}/${updatedDistributionArea} `
      );
      drivers = (await res.json()).drivers;
    } catch (e) {
      drivers = [];
    }
    return drivers;
  }
}
