const mongoose=require('mongoose')

const connetDB=async()=>{

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/hospital');
        console.log("Mongodb Connected Successfully")
    }catch(err){

        console.log(err.message)
    }

}

module.exports = connetDB