const mockData = require("./../../mock-data");
const regexValidation = require("./../../utils/Regex");
const validation = require("./../../utils/validations");

// GET drivers handler
const handleGetDrivers = (req, res) => {
  res.json({ drivers: mockData.drivers });
};
// GET driver by ID handler
const handleGetDriverById = (req, res) => {
  const driver = mockData.drivers.find(
    (item) => item.id === Number(req.params.id)
  );
  if (driver) {
    res.json(driver);
  } else {
    res.sendStatus(404);
  }
};
// POST - add new driver handler - should add validations for user payload
const handlePostDriver = (req, res) => {
  const drivers = mockData.drivers;
  const data = req.body;
  // validate that all data is present and valid (not empty, phone pattern (regex))
  // [1,2] -> array length = 2 - bug if we use array.length
  if (isDriverValid(data)) {
    let newId;
    try {
      newId = validation.generateUUID(drivers);
    } catch (e) {
      res.sendStatus(500);
      return;
    }
    drivers.push({
      id: newId,
      firstName: data.first_name,
      lastName: data.last_name,
      phone: data.phone_num,
      distributionArea: data.distribution_area,
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};
// PUT -  driver update handler
const handlePutDriver = (req, res) => {
  // const driver = req.body.json()
  let drivers = mockData.drivers;
  let data = req.body;
  const driver = drivers.find((item) => item.id === Number(data.id)); // returns an object by reference
  // validate that driver was indeed found (like in get)
  // driver.firstName = data.first_name;
  if (driver && isDriverValid(data)) {
    driver.firstName = data.first_name;
    driver.lastName = data.last_name;
    driver.phone = data.phone_num;
    driver.distributionArea = data.distribution_area;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};
// DELETE - delete driver handler - usually, we don't respond with the changed data - the UI should call GET DRIVERS after a successful deletion / edition
const handleDeleteDriver = (req, res) => {
  let drivers = mockData.drivers;
  const data = req.params;
  const driverToDelete = drivers.find((item) => item.id === Number(data.id));
  // validate that driverToDelete exists
  if (driverToDelete) {
    drivers.splice(drivers.indexOf(driverToDelete), 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

// validation function can be used in post and put
const isDriverValid = (driver) => {
  // return !(!driver.first_name || !driver.last_name || ...) === !!driver.first_name && !!driver.last_name...
  const validPhone = regexValidation.validPhoneRegex;
  const validName = regexValidation.validNameRegex;
  if (!validName.test(driver.first_name)) {
    return false;
  } else if (!validName.test(driver.last_name)) {
    return false;
  } else if (!validPhone.test(driver.phone_num)) {
    return false;
  } else if (!driver.distribution_area) {
    return false;
  }
  console.log("Driver is valid");
  return true;
};

module.exports = {
  handleGetDrivers,
  handleGetDriverById,
  handlePostDriver,
  handlePutDriver,
  handleDeleteDriver,
};

// FORMER VALIDATION FUNC
// // validation function can be used in post and put
// const isDriverValid = (driver) => {
//   // return !(!driver.first_name || !driver.last_name || ...) === !!driver.first_name && !!driver.last_name...
//   const phoneToNum = Number(driver.phone_num);
//   if (typeof driver.id !== "number") {
//     if (!driver.first_name) {
//       return false;
//     } else if (!driver.last_name) {
//       return false;
//     } else if (!phoneToNum && isNaN(phoneToNum)) {
//       return false;
//     } else if (!driver.distribution_area) {
//       return false;
//     }
//   } else if (isNaN(phoneToNum)) {
//     return false;
//   }
//   console.log("Driver is valid");
//   return true;
// };
