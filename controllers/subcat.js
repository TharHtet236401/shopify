const CategoryTB = require("../models/category");
const LIBBY = require("../utils/libby")
const SubcatTB = require("../models/subcat");

let all = async(req,res,next)=>{
    let result = await SubcatTB.find().populate('childcat');
    LIBBY.fMsg(res,"All Subcats Fetched",result)
}

let add = async(req,res)=>{
    let saveData = new SubcatTB(req.body);
    let result = await saveData.save();

    let category = await CategoryTB.findById(req.body.category);
    let catUpdate = await CategoryTB.findByIdAndUpdate(category._id,{$push:{subcats:result._id}});
    LIBBY.fMsg(res,"Subcat Added",result)
}

let one = async(req,res)=>{
    let result = await SubcatTB.findById(req.params.id);
    LIBBY.fMsg(res,"Subcat Fetched",result)
}

let update = async(req,res)=>{
     await SubcatTB.findByIdAndUpdate(req.params.id,req.body);
     let result = await SubcatTB.findById(req.params.id)
    LIBBY.fMsg(res,"Subcat Updated",result)
}

let drop = async(req,res)=>{

    let subcat = await SubcatTB.findById(req.params.id);
    if (subcat){
        await SubcatTB.findByIdAndDelete(req.params.id);
        let category = await CategoryTB.findById(subcat.category);
        let catUpdate = await CategoryTB.findByIdAndUpdate(category._id,{$pull:{subcats:subcat._id}});
        LIBBY.fMsg(res,"Subcat Deleted",subcat)
    }else{
        LIBBY.fMsg(res,"Subcat Not Found",null)
    }
    
}

module.exports = {all,add,one,update,drop};