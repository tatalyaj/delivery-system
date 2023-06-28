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

/*
 * - NEXT STEPS: add "fake" login page
 * -- when username is admin -> redirect to admin page
 * -- when username is !admin -> redirect to driver page
 */
