const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")
let app = express()
app.use(cors())
app.use(express.json())
app.post("/getColorConfig",function(req,res){
    let data = req.body
    console.log(data)
    if(data.default == true){
        let configData = fs.readFileSync(path.resolve(__dirname,"../colorConfig","default.json"))
        let initData = JSON.parse(configData.toString())
        let resData = {state:"successed",message:initData}
        res.json(JSON.stringify(resData))
    }else{
        let statExist = fs.statSync(path.resolve(__dirname,"../colorConfig",data.qq+".json"))
        let configData = fs.readFileSync(path.resolve(__dirname,"../colorConfig",data.qq+".json"))
        let initData = JSON.parse(configData.toString())
        let resData = {state:"successed",message:initData}
        res.json(JSON.stringify(resData))
    }
})
app.post("/setColorConfig",function(req,res){
    let data = req.body
    console.log(data)
    let stat = fs.writeFileSync(path.resolve(__dirname,"../colorConfig",data.qq+".json"),JSON.stringify(data.Colorconfig))
    
})
app.use((err,req,res,next)=>{
    let resData = {
        state:"failed",
        message:"呜呜呜，你还没有配置过自己滴配色方案噢"
    }
    res.json(JSON.stringify(resData))
})
app.listen(3001,()=>{
    console.log('service start');
})