const puppeteer = require('puppeteer');
async function getPng(number,style){
    let browser =await puppeteer.launch()
    let page = await browser.newPage()
    try {
        await page.goto("http://127.0.0.1:3000?number="+number+"&style="+style)
    } catch (error) {
        console.log("服务器出错啦呜呜呜")
        console.log(error)
    }
    await page.waitForSelector("body")
    await page.setViewport({
        width:600,
        height:900
    })
    await page.screenshot({
        path: "./img/"+number+".png",
        fullPage: true
      })
    await browser.close()
    return 
}
module.exports = {
    getPng
}