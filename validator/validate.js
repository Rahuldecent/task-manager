const mongoose = require("mongoose");

exports.isValid = function (value) {
  if (typeof value === "undefined" || value === "null") return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

exports.isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length === 0;
};

exports.isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};

// Function to validate an email address
exports.validateEmail = function(email) {
const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  return emailRegex.test(email);
};


