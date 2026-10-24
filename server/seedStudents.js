require("dotenv").config();
const mongoose = require("mongoose");
const Student = require("./models/Student");

const firstNames = [
  "Ali",
  "Sara",
  "Usman",
  "Ayesha",
  "Hamza",
  "Hira",
  "Ahmed",
  "Fatima",
  "Bilal",
  "Zainab",
  "Hassan",
  "Maryam",
  "Saad",
  "Noor",
  "Ibrahim",
  "Eman",
  "Daniyal",
  "Maham",
  "Omar",
  "Laiba",
];

const lastNames = [
  "Khan",
  "Ahmed",
  "Malik",
  "Shah",
  "Raza",
  "Iqbal",
  "Siddiqui",
  "Butt",
  "Qureshi",
  "Hussain",
];

const sections = ["A", "B", "C"];

function createEmailName(name) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, ".");
}

async function seedStudents() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    // Remove existing student records before inserting demo data.
    const result = await Student.deleteMany({});
    console.log(`Deleted ${result.deletedCount} existing students.`);

    const emailCounts = new Map();
    const students = [];

    for (let grade = 1; grade <= 10; grade++) {
      for (let i = 1; i <= 10; i++) {
        const firstName = firstNames[(grade * 3 + i - 1) % firstNames.length];

        const lastName = lastNames[(grade + i - 2) % lastNames.length];

        const name = `${firstName} ${lastName}`;
        const emailName = createEmailName(name);

        const count = (emailCounts.get(emailName) || 0) + 1;
        emailCounts.set(emailName, count);

        const uniqueEmailName =
          count === 1 ? emailName : `${emailName}${count}`;

        const section = sections[(i - 1) % sections.length];
        const rollNumber = `${grade}${section}${String(i).padStart(3, "0")}`;

        students.push({
          name,
          email: `${uniqueEmailName}@school.com`,
          rollNumber,
          grade,
          section,
          status: (grade + i) % 7 === 0 ? "Inactive" : "Active",
        });
      }
    }

    await Student.insertMany(students);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedStudents();
