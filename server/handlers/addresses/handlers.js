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
  if (isAddressValid(data)) {
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
  } else {
    res.sendStatus(404);
  }
};
// PUT - updating address handler
const handlePutAddress = (req, res) => {
  let addresses = mockData.addresses;
  let data = req.body;
  const address = addresses.find((item) => item.id === Number(data.id));

  if (address && isAddressValid(data)) {
    // address.city = data.city (should work because array.find returns an object by reference)
    addresses[addresses.indexOf(address)].city = data.city;
    addresses[addresses.indexOf(address)].address = data.address;
    addresses[addresses.indexOf(address)].deliveryType = data.delivery_type;
    addresses[addresses.indexOf(address)].frequency = data.frequency;
    addresses[addresses.indexOf(address)].recipientName = data.recipient_name;
    addresses[addresses.indexOf(address)].recipientPhone = data.recipient_phone;
    res.json(addresses);
  } else {
    console.log("handlePutAddress is invalid ");
    res.sendStatus(404);
  }
};
// DELETE address handler
const handleDeleteAddress = (req, res) => {
  let addresses = mockData.addresses;
  const data = req.params;
  const addressToDelete = addresses.find((item) => item.id === Number(data.id));
  // validate that addressToDelete exists
  if (addressToDelete) {
    addresses.splice(addresses.indexOf(addressToDelete), 1);
    res.json(addresses);
  } else {
    res.sendStatus(404);
  }
};
// validation function can be used in post and put
const isAddressValid = (address) => {
  // return !(!address.city || !address.address || !address.delivery_type || !address.frequency || !address.recipient_name || !address.recipient_phone) === !!address.city && !!address.address...
  //const validRecipientPhone = Number(address.recipientPhone);
  const recipientPhoneToNum = parseInt(address.recipient_phone, 10);
  if (typeof address.id !== "number") {
    if (!address.city) {
      return false;
    } else if (!address.address) {
      return false;
    } else if (!address.delivery_type) {
      return false;
    } else if (!address.frequency) {
      return false;
    } else if (!address.recipient_name) {
      return false;
    } else if (!recipientPhoneToNum && isNaN(recipientPhoneToNum)) {
      return false;
    }
  } else if (isNaN(recipientPhoneToNum)) {
    return false;
  }
  return true;
};

module.exports = {
  handleGetAddresses,
  handleGetAddressById,
  handlePostAddress,
  handlePutAddress,
  handleDeleteAddress,
};
