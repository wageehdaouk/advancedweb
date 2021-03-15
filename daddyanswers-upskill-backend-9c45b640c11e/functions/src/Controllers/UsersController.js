const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Validator = require("validatorjs");

const db = admin.firestore;

exports.createUser = async (data) => {
  var user = null;
  var errors = {};

  try {
    user = await admin.auth().createUser(data);
  } catch (e) {
    if (e.code == "auth/email-already-exists") {
      errors.email = [];
      errors.email.push("User already exists.");
    } else {
      errors.email = [];
      errors.email.push("Error please try again later.");
    }
    throw (errors)
  }

  return user;
};