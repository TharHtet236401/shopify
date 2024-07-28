let TB = require("../models/product")
let LIBBY = require("../utils/libby")


let all = async(req,res,next)=>{
    try {
        let page = req.params.page;
        let skipCount = Number(page) == 1 ? 0 : (Number(page) - 1) * process.env.LIMIT;
        let result = await TB.find().skip(skipCount).limit(Number(process.env.LIMIT)).select('-__v -createdAt -updatedAt');
        LIBBY.fMsg(res,"Product Listed",result)
    } catch (error) {
        console.error("Error listing products:", error);
        LIBBY.fMsg(res, "Failed to list products", error);
    }  
}

let add = async(req,res,next)=>{
    try {
        let item = await TB.findOne({name:req.body.name})
        if(item){
            LIBBY.fMsg(res, "Product Already Exists", item);
        }else{
            delete req.body.user
            let result = await (await new TB(req.body).save()).populate('category')
            
            LIBBY.fMsg(res, "Product Added", result); // Return the saved product
        }
    } catch (error) {
        console.error("Error adding product:", error);
        LIBBY.fMsg(res, "Failed to add product", error);
    }
}

let catProduct = async (req,res,next)=>{
    try {
        let result = await TB.find({category:req.params.id})
        LIBBY.fMsg(res,"Product Listed",result)
    } catch (error) {
        console.error("Error listing products:", error);
        LIBBY.fMsg(res, "Failed to list products", error);
    }
}

let subCatProduct = async (req,res,next)=>{
    try {
        let result = await TB.find({subcat:req.params.id})
        console.log(result)
        LIBBY.fMsg(res,"Product Listed",result)
    } catch (error) {
        console.error("Error listing products:", error);
        LIBBY.fMsg(res, "Failed to list products", error);
    }
}

let childCatProduct = async (req,res,next)=>{
    try {
        let result = await TB.find({childcat:req.params.id})
        LIBBY.fMsg(res,"Product Listed",result)
    } catch (error) {
        console.error("Error listing products:", error);
        LIBBY.fMsg(res, "Failed to list products", error);
    }
}
module.exports = {all,add,catProduct,subCatProduct,childCatProduct}