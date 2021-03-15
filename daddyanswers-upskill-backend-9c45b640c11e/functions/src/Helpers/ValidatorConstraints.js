exports.createSubject = {
  name: "required|min:3",
};

exports.updateSubject = {
  uid: "required",
  name: "required|min:3",
};

exports.getSubject = {
  uid: "required",
};

exports.createInstructor = {
  firstName: "required|min:3",
  lastName: "required|min:3",
  email: "required|email",
  password: "required|min:8",
};

exports.updateInstructor = {
  uid: "required",
};

exports.createStudent = {
  firstName: "required|min:3",
  lastName: "required|min:3",
  email: "required|email",
  password: "required|min:8",
};

exports.updateStudent = {
  uid: "required",
};

exports.createCourse = {
  instructorUid: "required",
  subjectUid: "required",
  name: "required|min:3",
  price: "required",
};

exports.updateCourse = {
  uid: "required",
  instructorUid: "required",
  subjectUid: "required",
  name: "required|min:3",
  price: "required",
};

exports.getCourse = {
  uid: "required",
};
