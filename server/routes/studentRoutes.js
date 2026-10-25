const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const { protect, allowRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getStudents);
router.get("/:id", protect, getStudentById);

router.post("/", protect, allowRoles("administrator"), createStudent);

router.put("/:id", protect, allowRoles("administrator"), updateStudent);

router.delete("/:id", protect, allowRoles("administrator"), deleteStudent);

module.exports = router;
