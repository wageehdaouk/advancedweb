const admin = require("firebase-admin");
admin.initializeApp();

const InstructorController = require("./src/Controllers/InstructorsController");
const StudentController = require("./src/Controllers/StudentsController");
const SubjectsController = require("./src/Controllers/SubjectsController");
const CoursesController = require("./src/Controllers/CoursesController");

// Instructors Controller
exports.createInstructor = InstructorController.createInstructor;
exports.updateInstructor = InstructorController.updateInstructor;

// Students Controller
exports.createStudent = StudentController.createStudent;
exports.updateStudent = StudentController.updateStudent;

// Subjects Controller
exports.createSubject = SubjectsController.createSubject;
exports.updateSubject = SubjectsController.updateSubject;
exports.getSubjects = SubjectsController.getSubjects;
exports.getSubject = SubjectsController.getSubject;

// Courses Controller
exports.createCourse = CoursesController.createCourse;
exports.updateCourse = CoursesController.updateCourse;
exports.getCourse = CoursesController.getCourse;
