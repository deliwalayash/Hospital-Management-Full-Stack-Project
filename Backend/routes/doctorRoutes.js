const express = require("express")
const router = express.Router()

const { createDoctor,loginDoctor}  = require("../controllers/doctorControllers")
const { protect } = require("../middleware/authmiddleware")
const { isAdmin } = require("../middleware/rolemiddleware")

router.post("/create", protect, isAdmin, createDoctor)
router.post("/login", loginDoctor)


module.exports = router
