const Patient = require('../models/patientModel')

const create = async (req, res) => {
    const { name, age, doctorname, gender, mobileNumber, appointmentDate } = req.body

    if (!name || !age || !doctorname || !gender || !mobileNumber || !appointmentDate) {
        return res.status(400).json({
            success: false,
            message: "All field Must Required"
        })
    }

    if (mobileNumber.length < 10) {
        return res.status(400).json({
            success: false,
            message: "Mobile number must be 10 digit"
        })
    }
    try {
        const foundPatient = await Patient.findOne({ mobileNumber })

        if (foundPatient) {
            return res.status(400).json({
                success: false,
                message: "Patient Already Exist with same Mobile Number"
            })
        }

        await Patient.create({ name, age, doctorname, gender, mobileNumber, appointmentDate,user:req.user.id })
        res.status(200).json({
            success: true,
            message: "Patient created successfully",
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })

    }
}

const view = async (req, res) => {
    try {
        const details = await Patient.find({user:req.user.id})
        res.status(200).json({
            success: true,
            message: "Details Fetched",
            data: details
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deletedata = async (req, res) => {
    const { id } = req.params
    try {

        const foundPatient = await Patient.findOne({_id:id,user:req.user.id})
        if (!foundPatient) {
            return res.status(400).json({
                success: false,
                message: "Invalid id"
            })
        }

        await foundPatient.deleteOne()
        res.status(200).json({
            success: true,
            message: "Data deleted Successfully"
        })


    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })

    }
}

const updatedata = async (req, res) => {
  const { id } = req.params

  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { _id: id, user: req.user.id },   // 🔐 ownership check
      req.body,
      { new: true }
    )

    if (!updatedPatient) {
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


const viewbyid = async (req, res) => {
    try {
        const { id } = req.params

        const foundUser = await Patient.findById(id)

        if (!foundUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            data: foundUser
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Invalid ID"
        })
    }
}



module.exports = { create, view, deletedata, updatedata, viewbyid }