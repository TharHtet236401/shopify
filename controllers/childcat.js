const SubcatTB = require("../models/subcat");
const LIBBY = require("../utils/libby")
const ChildcatTB = require("../models/childcat");

let all = async (req, res) => {
    let result= await ChildcatTB.find();
    LIBBY.fMsg(res,"All child cat fetched",result)
}


let add = async (req, res) => {
    try {
        if (!req.body.image) {
            return res.status(400).json({ con: false, message: "Image is required" });
        }
        let savedCat = new ChildcatTB(req.body);
        let result = await savedCat.save();
        let catUpdate = await SubcatTB.findByIdAndUpdate(req.body.subcat,{$push:{childcat:result._id}});
        LIBBY.fMsg(res,"Category added",result)
    } catch (error) {
        LIBBY.fMsg(res,"Error",error.message)
    }
};

let one = async (req,res)=>{
    try{
        let result = await ChildcatTB.findById(req.params.id);
        LIBBY.fMsg(res,"Child cat fetched",result)
    }catch(error){
        LIBBY.fMsg(res,"Error",error.message)
    }
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