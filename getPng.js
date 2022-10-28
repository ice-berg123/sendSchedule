const puppeteer = require('puppeteer');
async function getPng(number,browser){
    const page = await browser.newPage()
    try {
        await page.goto("http://127.0.0.1:3000?number="+number)
    } catch (error) {
        console.log("服务器出错啦呜呜呜")
    }
    await page.waitForSelector("body")
    let body = await page.$('body')
    await body.screenshot({
        path: "./img/"+number+".png",
        fullPage: true
      })
    await browser.close()
}
module.exports = {
    getPng
}