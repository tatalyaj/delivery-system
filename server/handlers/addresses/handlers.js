const mockData = require("./../../mock-data");
const regexValidation = require("./../../utils/regexUtils");
const validation = require("./../../utils/validations");

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
    let newId;
    try {
      newId = validation.generateUUID(addresses);
    } catch (e) {
      res.sendStatus(500);
      return;
    }
    addresses.push({
      id: newId,
      city: data.city,
      address: data.address,
      deliveryType: data.delivery_type,
      frequency: data.frequency,
      recipientName: data.recipient_name,
      recipientPhone: data.recipient_phone,
    });
    // res.json(addresses); // successful operation (POST, PUT, DELETE) should return only status code (20X)
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};
// PUT - updating address handler
const handlePutAddress = (req, res) => {
  let addresses = mockData.addresses;
  let data = req.body;
  const address = addresses.find((item) => item.id === Number(data.id));
  //console.log(address);
  if (address && isAddressValid(data)) {
    // address.city = data.city (should work because array.find returns an object by reference)
    // addresses[addresses.indexOf(address)].city = data.city;
    address.city = data.city;
    address.address = data.address;
    address.deliveryType = data.delivery_type;
    address.frequency = data.frequency;
    address.recipientName = data.recipient_name;
    address.recipientPhone = data.recipient_phone;
    res.sendStatus(200);
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
  if (addressToDelete) {
    addresses.splice(addresses.indexOf(addressToDelete), 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

// validation function can be used in post and put
const isAddressValid = (address) => {
  // return !(!address.city || !address.address || ... === !!address.city && !!address.address...
  const validPhone = regexValidation.validPhoneRegex;
  const validName = regexValidation.validNameRegex;
  if (!address.city) {
    return false;
  } else if (!address.address) {
    return false;
  } else if (!address.delivery_type) {
    return false;
  } else if (!address.frequency) {
    return false;
  } else if (!validName.test(address.recipient_name)) {
    return false;
  } else if (!validPhone.test(address.recipient_phone)) {
    return false;
  }

  console.log("Address is valid");
  return true;
};

module.exports = {
  handleGetAddresses,
  handleGetAddressById,
  handlePostAddress,
  handlePutAddress,
  handleDeleteAddress,
};

// FORMER VALIDATION FUNC
// // validation function can be used in post and put
// const isAddressValid = (address) => {
//   // return !(!address.city || !address.address || ... === !!address.city && !!address.address...
//   const recipientPhoneToNum = Number(address.recipient_phone);
//   if (typeof address.id !== "number") {
//     if (!address.city) {
//       return false;
//     } else if (!address.address) {
//       return false;
//     } else if (!address.delivery_type) {
//       return false;
//     } else if (!address.frequency) {
//       return false;
//     } else if (!address.recipient_name) {
//       return false;
//     } else if (!recipientPhoneToNum && isNaN(recipientPhoneToNum)) {
//       return false;
//     }
//   } else if (isNaN(recipientPhoneToNum)) {
//     return false;
//   }
//   return true;
// };
