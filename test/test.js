const path = require("path")
let data = {}
data.qq = 123456789
console.log(path.resolve(__dirname,"../colorConfig",data.qq+".json"));