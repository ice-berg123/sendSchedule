const { createClient,segment } = require("oicq")
const ordeCli = require("./qqRobot/ordeCli")
const getData = require("./getData")
const fs = require("fs")
const client = createClient(489567802)
client.on("system.online", () => console.log("Logged in!"))
client.on("message", e => {
  (async ()=>{
    let orderOption =  ordeCli.robotCli(e.toString())
    console.log(orderOption)
    if(orderOption.method == 1){ 
      try {
        let res = fs.statSync("./courseData/"+orderOption.number+".txt")
      } catch (error) {
        getData.getCourse(orderOption.number,orderOption.method,orderOption.week)
      }
    }else{
      getData.getCourse(orderOption.number,orderOption.method,orderOption.week)
    }
    const message =[segment.image("./img/"+orderOption.number+".png")]
    e.reply("hello world") 
  })()
})

client.on("system.login.qrcode", function (e) {
  //扫码后按回车登录
  process.stdin.once("data", () => {
    this.login()
  })
}).login()