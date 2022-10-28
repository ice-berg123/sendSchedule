
function weekStrToNum(str) {
    let reg1 = /(\d*)-(\d*)/
    let reg2 = /,/
    let reg3 = /单/
    let reg4 = /双/
    let reg5 = new RegExp("周", "g")
    let res = []
    let newItem = str.replace(reg5, "")
    if (reg2.test(newItem)) {
        temp = newItem.split(",")
        res = temp.map(item => Number(item))
    } else if (reg1.test(newItem)) {
        let temp = reg1.exec(newItem).slice(1, 3)
        if (reg3.test(newItem)) {
            for (let d = Number(temp[0]); d <= Number(temp[1]); d++) {
                if (d % 2 == 1) {
                    res.push(d);
                }
            }
        } else if (reg4.test(newItem)) {
            for (let d = Number(temp[0]); d <= Number(temp[1]); d++) {
                if (d % 2 == 0) {
                    res.push(d);
                }
            }
        } else {
            for (let d = Number(temp[0]); d <= Number(temp[1]); d++) {
                res.push(d);
            }
        }
    } else {
        res.push(Number(newItem))
    }
    return res
}
module.exports = {
    weekStrToNum
}