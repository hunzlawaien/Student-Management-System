const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      maxlength: [100, "Student name cannot exceed 100 characters"],
    },

    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      trim: true,
      maxlength: [30, "Roll number cannot exceed 30 characters"],
    },

    grade: {
      type: Number,
      required: [true, "Class is required"],
      min: [1, "Class cannot be less than 1"],
      max: [10, "Class cannot be greater than 10"],
      validate: {
        validator: Number.isInteger,
        message: "Class must be a whole number",
      },
    },

    section: {
      type: String,
      required: [true, "Section is required"],
      trim: true,
      maxlength: [10, "Section cannot exceed 10 characters"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      maxlength: [254, "Email cannot exceed 254 characters"],
      validate: {
        validator: (value) =>
          !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Please enter a valid email address",
      },
    },

    phone: {
      type: String,
      trim: true,
      default: "",
      maxlength: [20, "Phone number cannot exceed 20 characters"],
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
      maxlength: [100, "Guardian name cannot exceed 100 characters"],
    },

    guardianPhone: {
      type: String,
      trim: true,
      default: "",
      maxlength: [20, "Guardian phone cannot exceed 20 characters"],
    },

    address: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Address cannot exceed 500 characters"],
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
