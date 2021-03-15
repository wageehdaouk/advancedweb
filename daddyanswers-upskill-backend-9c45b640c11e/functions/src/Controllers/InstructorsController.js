const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Validator = require("validatorjs");
const validatorConstraints = require("../Helpers/ValidatorConstraints");
const global = require("../Helpers/Global");
const UsersController = require("./UsersController");

const db = admin.firestore;

exports.createInstructor = functions.https.onRequest(async (req, res) => {
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

  const validation = new Validator(data, validatorConstraints.createInstructor);
  if (validation.fails()) {
    return res.status(409).json(validation.errors);
  }

  var user = null;
  var resMsg = {};
  var errors = {};

  try {
    user = await UsersController.createUser(data);
  } catch (errs) {
    errors = {...errors, ...errs};
  }

  if (Object.keys(errors).length) {
    resMsg.errors = errors;
    return res.json(resMsg);
  }

  await db()
    .collection("instructors")
    .doc(user.uid)
    .set(data);

  resMsg = `Instructor with uid: ${user.uid} created successfully.`;
  return res.json(resMsg);
});

exports.updateInstructor = functions.https.onRequest(async (req, res) => {
  const uid = req.query.uid;
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const avatar = req.query.avatar;
  const introductoryVideo = req.query.introductoryVideo;
  const biography = req.query.biography;
  var intrests = req.query.intrests;
  var achievments = req.query.achievments;
  var education = req.query.education;
  var specilizations = req.query.specilizations;
  var courses = req.query.courses;

  var data = {
    uid: uid,
    firstName: firstName,
    lastName: lastName,
    displayName: `${firstName} ${lastName}`,
    avatar: avatar,
    introductoryVideo: introductoryVideo,
    biography: biography,
    intrests: intrests,
    achievments: achievments,
    education: education,
    specilizations: specilizations,
    courses: courses,
  };

  data.intrests = data.intrests ? global.checkArrayNulls(data.intrests) : [];
  data.achievments = data.achievments ? global.checkArrayNulls(data.achievments) : [];
  data.education = data.education ? global.checkArrayNulls(data.education) : [];
  data.specilizations = data.specilizations ? global.checkArrayNulls(data.specilizations) : [];
  data.courses = data.courses ? global.checkArrayNulls(data.courses) : [];
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
      .collection("instructors")
      .doc(uid)
      .update(data);
  } catch (e) {
    return res.status(409).json(`Instructor with uid: ${uid} is not found.`);
  }

  resMsg = `Instructor uid: ${uid} is updated successfully.`;
  return res.json(resMsg);
});

exports.nGetInstructorPromise = async instructorUid => {
  var instructorRef = db()
    .collection("instructors")
    .doc(instructorUid);
  var instructorPromise = await instructorRef.get();

  return instructorPromise;
};
