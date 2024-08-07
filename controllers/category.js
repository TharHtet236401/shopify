const TB = require("../models/category");
const LIBBY = require("../utils/libby")

let all = async (req, res) => {
    try {
        let results = await TB.find().populate({
            path: 'subcats',select: '-__v -CreatedAt -createdAt' ,
            populate: { path: 'childcat',select: '-__v' }
        }).select('-__v -created -updated');
        LIBBY.fMsg(res,"All Categories",results) 
    } catch (error) {
        LIBBY.fMsg(res,"Error",error.message)
    }
};

let one = async (req, res) => {
    try {
        let result = await TB.findById(req.params.id).select('-__v -created');
        LIBBY.fMsg(res,"One Category Found",result)
    } catch (error) {
        LIBBY.fMsg(res,"Error",error.message)
    }
};

let add = async (req, res) => {
    try {
        
        delete req.body.user
        let savedCat = new TB(req.body);
        let result = await savedCat.save();
        LIBBY.fMsg(res,"Category added",req.body)
    } catch (error) {
        LIBBY.fMsg(res,"Error",error.message)
    }
};

let drop = async (req,res)=>{
    let existCat = await TB.findById(req.params.id)
    if (existCat){
        let result = await TB.findByIdAndDelete(req.params.id)
        LIBBY.fMsg(res,"Category deleted",result)
    }else{
        LIBBY.fMsg(res,`Category not found with the id of ${req.params.id}`,null)
    }
    
}

let update = async (req,res)=>{
    let existCat = await TB.findById(req.params.id)
    if (existCat){
        await TB.findByIdAndUpdate(req.params.id,req.body)
        let result = await TB.findById(req.params.id)
        LIBBY.fMsg(res,"Category updated",result)
    }else{
        LIBBY.fMsg(res,`Category not found with the id of ${req.params.id}`,null)
    }
}


module.exports = { all, 
    one, 
    add ,
    drop,
    update}