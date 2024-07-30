const DB = {
    categories: require("../models/category"),
    subcats: require("../models/subcat"),
    childcats: require("../models/childcat"),
    tags: require("../models/tags"),
    orders: require("../models/order"),
    orderitems: require("../models/orderitem"),
    products: require("../models/product"),
    roles: require("../models/role"),
    permits:require("../models/permit"),
    users: require("../models/user")
}

module.exports = DB