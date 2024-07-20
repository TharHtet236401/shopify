const SubcatTB = require("../models/subcat");
const LIBBY = require("../utils/libby")
const ChildcatTB = require("../models/childcat");

let all = async (req, res) => {
    let result= await ChildcatTB.find();
    LIBBY.fMsg(res,"All child cat fetched",result)
}

let add = async(req,res)=>{
    let saveData = new ChildcatTB(req.body);
    let result = await saveData.save();

    let subcat = await SubcatTB.findById(req.body.subcat);
    let subcatUpdate = await SubcatTB.findByIdAndUpdate(subcat._id,{$push:{childcat:result._id}});
    LIBBY.fMsg(res,"Child cat added",result)
}

let one = async (req,res)=>{
    let result = await ChildcatTB.findById(req.params.id);
    LIBBY.fMsg(res,"Child cat fetched",result)
}

let patch = async (req,res)=>{
    let childcatexits = await ChildcatTB.findById(req.params.id);
    if(childcatexits){
        await ChildcatTB.findByIdAndUpdate(req.params.id,req.body);
        let result = await ChildcatTB.findById(req.params.id);
        LIBBY.fMsg(res,"Child cat updated",result)
    }else{
        LIBBY.fMsg(res,"Child cat not found",null)
    }
}

let drop = async(req,res)=>{

    let childcat= await ChildcatTB.findById(req.params.id);
    if (childcat){
        await ChildcatTB.findByIdAndDelete(req.params.id);
        let result = await SubcatTB.findById(childcat.subcat);
        let subcatUpdate = await SubcatTB.findByIdAndUpdate(result._id,{$pull:{childcat:childcat._id}});
        LIBBY.fMsg(res,"Childcat Deleted",childcat)
    }else{
        LIBBY.fMsg(res,"Childcat Not Found",null)
    }
    
}

module.exports = { all,add,one,patch,drop}