const express=require('express')
const router=express.Router()

const {create,view,deletedata,updatedata}= require('../controllers/patientControllers')

router.post('/create',create)
router.delete('/delete/:id',deletedata)
router.get('/view',view)
router.put('/update/:id',updatedata)

module.exports = router

