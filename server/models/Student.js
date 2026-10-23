const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },

    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      trim: true,
    },

    grade: {
      type: Number,
      required: [true, "Class is required"],
      min: 1,
      max: 10,
    },

    section: {
      type: String,
      required: [true, "Section is required"],
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },

    guardianName: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

studentSchema.index({ grade: 1, section: 1, rollNumber: 1 }, { unique: true });

module.exports = mongoose.model("Student", studentSchema);
