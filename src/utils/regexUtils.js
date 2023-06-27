const validPhoneRegex =
  /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;

const validNameRegex = /^[a-zA-Z ]{2,40}$/;

module.exports = { validPhoneRegex, validNameRegex };
