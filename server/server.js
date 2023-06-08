//http://localhost:5000/
//const mockData = require("./mock-data");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const driverHandlers = require("./handlers/drivers/handlers");
const addressHandlers = require("./handlers/addresses/handlers");
const deliveryHandlers = require("./handlers/deliveries/handlers");

// For parsing application/json
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// **** NEXT STEPS ****
// 1. refactor code - extract 'drivers' and 'addresses' to seperated files (see example )
// 2. validate all inputs before making changes to data

// *****************DRIVERS********************
// GET DRIVERS
app.get("/drivers", driverHandlers.handleGetDrivers);
// Get a single driver based on id
app.get("/drivers/:id", driverHandlers.handleGetDriverById);
// POST - Add new driver
app.post("/drivers", driverHandlers.handlePostDriver);
// PUT - update a driver
app.put("/drivers/:id", driverHandlers.handlePutDriver);
// DELETE DRIVER
app.delete("/drivers/:id", driverHandlers.handleDeleteDriver);

// ******************ADDRESSES*****************
// GET ADDRESSES
app.get("/addresses", addressHandlers.handleGetAddresses);
// Get a single address based on id
app.get("/addresses/:id", addressHandlers.handleGetAddressById);

// POST - ADD new address
app.post("/addresses", addressHandlers.handlePostAddress);

// PUT -UPDATE an address
app.put("/addresses/:id", addressHandlers.handlePutAddress);

// DELETE ADDRESS
app.delete("/addresses/:id", addressHandlers.handleDeleteAddress);

// ******************DELIVERIES*****************
// GET DELIVERIES
app.get("/deliveries", deliveryHandlers.handleGetDeliveries);
// Get a single address based on id
app.get("/deliveries/:id", deliveryHandlers.handleGetDeliveryById);

// PUT -UPDATE an delivery
app.put("/deliveries/:id", deliveryHandlers.handlePutDelivery);

// DELETE delivery
app.delete("/deliveries/:id", deliveryHandlers.handleDeleteDelivery);

// CHECK delivery
app.delete("/deliveries/:id", deliveryHandlers.handleCheckDelivery);

/**
 * NEXT STEPS:
 * BE: EXPORT GenerateUUID & REGEXES to utils and consume from there
 * FE: Replace all dialog inputs with Bootstrap inputs, Add validations in UI
 *     - validate empty inputs and show errors (prevent sending data to BE & don't close dialog)
 *     - validate valid input data (phone number, age, email)
 *  - Add dialog - should always have clear inputs (bug)
 *
 * - NEXT STEPS: add "fake" login page
 * -- when username is admin -> redirect to admin page
 * -- when username is !admin -> redirect to driver page
 */

//****** Explainations******
// ****** Number 1*******
// RESTful API
// GET, PUT, DELETE, POST
// Get all drivers / single driver:
//  1. get all drivers: /drivers
//  2. get specific driver /drivers/{id}

// POST - create new driver
// 3. post to  /drivers - in request body - driver details

// PUT - update driver details
// 4. put to /drivers/{id} - in request body - driver details

// DELETE - delete single driver
// 5. delete to /drivers/{id}

// ************** Number 2**************
// RESTful API
// GET: (read entities)
// -- all drivers: /drivers
// -- specific driver: /drivers/:id

// POST: (new entity)
// -- add new driver (driver json in request body): /drivers

// PUT: (update entity)
// -- update existing driver (driver json in request body): /drivers/:id

// DELETE: (delete entity)
// -- delete existing user: /drivers/:id

/******prelog for RESTful APIs - must read******
const schoolsRoute = app.route("/schools");
schoolsRoute.get(() => {});
schoolsRoute.get("/:id", () => {});
schoolsRoute.post(() => {});
schoolsRoute.put("/:id", () => {});
schoolsRoute.delete("/:id", () => {});

const studentsRoute = schoolsRoute.route("/:id/students"); // /schools/:id/students
studentsRoute.get(() => {}); // get all students in school :id
studentsRoute.get("/:id", () => {}); // get specific student from a specific school
studentsRoute.post(() => {}); // add new student to a school
studentsRoute.put("/:id", () => {}); // update student in school
studentsRoute.delete("/:id", () => {}); // remove student from school
*/
