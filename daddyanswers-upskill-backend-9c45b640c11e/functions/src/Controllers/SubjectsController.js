const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Validator = require("validatorjs");
const validatorConstraints = require("../Helpers/ValidatorConstraints");
const global = require("../Helpers/Global");
const CoursesController = require("./CoursesController");

const db = admin.firestore;

exports.createSubject = functions.https.onRequest(async (req, res) => {
  const name = req.query.name;
  const image = req.query.image;
  var courses = req.query.courses;


  const data = {
    name: name,
    image: image,
    courses: courses,
  };

  const validation = new Validator(data, validatorConstraints.createSubject);
  if (validation.fails()) {
    return res.status(409).json(validation.errors);
  }

  // TODO: add try catch
  const subject = await db()
    .collection("subjects")
    .add(data);
  res.json({ result: `Subject with ID: ${subject.id} added.` });
});

exports.updateSubject = functions.https.onRequest(async (req, res) => {
  const uid = req.query.uid;
  const name = req.query.name;
  const image = req.query.image;
  var courses = req.query.courses;


  const data = {
    uid: uid,
    name: name,
    image: image,
    courses: courses,
  };

  const validation = new Validator(data, validatorConstraints.updateSubject);
  if (validation.fails()) {
    return res.status(409).json(validation.errors);
  }

  const subjectRef = db()
    .collection("subjects")
    .doc(uid);

  const subjectPromise = await subjectRef.get();
  if (!subjectPromise.exists) {
    return res.status(409).json("Subject is not found.");
  }

  delete data.uid;
  await subjectRef.set(data);

  res.json({ result: `Subject ${uid} is updated successfully.` });
});

exports.getSubjects = functions.https.onRequest(async (req, res) => {
  var subjects = [];

  const subjectsRef = db().collection("subjects");
  const subjectsPromise = await subjectsRef.get();
  subjectsPromise.forEach(subject => {
    var subjectData = subject.data();
    subjects.push({ name: subjectData.name, image: subjectData.image });
  });

  var resMsg = {};
  resMsg.subjects = subjects;

  res.json(resMsg);
});

exports.getSubject = functions.https.onRequest(async (req, res) => {
  const uid = req.query.uid;

  const data = {
    uid: uid,
  };

  const validation = new Validator(data, validatorConstraints.getSubject);
  if (validation.fails()) {
    return res.status(409).json(validation.errors);
  }

  const subjectPromise = await this.nGetSubjectPromise(uid);
  if (!subjectPromise.exists) {
    return res.status(409).json("Subject is not found.");
  }

  const subject = subjectPromise.data();

  var courses = [];
  if (subject.courses && subject.courses.length > 0) {
    await Promise.all(
      subject.courses.map(async courseUid => {
        var coursePromise = await CoursesController.nGetCoursePromise(courseUid);
        var courseData = coursePromise.data();
        courses.push(courseData);
      })
    );
  }

  var resMsg = {};
  resMsg.subject = subject;
  resMsg.subject.courses = courses;

  res.json(resMsg);
});

exports.nGetSubjectPromise = async subjectUid => {
  var subjectRef = db()
    .collection("subjects")
    .doc(subjectUid);
  var subject = await subjectRef.get();

  return subject;
};

exports.nSubscribeCourse = async (subjectUid, courseUid) => {
  var subjectRef = db()
    .collection("subjects")
    .doc(subjectUid);
  const subjectPromise = await subjectRef.get();
  const subject = subjectPromise.data();
  const previousCourses = Object.values(subject.courses);

  await subjectRef.update({
    courses: [...previousCourses, courseUid],
  });
};

exports.nUnSubscribeCourse = async (subjectUid, courseUid) => {
  var subjectRef = db()
    .collection("subjects")
    .doc(subjectUid);
  const subjectPromise = await subjectRef.get();
  const subject = subjectPromise.data();
  const previousCourses = Object.values(subject.courses);
  const coursesFiltered = global.removeElement(previousCourses, courseUid);

  await subjectRef.update({
    courses: coursesFiltered,
  });
};
