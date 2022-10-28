
(async () => {
    let courseData = await fetch("http://127.0.0.1:3000/getCourseData" + window.location.search)
    courseData = await courseData.json()
    rendering(courseData)

})()
function rendering(data) {
    let numWeekToChinese = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十"]
    let weekNum = document.querySelector("#weekNum")
    weekNum.textContent = "第" + numWeekToChinese[data.week] + "周"
    setDate()
    renderCourse(data.courses, Number(data.week))
}
function setDate() {
    let wDay = document.querySelectorAll(".wDay")
    let time = new Date()
    time.setDate(time.getDate() - time.getDay() + 1)
    for (let i = 0; i < wDay.length; i++) {
        wDay[i].innerHTML = time.getDate() + "日"
        time.setDate(time.getDate() + 1)
    }
}
function renderCourse(data, week) {
    let classItem = document.querySelectorAll(".classItem")
    let itemHeigth = classItem[0].clientHeight / 12;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            for (let k = 0; k < data[i][j].length; k++) {
                let tempdata = data[i][j][k]
                console.log(tempdata, tempdata.regCourseWhen.includes(week), week);
                if (tempdata.regCourseWhen.includes(week)) {
                    let tempClassItem = document.createElement("div")
                    tempClassItem.classList.add("courseItem")
                    tempClassItem.style.height = getHeightN(tempdata.CourseWeeks) * itemHeigth + "px"
                    tempClassItem.style.top = i * 2 * itemHeigth + "px"
                    let tempcourseItemSpan1 = document.createElement("span")
                    let tempcourseItemSpan2 = document.createElement("span")
                    tempcourseItemSpan1.innerHTML = tempdata.CourseName;
                    tempcourseItemSpan2.innerHTML = tempdata.CoursePlace;
                    tempcourseItemSpan1.classList.add("courseItemSpan")
                    tempcourseItemSpan2.classList.add("courseItemSpan")
                    classItem[j].appendChild(tempClassItem)
                    tempClassItem.appendChild(tempcourseItemSpan1)
                    tempClassItem.appendChild(tempcourseItemSpan2)
                }
            }
        }
    }
}
function getHeightN(data) {
    if (data == "4节连上") {
        return 4;
    }
    if (data == "3节连上") {
        return 3
    }
    return 2;
}
