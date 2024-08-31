const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express()
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/Students')

const db = mongoose.connection
db.once('open',()=>{
    console.log("Successful")
})

const userSchema= new mongoose.Schema({
    namee:String,
    number:String,
    phone:String,
    email:String
})

const Users = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'contact.html'))
})

app.post('/post',async(req,res)=>{
    const{namee,number,phone,email}=req.body
    const user=new Users({
        namee,
        number,
        phone,
        email
    })
    await user.save()
    console.log(user)
    res.send("submitted successfully")

})
app.listen(port,()=>{
    console.log("Server Started")
})