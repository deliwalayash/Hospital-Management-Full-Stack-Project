const express=require('express')
const router=express.Router()

const {create,view,deletedata,updatedata,viewbyid}= require('../controllers/patientControllers')
const {protect}=require('../middleware/authmiddleware')

router.post('/create',protect,create)
router.delete('/delete/:id',protect,deletedata)
router.get('/view',protect,view)
router.get('/view/:id',protect,viewbyid)
router.put('/update/:id',protect,updatedata)

module.exports = router

