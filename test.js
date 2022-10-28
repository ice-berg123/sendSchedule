const fs = require("fs")
try {
    let n = fs.statSync("index.js")
    console.log(555)
} catch (error) {
    console.log(111)
}