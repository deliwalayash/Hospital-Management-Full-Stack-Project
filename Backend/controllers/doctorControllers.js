const Doctor = require("../models/doctorModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginDoctor = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "All fields required" })
  }

  const doctor = await Doctor.findOne({ email })
  if (!doctor) {
    return res.status(400).json({ success: false, message: "Doctor not found" })
  }

  const isMatch = await bcrypt.compare(password, doctor.password)
  if (!isMatch) {
    return res.status(400).json({ success: false, message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: doctor._id, role: "doctor" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  res.status(200).json({
    success: true,
    message: "Doctor login successful",
    token,
    doctor: {
      id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      role: "doctor"
    }
  })
}

const createDoctor = async (req, res) => {
  const { name, email, password, specialization, photo } = req.body

  if (!name || !email || !password || !specialization) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    })
  }

  const exists = await Doctor.findOne({ email })
  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Doctor already exists"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await Doctor.create({
    name,
    email,
    password: hashedPassword,
    specialization,
    photo
  })

  res.status(201).json({
    success: true,
    message: "Doctor created successfully"
  })
}

module.exports =   {createDoctor ,loginDoctor }
