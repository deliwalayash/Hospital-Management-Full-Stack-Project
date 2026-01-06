const mongoose=require('mongoose')

const connetDB=async()=>{

    try{
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("Mongodb Connected Successfully")
    }catch(err){

        console.log(err.message)
    }

}

module.exports = connetDB