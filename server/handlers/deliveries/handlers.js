const mockData = require("./../../mock-data");
const regexValidation = require("./../../utils/regexUtils");

// GET deliveries handler
const handleGetDeliveries = (req, res) => {
  res.json({ deliveries: mockData.deliveryAddresses });
};
// GET delivery by ID handler
const handleGetDeliveryById = (req, res) => {
  const delivery = mockData.deliveryAddresses.find(
    (item) => item.id === Number(req.params.id)
  );

  if (delivery) {
    res.json(delivery);
  } else {
    res.sendStatus(404);
  }
};
// PUT - updating delivery handler
const handlePutDelivery = (req, res) => {
  let deliveries = mockData.deliveryAddresses;
  let data = req.body;
  const delivery = deliveries.find((item) => item.id === Number(data.id));
  if (deliveries && isDeliveryValid(data)) {
    delivery.city = data.city;
    delivery.address = data.address;
    delivery.deliveryType = data.delivery_type;
    delivery.frequency = data.frequency;
    delivery.recipientName = data.recipient_name;
    delivery.recipientPhone = data.recipient_phone;
    delivery.done = data.done;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};
// DELETE delivery handler
const handleDeleteDelivery = (req, res) => {
  let deliveries = mockData.deliveryAddresses;
  const data = req.params;
  const deliveryToDelete = deliveries.find(
    (item) => item.id === Number(data.id)
  );
  // validate that deliveryToDelete exists
  if (deliveryToDelete) {
    deliveries.splice(deliveries.indexOf(deliveryToDelete), 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

// CHECK delivery handler (Very similiar to delete...)
const handleCheckDelivery = (req, res) => {
  let deliveries = mockData.deliveryAddresses;
  const data = req.params;
  const deliveryToCheck = deliveries.find(
    (item) => item.id === Number(data.id)
  );
  // validate that addressToDelete exists
  if (deliveryToCheck) {
    deliveries.splice(deliveries.indexOf(deliveryToCheck), 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

// validation function can be used in post and put
const isDeliveryValid = (delivery) => {
  // return !(!address.city || !address.address || ... === !!address.city && !!address.address...
  const validPhone = regexValidation.validPhoneRegex;
  const validName = regexValidation.validNameRegex;
  if (!delivery.city) {
    return false;
  } else if (!delivery.address) {
    return false;
  } else if (!delivery.delivery_type) {
    return false;
  } else if (!delivery.frequency) {
    return false;
  } else if (!validName.test(delivery.recipient_name)) {
    return false;
  } else if (!validPhone.test(delivery.recipient_phone)) {
    return false;
  } else if (!delivery.done) {
    return false;
  }

  console.log("Delivery is valid");
  return true;
};

module.exports = {
  handleGetDeliveries,
  handleGetDeliveryById,
  handlePutDelivery,
  handleDeleteDelivery,
  handleCheckDelivery,
};
