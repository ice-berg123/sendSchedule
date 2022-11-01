const puppeteer = require('puppeteer');
const path = require("path");
const fs = require("fs");
const weekstn = require("./tools");
const { getPng } = require('./getPng');
async function getCourse(number,style="1", method = "2", week = "0", colorSChema = "default", colorJson = "defaule") {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    const targetUrl = 'http://jwzx.cqupt.edu.cn/kebiao/kb_stu.php?xh=' + number
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
  } catch (error) {
    browser.close()
    throw "ERROR:教务在线挂掉啦,呜呜呜"
  }
  if (method === "1") {
    let CourseData = {};
    CourseData.courses = [];
    await page.waitForSelector("#zcGuolv")
    const form = await page.evaluate(() =>
      document.querySelector("form").textContent
    )
    let reg = /当前周次：第(\d)周/
    week = reg.exec(form)[1]  // 获取当前是第几周
    CourseData.week = week;
    await page.waitForSelector("#zcGuolv")
    await page.select("#zcGuolv", week)
    await page.waitForSelector(".kbTd")
    let coureseDataStr;
    let allCourseListData = await page.$$eval("#stuPanel tr", ele => ele.map(
      item => {
        if (item.innerHTML.length > 300) {
          return item.innerHTML
        }
      }
    ))
    allCourseListData = allCourseListData.filter(item => item)
    allCourseListData = allCourseListData.map(item => {
      return item.split("<td").map((item) => {
        if (item.length < 8) {
          return ""
        } else {
          return item
        }
      })
    })
    allCourseListData.map(item => {
      item.splice(0, 2)
    })
    let temCourseData = new Array();
    for (let i = 0; i < 6; i++) {
      temCourseData[i] = new Array();
      for (let j = 0; j < 7; j++) {
        temCourseData[i][j] = new Array();
      }
    }
    allCourseListData.forEach((item, index) => {
      let regCourseName = /.{8}-(.*)\<br\>/
      let regCoursePlace = /地点：(.*) /
      let regCourseWeeks = /#FF0000"\>(.*)<\/font>/
      let regCourseWhen = /\t<br\>(.*)<font/
      for (let i = 0; i < item.length; i++) {
        if (item != "") {
          item[i] = item[i].split("kbTd")
          for (let j = 0; j < item[i].length; j++) {
            if (item[i][j] != "" && j >= 1) {
              temCourseData[index][i][j - 1] = {
                "CourseName": regCourseName.exec(item[i][j])[1],
                "CoursePlace": regCoursePlace.exec(item[i][j])[1],
                "CourseWeeks": regCourseWeeks.exec(item[i][j])[1],
                "regCourseWhen": regCourseWhen.exec(item[i][j])[1]
              }
            }
          }
        }
      }
    })
    CourseData.courses = temCourseData
    for (let i = 0; i < temCourseData.length; i++) {
      for (let k = 0; k < temCourseData[i].length; k++) {

        if (temCourseData[i][k].length != 0) {
          temCourseData[i][k].map((item, index) => {
            temCourseData[i][k][index].regCourseWhen = weekstn.weekStrToNum(temCourseData[i][k][index].regCourseWhen)
          })
        }
      }
    }
    fs.writeFileSync("./courseData/"+number+".txt",JSON.stringify(CourseData))
    getPng(number,style,browser)
    browser.close()
    return CourseData
  } else if (method === "2") {
    await page.waitForSelector("#zcGuolv")
    await page.select("#zcGuolv", week)
    await page.screenshot({
      path: "./img/" + number + ".png",
      fullPage: true
    })
  } else {
    browser.close()
    throw "ERROR:错误的选项哟"
  }
  browser.close()
}
module.exports = {
  getCourse
}