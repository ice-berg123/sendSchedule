function orderDeal(str) {
    return str.split(" ").filter(item => item)
}
function robotCli(data) {
    return new Promise(
        (resolve) => {
            let order = new Array();
            let orderOption = {
                number: 0,
                method: "2",
                week: "0",
                style: "1"
            }
            order = orderDeal(data)
            if (order[0] === "show") {
                if (order.includes("-number")) {
                    orderOption.number = order[order.indexOf("-number") + 1]
                }
                if (order.includes("-jwzx")) {
                    orderOption.method = "2"
                }
                if (order.includes("-week")) {
                    orderOption.week = order[order.indexOf("-week") + 1]
                }
                if (order.includes("-table")) {
                    orderOption.method = "1"
                }
                if (order.includes("-style")) {
                    orderOption.style = order[order.indexOf("-style") + 1]
                }
            } else {
                throw "invalid choice \nexample:\nshow -number 学号 -jwzx -week n \n/将发送教务在线上第n周的课表/\nshow -number 学号 -table\n/发送本周课表/"
            }
            if(orderOption.number === 0){
                throw "请使用'-number [学号] '输入您的学号噢"
            }
            resolve(orderOption)
        }
    )
}
module.exports = {
    robotCli
}