const mockData = require("./mock-data");
//FOURTH TRY
const express = require("express"); //Line 1
const cors = require("cors");
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

app.use(cors({ origin: "http://localhost:3000" }));
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get("/drivers", (req, res) => {
  res.json({ drivers: mockData.drivers });
  // res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
}); //Line 11

app.get("/drivers/:id", (req, res) => {
  const driver = mockData.drivers.find(
    (item) => item.id === Number(req.params.id)
  );

  if (driver) {
    res.json(driver);
  } else {
    res.sendStatus(404);
  }
});

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
