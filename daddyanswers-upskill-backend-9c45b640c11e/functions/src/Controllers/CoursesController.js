const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Validator = require("validatorjs");
const validatorConstraints = require("../Helpers/ValidatorConstraints");
const global = require("../Helpers/Global");
const SubjectsController = require("./SubjectsController");
const InstructorsController = require("./InstructorsController");

const db = admin.firestore;

exports.createCourse = functions.https.onRequest(async (req, res) => {
  const instructorUid = req.query.instructorUid;
  const subjectUid = req.query.subjectUid;
  const name = req.query.name;
  const introductoryVideo = req.query.introductoryVideo;
  const price = req.query.price;
  var courseObjectives = req.query.courseObjectives;
  var keywords = req.query.keywords;
  const rating = 0;

  const data = {
    instructorUid: instructorUid,
    subjectUid: subjectUid,
    name: name,
    introductoryVideo: introductoryVideo,
    price: price,
    courseObjectives: courseObjectives,
    keywords: keywords,
    rating: rating,
  };

  data.courseObjectives = data.courseObjectives ? global.checkArrayNulls(data.courseObjectives) : [];
  data.keywords = data.keywords ? global.checkArrayNulls(data.keywords) : [];
  const validation = new Validator(data, validatorConstraints.createCourse);
  if (validation.fails()) {
    return res.status(409).json(validation.errors);
  }

  var course = null;
  var resMsg = {};
  var errors = {};

  if (Object.keys(errors).length) {
    resMsg.errors = errors;
    return res.json(resMsg);
  }

  const instructorPromise = await InstructorsController.nGetInstructorPromise(instructorUid);
  if (!instructorPromise.exists) {
    return res.status(409).json("Instructor is not found.");
  }

  const subjectPromise = await SubjectsController.nGetSubjectPromise(subjectUid);
  if (!subjectPromise.exists) {
    return res.status(409).json("Subject is not found.");
  }

  try {
    course = await db()
      .collection("courses")
      .add(data);
  } catch (e) {
    return res.status(422).json(`Error occured, please try again later`);
  }

  SubjectsController.nSubscribeCourse(subjectPromise.id, course.id);

  resMsg = `Course ${course.id} created successfully.`;
  return res.json(resMsg);
});

exports.updateCourse = functions.https.onRequest(async (req, res) => {
  const uid = req.query.uid;
  const instructorUid = req.query.instructorUid;
  const subjectUid = req.query.subjectUid;
  const name = req.query.name;
  const introductoryVideo = req.query.introductoryVideo;
  const price = req.query.price;
  var courseObjectives = req.query.courseObjectives;
  var keywords = req.query.keywords;
  const rating = 0;

  var data = {
    uid: uid,
    instructorUid: instructorUid,
    subjectUid: subjectUid,
    name: name,
    introductoryVideo: introductoryVideo,
    price: price,
    courseObjectives: courseObjectives,
    keywords: keywords,
    rating: rating,
  };

  data.courseObjectives = data.courseObjectives ? global.checkArrayNulls(data.courseObjectives) : [];
  data.keywords = data.keywords ? global.checkArrayNulls(data.keywords) : [];
  data = global.removeNull(data);
  const validation = new Validator(data, validatorConstraints.updateCourse);
  if (validation.fails()) {
    return res.status(409).json(validation.errors);
  }

  var resMsg = {};
  var errors = {};

  if (Object.keys(errors).length) {
    resMsg.errors = errors;
    return res.json(resMsg);
  }

  const courseRef = db()
    .collection("courses")
    .doc(uid);

  const coursePromise = await courseRef.get();
  if (!coursePromise.exists) {
    return res.status(409).json("Course is not found");
  }
  const course = coursePromise.data();

  if (instructorUid) {
    const instructorPromise = await InstructorsController.nGetInstructorPromise(instructorUid);
    if (!instructorPromise.exists) {
      return res.status(409).json("Instructor is not found.");
    }
  }

  if (subjectUid) {
    const subjectPromise = await SubjectsController.nGetSubjectPromise(subjectUid);
    if (!subjectPromise.exists) {
      return res.status(409).json("Subject is not found.");
    }

    if (course.subjectUid != subjectUid) {
      SubjectsController.nUnSubscribeCourse(course.subjectUid, course.uid);
      SubjectsController.nSubscribeCourse(subjectPromise.id, course.uid);
    }
  }

  try {
    await courseRef.set(data);
  } catch (e) {
    return res.status(422).json("Error occured, please try again later");
  }

  resMsg = `Course ${uid} is updated successfully.`;
  return res.json(resMsg);
});

exports.getCourse = functions.https.onRequest(async (req, res) => {
  const uid = req.query.uid;

  const data = {
    uid: uid,
  };

  const validation = new Validator(data, validatorConstraints.getCourse);
  if (validation.fails()) {
    return res.status(409).json(validation.errors);
  }

  const coursePromise = await this.nGetCoursePromise(uid);
  if (!coursePromise.exists) {
    return res.status(409).json("Course is not found.");
  }

  const course = coursePromise.data();

  var resMsg = {};
  resMsg.course = course;

  res.json(resMsg);
});

exports.nGetCoursePromise = async courseUid => {
  const courseRef = db()
    .collection("courses")
    .doc(courseUid);
  var coursePromise = await courseRef.get();

  return coursePromise;
};
