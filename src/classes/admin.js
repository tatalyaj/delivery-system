// ADDRESSSES
const addresses = [
  {
    id: 0,
    city: "Jerusalem",
    address: "King george 22",
    deliveryType: "medicine",
    frequency: 0,
    recipientName: "John",
    recipientPhone: "0528736440",
  },
  {
    id: 1,
    city: "Haifa",
    address: "Bar gyora 10",
    deliveryType: "medicine",
    frequency: 0,
    recipientName: "James",
    recipientPhone: "0503827110",
  },
  {
    id: 2,
    city: "Tel-Aviv",
    address: "Shenkin 20",
    deliveryType: "medicine",
    frequency: 0,
    recipientName: "Sarah",
    recipientPhone: "0507231009",
  },
  {
    id: 3,
    city: "Eilat",
    address: "Hanachal 12",
    deliveryType: "medicine",
    frequency: 0,
    recipientName: "Josh",
    recipientPhone: "026745899",
  },
  {
    id: 4,
    city: "Ra'anana",
    address: "Haneviim 3",
    deliveryType: "food",
    frequency: 0,
    recipientName: "Julian",
    recipientPhone: "0507837664",
  },
  {
    id: 5,
    city: "Zichron",
    address: "Neve 15",
    deliveryType: "food",
    frequency: 0,
    recipientName: "Natasha",
    recipientPhone: "0523478660",
  },
  {
    id: 6,
    city: "Tiberia",
    address: "Kineret 6",
    deliveryType: "food",
    frequency: 0,
    recipientName: "Ron",
    recipientPhone: "0504323119",
  },
];
export default class Admin {
  //constructor() {}

  getAddresses() {
    return addresses;
  }

  editAddress(
    id,
    updatedCity,
    updatedAddress,
    updatedDeliveryType,
    updatedFrequency,
    updatedRecipientName,
    updatedRecipientPhone
  ) {
    //console.log(id);
    //console.log(newAddress);
    const item = addresses.find((i) => i?.id === id);
    addresses[addresses.indexOf(item)].city = updatedCity;
    addresses[addresses.indexOf(item)].address = updatedAddress;
    addresses[addresses.indexOf(item)].deliveryType = updatedDeliveryType;
    addresses[addresses.indexOf(item)].frequency = updatedFrequency;
    addresses[addresses.indexOf(item)].recipientName = updatedRecipientName;
    addresses[addresses.indexOf(item)].recipientPhone = updatedRecipientPhone;
  }

  addAddress(
    newCity,
    newAddress,
    newDeliveryType,
    newFrequency,
    newRecipientName,
    newRecipientPhone
  ) {
    addresses.push({
      id: addresses.length,
      city: newCity,
      address: newAddress,
      deliveryType: newDeliveryType,
      frequency: newFrequency,
      recipientName: newRecipientName,
      recipientPhone: newRecipientPhone,
    });
  }

  deleteAddress(id) {
    const item = addresses.find((i) => i.id === id);
    addresses.splice(addresses.indexOf(item), 1);
  }
}
