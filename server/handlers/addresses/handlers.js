const mockData = require("./../../mock-data");
// GET addresses handler
const handleGetAddresses = (req, res) => {
  res.json({ addresses: mockData.addresses });
};
// GET address by ID handler
const handleGetAddressById = (req, res) => {
  const address = mockData.addresses.find(
    (item) => item.id === Number(req.params.id)
  );

  if (address) {
    res.json(address);
  } else {
    res.sendStatus(404);
  }
};
// POST - Adding new address handler - should also have payload validation
const handlePostAddress = (req, res) => {
  let addresses = mockData.addresses;
  const data = req.body;
  addresses.push({
    id: addresses.length, //same bug as in drivers
    city: data.city,
    address: data.address,
    deliveryType: data.delivery_type,
    frequency: data.frequency,
    recipientName: data.recipient_name,
    recipientPhone: data.recipient_phone,
  });
  res.json(addresses);
};
// PUT - updating address handler
const handlePutAddress = (req, res) => {
  let addresses = mockData.addresses;
  let data = req.body;
  const address = addresses.find((item) => item.id === Number(data.id));

  if (address) {
    // address.city = data.city (should work because array.find returns an object by reference)
    addresses[addresses.indexOf(address)].city = data.city;
    addresses[addresses.indexOf(address)].address = data.address;
    addresses[addresses.indexOf(address)].deliveryType = data.delivery_type;
    addresses[addresses.indexOf(address)].frequency = data.frequency;
    addresses[addresses.indexOf(address)].recipientName = data.recipient_name;
    addresses[addresses.indexOf(address)].recipientPhone = data.recipient_phone;

    res.json(addresses);
  } else {
    res.sendStatus(404);
  }
};
// DELETE address handler
const handleDeleteAddress = (req, res) => {
  let addresses = mockData.addresses;
  const data = req.params;
  const addressToDelete = addresses.find((item) => item.id === Number(data.id));
  // validate that addressToDelete exists
  addresses.splice(addresses.indexOf(addressToDelete), 1);
  res.json(addresses);
};

module.exports = {
  handleGetAddresses,
  handleGetAddressById,
  handlePostAddress,
  handlePutAddress,
  handleDeleteAddress,
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
