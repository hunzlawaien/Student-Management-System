const firstNames = [
  "Ali",
  "Ayesha",
  "Ahmed",
  "Fatima",
  "Hassan",
  "Zainab",
  "Hamza",
  "Mariam",
  "Usman",
  "Hira",
  "Bilal",
  "Sana",
  "Saad",
  "Iqra",
  "Danish",
  "Laiba",
  "Omar",
  "Noor",
  "Talha",
  "Anaya",
  "Abdullah",
  "Eman",
  "Rayan",
  "Mehak",
  "Ibrahim",
  "Alina",
  "Huzaifa",
  "Areeba",
  "Shahzaib",
  "Mishal",
  "Ahmad",
  "Amna",
  "Farhan",
  "Zoya",
  "Taha",
  "Mahnoor",
  "Sameer",
  "Aqsa",
  "Arham",
  "Kinza",
  "Rehan",
  "Minal",
  "Yahya",
  "Dua",
  "Ammar",
  "Hafsa",
  "Adeel",
  "Rida",
  "Mustafa",
  "Saira",
];

const lastNames = [
  "Khan",
  "Ahmed",
  "Malik",
  "Raza",
  "Shah",
  "Iqbal",
  "Siddiqui",
  "Butt",
  "Qureshi",
  "Hussain",
  "Sheikh",
  "Abbasi",
  "Javed",
  "Chaudhry",
  "Baig",
  "Mirza",
  "Aslam",
  "Mehmood",
  "Akhtar",
  "Farooq",
];

const femaleNames = [
  "Ayesha",
  "Fatima",
  "Zainab",
  "Mariam",
  "Hira",
  "Sana",
  "Iqra",
  "Laiba",
  "Noor",
  "Anaya",
  "Eman",
  "Mehak",
  "Alina",
  "Areeba",
  "Mishal",
  "Amna",
  "Zoya",
  "Mahnoor",
  "Aqsa",
  "Kinza",
  "Minal",
  "Dua",
  "Hafsa",
  "Rida",
  "Saira",
];

const areas = [
  "Satellite Town, Rawalpindi",
  "Bahria Town, Rawalpindi",
  "Chaklala Scheme, Rawalpindi",
  "Westridge, Rawalpindi",
  "Gulraiz Housing Scheme, Rawalpindi",
  "Adiala Road, Rawalpindi",
  "PWD Housing Society, Islamabad",
  "Dhoke Kala Khan, Rawalpindi",
  "I-10, Islamabad",
  "G-11, Islamabad",
  "Airport Housing Society, Rawalpindi",
  "Media Town, Rawalpindi",
  "Gulshanabad, Rawalpindi",
  "F-10, Islamabad",
  "Bahria Town Phase 7, Rawalpindi",
  "Soan Garden, Islamabad",
  "Askari 14, Rawalpindi",
  "G-13, Islamabad",
  "Scheme 3, Rawalpindi",
  "E-11, Islamabad",
];

const students = [];

for (let i = 0; i < 100; i++) {
  const grade = Math.floor(i / 10) + 1;
  const section = i % 10 < 5 ? "A" : "B";
  const studentNumber = (i % 5) + 1;

  const firstName = firstNames[i % firstNames.length];
  const lastName =
    lastNames[(i * 7 + Math.floor(i / firstNames.length)) % lastNames.length];

  const name = `${firstName} ${lastName}`;
  const rollNumber = `${grade}${section}${String(studentNumber).padStart(3, "0")}`;

  const guardianFirstName = firstNames[(i + 5) % firstNames.length];

  const guardianLastName = lastNames[(i + 3) % lastNames.length];

  const month = String((i % 12) + 1).padStart(2, "0");
  const day = String((i % 27) + 1).padStart(2, "0");
  const birthYear = 2019 - (grade - 1);

  students.push({
    name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${rollNumber.toLowerCase()}@example.com`,
    phone: `0300${String(1234500 + i).padStart(7, "0")}`,
    gender: femaleNames.includes(firstName) ? "Female" : "Male",
    dateOfBirth: `${birthYear}-${month}-${day}`,
    grade,
    section,
    rollNumber,
    status: i % 7 === 0 ? "Inactive" : "Active",
    guardianName: `${guardianFirstName} ${guardianLastName}`,
    guardianPhone: `0301${String(2234500 + i).padStart(7, "0")}`,
    address: `House ${((i * 3) % 45) + 1}, Street ${((i * 5) % 10) + 1}, ${areas[i % areas.length]}`,
  });
}

export default students;
