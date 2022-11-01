const { createClient,segment } = require("oicq")
const ordeCli = require("./qqRobot/ordeCli")
const getData = require("./getData")
const fs = require("fs")
const puppeteer = require('puppeteer');
const { get } = require("http")
const { getPng } = require("./getPng")
const client = createClient(489567802)
let message = []
let orderOption
client.on("system.online", () => console.log("Logged in!"))
client.on("message", e => {
  (async ()=>{
    try {
      orderOption =  await ordeCli.robotCli(e.toString())
    } catch (error) {
      e.reply(error)
      return
    }
    if(orderOption.method === "1"){ 
        try {
          await getData.getCourse(orderOption.number,orderOption.style,orderOption.method,orderOption.week)
        } catch (error) {
          e.reply(error)
          return
        }
    }else{
      try {
        await getData.getCourse(orderOption.number,orderOption.style,orderOption.method,orderOption.week)
      } catch (error) {
        e.reply(error)
      }
    }
    try{
      console.log("./img/"+orderOption.number+".png")
      let res = fs.statSync("./img/"+orderOption.number+".png")
      message =[segment.image("./img/"+orderOption.number+".png")]
    }catch(error){
      e.reply("呜呜呜呜，没有找到课表捏")
    }
    e.reply(message) 
  })()
})

client.on("system.login.qrcode", function (e) {
  //扫码后按回车登录
  process.stdin.once("data", () => {
    this.login()
  })
}).login()