const TB = require('../models/order')
const orderItemTB = require('../models/orderitem')
const productTB = require('../models/product')
const LIBBY = require('../utils/libby')


let add = async (req,res,next)=>{
    try{
    
        let order = new TB();
        let items = req.body.items;
        let auth = req.body.user
        let orderItems = []
        for await(let item of items){
            let product = await productTB.findById(item.id)
            let tempItems = {
                order:order._id,
                productid:product._id,
                count:item.count, 
                price:product.price,
                discount:product.discount,
                name:product.name,
                image:product.image
            }
            orderItems.push(tempItems)
        }
        let insertItems = await orderItemTB.insertMany(orderItems)
       
        let itemsId = [];
        let orderItemsId = orderItems.map(item => itemsId.push(item.productid))
        console.log("heer is " + orderItems)
        let total = orderItems.reduce((a,b)=>a+ (b.count * b.price),0)
        console.log(total)
        order.userId = auth._id
        order.count = items.length
        order.items = itemsId
        order.total = total
        let result = await order.save()
        
        console.log(result)
        LIBBY.fMsg(res,'Order Created Successfully',result)
    }catch(error){
        console.error(error)
        LIBBY.fMsg(res,'Order Creation Failed',error)
    }
}

let getOrders = async (req,res,next)=>{
    let result = await TB.find({userId:req.body.user._id})
    console.log(result)
    LIBBY.fMsg(res,'Order List',result)
}
module.exports = {add,getOrders}