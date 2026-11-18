import crypto from "crypto";
import Student from "../models/Student.js";

const hashPassword = (password, salt) => new Promise((resolve, reject) => {
  crypto.scrypt(password, salt, 64, (error, derivedKey) => error ? reject(error) : resolve(derivedKey.toString("hex")));
});

const publicStudent = student => ({
  id: student._id,
  studentName: student.studentName,
  registerNumber: student.registerNumber,
  department: student.department,
  email: student.email
});

export const signup = async (req, res) => {
  try {
    const { studentName, registerNumber, department, email, password } = req.body;
    if ([studentName, registerNumber, department, email, password].some(value => !value || !String(value).trim())) return res.status(400).json({ message: "All sign-up fields are required" });
    if (String(password).length < 6) return res.status(400).json({ message: "Password must contain at least 6 characters" });

    const salt = crypto.randomBytes(16).toString("hex");
    const student = await Student.create({ studentName, registerNumber, department, email, passwordSalt: salt, passwordHash: await hashPassword(password, salt) });
    res.status(201).json({ message: "Account created successfully", student: publicStudent(student) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "A student with this register number or email already exists" });
    res.status(400).json({ message: error.message || "Could not create account" });
  }
};

export const signin = async (req, res) => {
  try {
    const { registerNumber, password } = req.body;
    if (!registerNumber || !password) return res.status(400).json({ message: "Register number and password are required" });
    const student = await Student.findOne({ registerNumber: String(registerNumber).trim().toUpperCase() }).select("+passwordHash +passwordSalt");
    if (!student || (await hashPassword(password, student.passwordSalt)) !== student.passwordHash) return res.status(401).json({ message: "Invalid register number or password" });
    res.json({ message: "Signed in successfully", student: publicStudent(student) });
  } catch {
    res.status(500).json({ message: "Could not sign in" });
  }
};
