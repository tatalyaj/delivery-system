const generateUUID = (array) => {
  if (array === null) {
    throw new Error("Empty array, unable to generate UUID");
  }
  let newId = 0;

  for (let item of array) {
    if (item.id > newId) {
      newId = item.id;
    }
  }

  return newId + 1;
};

module.exports = { generateUUID };
