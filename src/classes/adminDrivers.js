import { drivers } from "./mock-data";
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
    //console.log(id);
    let drivers;
    try {
      const res = await fetch(
        `http://localhost:5000/postDriver/${newFirstName}/${newLastName}/${newPhone}/${newDistributionArea} `
      );
      drivers = (await res.json()).drivers;
    } catch (e) {
      drivers = [];
    }
    // console.log(`in delete driver page, driver: ${drivers}`);
    return drivers;
  }
  // PREVIOUS ADD
  // addDriver(newFirstName, newLastName, newPhone, newDistributionArea) {
  //   drivers.push({
  //     id: drivers.length,
  //     firstName: newFirstName,
  //     lastName: newLastName,
  //     phone: newPhone,
  //     distributionArea: newDistributionArea,
  //   });
  // }
  //DELETE
  async deleteDriver(id) {
    console.log(id);
    let drivers;
    try {
      const res = await fetch(`http://localhost:5000/deleteDriver/${id} `);
      drivers = (await res.json()).drivers;
    } catch (e) {
      drivers = [];
    }
    // console.log(`in delete driver page, driver: ${drivers}`);
    return drivers;
  }
  // PREVIOUS DELETE
  // deleteDriver(id) {
  //   const item = drivers.find((i) => i.id === id);
  //   drivers.splice(drivers.indexOf(item), 1);
  // }
  //EDIT
  async editDriver(
    id,
    updatedFirstName,
    updatedLastName,
    updatedPhone,
    updatedDistributionArea
  ) {
    //console.log(id);
    let drivers;
    try {
      const res = await fetch(
        `http://localhost:5000/putDriver/${id}/${updatedFirstName}/${updatedLastName}/${updatedPhone}/${updatedDistributionArea} `
      );
      drivers = (await res.json()).drivers;
    } catch (e) {
      drivers = [];
    }
    // console.log(`in delete driver page, driver: ${drivers}`);
    return drivers;
  }
  // PREVIOUS EDIT
  //   editDriver(
  //     id,
  //     updatedFirstName,
  //     updatedLastName,
  //     updatedPhone,
  //     updatedDistributionArea
  //   ) {
  //     const item = drivers.find((i) => i?.id === id);
  //     drivers[drivers.indexOf(item)].firstName = updatedFirstName;
  //     drivers[drivers.indexOf(item)].lastName = updatedLastName;
  //     drivers[drivers.indexOf(item)].phone = updatedPhone;
  //     drivers[drivers.indexOf(item)].distributionArea = updatedDistributionArea;
  //   }
}
