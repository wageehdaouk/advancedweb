const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Validator = require("validatorjs");
const validatorConstraints = require("../Helpers/ValidatorConstraints");
const global = require("../Helpers/Global");
const UsersController = require("./UsersController");

const db = admin.firestore;

exports.createStudent = functions.https.onRequest(async (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const email = req.query.email;
  const password = req.query.password;

  const data = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    displayName: `${firstName} ${lastName}`,
  };

  const validation = new Validator(data, validatorConstraints.createStudent);
  if (validation.fails()) {
    return res.status(409).json(validation.errors);
  }

  var user = null;
  var resMsg = {};
  var errors = {};

  try {
    user = await UsersController.createUser(data);
  } catch (errs) {
    errors = { ...errors, ...errs };
  }

  if (Object.keys(errors).length) {
    resMsg.errors = errors;
    return res.json(resMsg);
  }

  try {
    await db()
      .collection("students")
      .doc(user.uid)
      .set(data);
  } catch (e) {
    return res.status(422).json(`Error occured, please try again later`);
  }

  resMsg = `Student with uid: ${user.uid} created successfully.`;
  return res.json(resMsg);
});

exports.updateStudent = functions.https.onRequest(async (req, res) => {
  const uid = req.query.uid;
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const avatar = req.query.avatar;
  const biography = req.query.biography;
  var courses = req.query.courses;
  var intrests = req.query.intrests;

  var data = {
    uid: uid,
    firstName: firstName,
    lastName: lastName,
    displayName: `${firstName} ${lastName}`,
    avatar: avatar,
    biography: biography,
    intrests: intrests,
    courses: courses,
  };

  data.courses = data.courses ? global.checkArrayNulls(data.courses) : [];
  data.intrests = data.intrests ? global.checkArrayNulls(data.intrests) : [];
  data = global.removeNull(data);
  const validation = new Validator(data, validatorConstraints.updateStudent);
  if (validation.fails()) {
    return res.status(409).json(validation.errors);
  }

  var resMsg = {};
  var errors = {};

  if (Object.keys(errors).length) {
    resMsg.errors = errors;
    return res.json(resMsg);
  }

  try {
    await db()
      .collection("students")
      .doc(uid)
      .update(data);
  } catch (e) {
    return res.status(422).json(`Error occured, please try again later`);
  }

  resMsg = `Student uid: ${uid} is updated successfully.`;
  return res.json(resMsg);
});
