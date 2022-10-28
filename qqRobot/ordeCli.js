function orderDeal(str){
    return str.split(" ")
}
function robotCli(data){
    let orderOption = {
        number:0,
        method:"-jwzx",
        week:0,
        defaultStyle:0
    }
    let order = orderDeal(data)
    console.log(order)
    if(order[0] === "show"){
        if(order.includes("-number")){
            orderOption.number = order[order.indexOf("-number")+1]
        }
        if(order.includes("-jwzx")){
             orderOption.method = 2
        }
        if(order.includes("-week")){
            orderOption.week = order[order.indexOf("-week")+1]
        }
        if(order.includes("-table")){
            orderOption.method = 1
        }
        if(order.includes("-defaultStyle")){
            orderOption.defaultStyle = orderOption.week = order[order.indexOf("-defaultStyle")+1]
        }
    }else{
        return "invalid choice"
    }
    return orderOption
}
module.exports = {
    robotCli
}