const User=require('../models/userModel')
const bcrypt=require('bcrypt')

const signUp=async(req,res)=>{

    const {name,email,password}=req.body

    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"All field are Required"
        })

    }

    const founduser=await User.findone({email})

    if(founduser){
        return res.status(400).json({
            success:false,
            message:"User Already Exists"
        })
    }
    try{
        const hashedpassword=await bcrypt.hash(password,10)
        
    const user=await User.create({
        name,
        email,
        password:hashedpassword
    })

    res.status(200).json({
        success:true,
        message:"User Created Successfully"
    })
    }
    catch(err){
        return res.status(500).json({
            succesS:false,
            message:err.message
        })
    }
}

module.exports ={signUp}