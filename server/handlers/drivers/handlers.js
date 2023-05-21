const mockData = require("./../../mock-data");
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
  console.log(`In server add-post new id: ${drivers.length}`);
  // validate that all data is present and valid (not empty, phone pattern (regex))
  // [1,2] -> array length = 2 - bug if we use array.length
  drivers.push({
    id: drivers.length, // check if ID already exists (UUID)
    firstName: data.first_name,
    lastName: data.last_name,
    phone: data.phone,
    distributionArea: data.distribution_area,
  });
  res.json(drivers);
};
// PUT -  driver update handler
const handlePutDriver = (req, res) => {
  // const driver = req.body.json()
  let drivers = mockData.drivers;
  let data = req.body;
  const driver = drivers.find((item) => item.id === Number(data.id)); // returns an object by reference
  // validate that driver was indeed found (like in get)
  // driver.firstName = data.first_name;

  if (driver) {
    drivers[drivers.indexOf(driver)].firstName = data.first_name;
    drivers[drivers.indexOf(driver)].lastName = data.last_name;
    drivers[drivers.indexOf(driver)].phone = data.phone;
    drivers[drivers.indexOf(driver)].distributionArea = data.distribution_area;
    res.json(drivers);
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

  drivers.splice(drivers.indexOf(driverToDelete), 1);
  res.json(drivers);
};

module.exports = {
  handleGetDrivers,
  handleGetDriverById,
  handlePostDriver,
  handlePutDriver,
  handleDeleteDriver,
};

// // validation function can be used in post and put
// const isDriverValid = (driver) => {
//   // return !(!driver.first_name || !driver.last_name || ...) === !!driver.first_name && !!driver.last_name...

//   if (!driver.first_name) {
//     return false;
//   } else if (!driver.last_name) {
//     return false;
//   } // validate all fields

//   return true;
// };
