const Patient = require('../models/patientModel')
const Doctor = require('../models/doctorModel')

/**
 * CREATE APPOINTMENT (Patient)
 */
const create = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      mobileNumber,
      appointmentDate,
      doctorId
    } = req.body

    // 1️⃣ basic validation
    if (
      !name ||
      !age ||
      !gender ||
      !mobileNumber ||
      !appointmentDate ||
      !doctorId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    // 2️⃣ mobile validation
    if (mobileNumber.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be 10 digits"
      })
    }

    // 3️⃣ check doctor exists
    const doctorExists = await Doctor.findById(doctorId)
    if (!doctorExists) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      })
    }

    // 4️⃣ create appointment
    await Patient.create({
      name,
      age,
      gender,
      mobileNumber,
      appointmentDate,
      user: req.user.id,     // patient (JWT)
      doctor: doctorId       // selected doctor
    })

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully"
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * VIEW APPOINTMENTS (Patient)
 */
const view = async (req, res) => {
  try {
    const appointments = await Patient.find({
      user: req.user.id
    })
      .populate("doctor", "name specialization")
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

/**
 * VIEW SINGLE APPOINTMENT
 */
const viewbyid = async (req, res) => {
  try {
    const appointment = await Patient.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate("doctor", "name specialization")

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      })
    }

    res.status(200).json({
      success: true,
      data: appointment
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid ID"
    })
  }
}

/**
 * UPDATE APPOINTMENT (Patient)
 */
const updatedata = async (req, res) => {
  try {
    const updatedAppointment = await Patient.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    )

    if (!updatedAppointment) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this appointment"
      })
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully"
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * DELETE APPOINTMENT (Patient)
 */
const deletedata = async (req, res) => {
  try {
    const appointment = await Patient.findOne({
      _id: req.params.id,
      user: req.user.id
    })

    if (!appointment) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this appointment"
      })
    }

    await appointment.deleteOne()

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully"
    })

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = {
  create,
  view,
  viewbyid,
  updatedata,
  deletedata
}
