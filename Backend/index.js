const PORT=4000
const express=require('express')
const app=express()
const cors=require('cors')
app.use(cors())
const connetDB=require('./config/connectDB')
app.use(express.json())
const authRoutes=require('./routes/authRoutes')
const dotenv=require('dotenv')
dotenv.config()


const routes=require('./routes/patientRoutes')

connetDB()

app.use('/api/auth',authRoutes)

app.use('/api',routes)

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(PORT,()=>{
    console.log(`Port is listening to ${PORT}`)
})