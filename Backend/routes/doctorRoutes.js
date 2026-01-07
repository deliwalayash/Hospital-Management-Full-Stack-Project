const express = require("express")
const router = express.Router()
const Doctor = require("../models/doctorModel")
const isDoctor=require('../middleware/doctormiddleware')
const { createDoctor,loginDoctor,getDoctorAppointments,
  updateAppointmentStatus}  = require("../controllers/doctorControllers")
const { protect } = require("../middleware/authmiddleware")
const { isAdmin } = require("../middleware/rolemiddleware")

router.post("/create", protect, isAdmin, createDoctor)
router.post("/login", loginDoctor)
router.get("/appointments", protect, isDoctor, getDoctorAppointments)
router.put(
  "/appointments/:id/status",
  protect,
  isDoctor,
  updateAppointmentStatus
);

router.get("/list", protect, async (req, res) => {
  const doctors = await Doctor.find({ isAvailable: true })
    .select("_id name specialization")

  res.json({
    success: true,
    data: doctors
  })
})



module.exports = router
