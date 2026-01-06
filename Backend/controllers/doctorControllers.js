const Doctor = require("../models/doctorModel")
const Patient=require("../models/patientModel")
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
const getDoctorAppointments = async (req, res) => {
  try {
    // req.user.id comes from JWT (doctor login)
    const appointments = await Patient.find({
      doctor: req.user.id
    })
      .populate("user", "name email")
      .sort({ appointmentDate: 1 })

    res.status(200).json({
      success: true,
      data: appointments
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["approved", "rejected", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const appointment = await Patient.findOne({
      _id: id,
      doctor: req.user.id   // 🔐 ensures doctor owns appointment
    });

    if (!appointment) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment status updated"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports =   {createDoctor ,loginDoctor,getDoctorAppointments,
  updateAppointmentStatus}
