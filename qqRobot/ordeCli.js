function orderDeal(str) {
    return str.split(" ")
}
function robotCli(data) {
    return new Promise(
        (resolve) => {
            let order = new Array();
            let orderOption = {
                number: 0,
                method: "2",
                week: "0",
                defaultStyle: "0"
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
                if (order.includes("-defaultStyle")) {
                    orderOption.defaultStyle = orderOption.week = order[order.indexOf("-defaultStyle") + 1]
                }
            } else {
                throw "invalid choice"
            }
            if(orderOption.number === 0){
                throw "是使用因为里面的-噢"
            }
            resolve(orderOption)
        }
    )
}
module.exports = {
    robotCli
}