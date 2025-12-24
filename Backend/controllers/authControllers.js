const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const signUp=async(req,res)=>{

    const {name,email,password}=req.body

    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"All field are Required"
        })

    }

    const founduser=await User.findOne({email})

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
            success:false,
            message:err.message
        })
    }
}

const login=async(req,res)=>{

    const {email,password}=req.body

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"all fields are required"
        })
    }

   try{
     const user=await User.findOne({email})

    if(!user){
        return res.status(400).json({
            success:false,
            message:"user not found "
        })
    }

    const isMatching=await bcrypt.compare(password,user.password)

    if(!isMatching){
        return res.status(400).json({
            success:false,
            message:"Password do not match"
        })
    }

    const token=jwt.sign({
        id:user._id,
        role:user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"1d"
    }
)

    res.status(200).json({
        success:true,
        message:"Login successful",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    })

   }catch(err){
    return res.status(500).json({
        success:false,
        message:err.message
    })
   }

}

module.exports ={signUp,login}