const mongoose = require("mongoose");
const Student = require("../models/Student");

const allowedFields = [
  "name",
  "rollNumber",
  "grade",
  "section",
  "email",
  "phone",
  "gender",
  "dateOfBirth",
  "guardianName",
  "guardianPhone",
  "address",
  "status",
];

function validateStudentData(data, isUpdate = false) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return "Request body must be a valid object";
  }

  const fields = Object.keys(data);

  if (fields.length === 0) {
    return "Please provide student data";
  }

  const unexpectedFields = fields.filter(
    (field) => !allowedFields.includes(field),
  );

  if (unexpectedFields.length > 0) {
    return `Unexpected field(s): ${unexpectedFields.join(", ")}`;
  }

  if (!isUpdate) {
    const requiredFields = ["name", "rollNumber", "grade", "section"];

    const missingFields = requiredFields.filter(
      (field) =>
        data[field] === undefined ||
        data[field] === null ||
        String(data[field]).trim() === "",
    );

    if (missingFields.length > 0) {
      return `Required fields missing: ${missingFields.join(", ")}`;
    }
  }

  return null;
}

async function getStudents(req, res) {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.status(200).json(students);
  } catch (error) {
    console.error("Get students error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch students",
    });
  }
}

async function getStudentById(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json(student);
  } catch (error) {
    console.error("Get student error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch student",
    });
  }
}

async function createStudent(req, res) {
  const validationError = validateStudentData(req.body);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const student = await Student.create(req.body);
    return res.status(201).json(student);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This roll number already exists in this class and section",
      });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: error.message });
    }

    console.error("Create student error:", error.message);
    return res.status(500).json({
      message: "Failed to create student",
    });
  }
}

async function updateStudent(req, res) {
  const validationError = validateStudentData(req.body, true);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json(student);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This roll number already exists in this class and section",
      });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: error.message });
    }

    console.error("Update student error:", error.message);
    return res.status(500).json({
      message: "Failed to update student",
    });
  }
}

async function deleteStudent(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete student error:", error.message);
    return res.status(500).json({
      message: "Failed to delete student",
    });
  }
}

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
