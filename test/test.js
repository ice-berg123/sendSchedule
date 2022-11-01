const puppeteer = require('puppeteer');
(async ()=>{
    const number = "2020212465";
    const targetUrl = 'http://jwzx.cqupt.edu.cn/kebiao/kb_stu.php?xh=' + number
    const browser =await puppeteer.launch({
        headless:false,
        slowMo:100
    })
    const page = await browser.newPage()
    await page.goto(targetUrl)
    if(page.url != targetUrl){
        await page.waitForNavigation();
        await page.waitForSelector("#username")
        await page.evaluate(()=>{
            document.querySelector("#username").value = "1669570"
            document.querySelector("#password").value = "Qaz!359893623"
            document.querySelector("#rememberMe").click()
            document.querySelector("#login_submit").click()
        })
        await page.waitForNavigation();
    }
    browser.close()
})()