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

  editDriver(
    id,
    updatedFirstName,
    updatedLastName,
    updatedPhone,
    updatedDistributionArea
  ) {
    const item = drivers.find((i) => i?.id === id);
    drivers[drivers.indexOf(item)].firstName = updatedFirstName;
    drivers[drivers.indexOf(item)].lastName = updatedLastName;
    drivers[drivers.indexOf(item)].phone = updatedPhone;
    drivers[drivers.indexOf(item)].distributionArea = updatedDistributionArea;
  }
}
