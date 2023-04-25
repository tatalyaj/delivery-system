//http://localhost:5000/
const mockData = require("./mock-data");
//FOURTH TRY
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// GET DRIVER
app.get("/drivers", (req, res) => {
  res.json({ drivers: mockData.drivers });
  // res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/drivers/:id", (req, res) => {
  const driver = mockData.drivers.find(
    (item) => item.id === Number(req.params.id)
  );

  if (driver) {
    res.json(driver);
  } else {
    console.log(`in server get single`);
    res.sendStatus(404);
  }
});

// DELETE DRIVER
app.get("/deleteDriver/:id", (req, res) => {
  let drivers = mockData.drivers;
  console.log(`in server delete driver id,  ${req.params.id})`);
  const driverToDelete = drivers.find(
    (item) => item.id === Number(req.params.id)
  );
  //console.log(`in server delete driver, the driver to delete ${driverToDelete}`);
  drivers.splice(drivers.indexOf(driverToDelete), 1);
  // The Condition
  /*
  if (driverToDelete) {
    res.json(drivers);
  } else {
    res.sendStatus(404);
  }*/
  res.json(drivers);
});
// PUT - update a driver
app.get(
  `/putDriver/:id/:updatedFirstName/:updatedLastName/:updatedPhone/:updatedDistributionArea`,
  //http://localhost:5000/putDriver/1/Adam/Avniel/026510655/Jerusalem
  (req, res) => {
    let drivers = mockData.drivers;
    const driver = mockData.drivers.find(
      (item) => item.id === Number(req.params.id)
    );
    //console.log(`in server edit the updated name: ${req.params.firstName}`);
    console.log(
      `in server edit the updated name: ${req.params.updatedFirstName}`
    );
    console.log(
      `in server edit the updated distribution is: ${req.params.updatedDistributionArea}`
    );
    drivers[drivers.indexOf(driver)].firstName = req.params.updatedFirstName;
    drivers[drivers.indexOf(driver)].lastName = req.params.updatedLastName;
    drivers[drivers.indexOf(driver)].phone = req.params.updatedPhone;
    drivers[drivers.indexOf(driver)].distributionArea =
      req.params.updatedDistributionArea;

    if (driver) {
      res.json(drivers);
    } else {
      console.log(`in server get single`);
      res.sendStatus(404);
    }
  }
);

// POST - Add new driver
app.get(
  `/postDriver/:newFirstName/:newLastName/:newPhone/:newDistributionArea`,
  //http://localhost:5000/postDriver/Talya/Shaltiel/026510655/Jerusalem
  (req, res) => {
    let drivers = mockData.drivers;
    console.log(`In server add-post new id: ${drivers.length}`);
    drivers.push({
      id: drivers.length,
      firstName: req.params.newFirstName,
      lastName: req.params.newLastName,
      phone: req.params.newPhone,
      distributionArea: req.params.newDistributionArea,
    });
    // The condition
    // if (driver) {
    //   res.json(drivers);
    // } else {
    //   console.log(`in server get single`);
    //   res.sendStatus(404);
    // }
    res.json(drivers);
  }
);

// Explainations
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
