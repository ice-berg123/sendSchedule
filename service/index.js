const express = require("express")
const fs = require("fs")
const path = require("path")
const cors = require("cors");

const app = express()
app.use(cors());
app.use(express.json())
app.use(express.static("../view"))
app.get("/getCourseData",function(req,res){
    let number = req.query.number
    
    let courseData = JSON.parse(fs.readFileSync("../courseData/"+String(number)+".txt").toString())
    res.send(courseData)
})

app.listen(3000,()=>{
    console.log('service start');
})