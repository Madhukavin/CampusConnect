import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true, maxlength: 100 },
    registerNumber: { type: String, required: true, trim: true, uppercase: true, maxlength: 50, unique: true },
    department: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, match: /.+@.+\..+/ },
    passwordHash: { type: String, required: true, select: false },
    passwordSalt: { type: String, required: true, select: false }
  },
  { timestamps: true }
);

export default mongoose.model("Student", schema);
