const TagsTB = require("../models/tags");
const LIBBY = require("../utils/libby")

let all = async (req,res,next)=>{
    let result = await TagsTB.find()
    LIBBY.fMsg(res,"All tags fetch", result)
    
}

let add = async(req,res)=>{
    let saveData = new TagsTB(req.body);
    let result = await saveData.save();
    LIBBY.fMsg(res,"Tag added", result)
}

let one = async (req,res,next)=>{
    let result = await TagsTB.findById(req.params.id)
    LIBBY.fMsg(res,"Tag fetch", result)
}

let patch = async (req,res)=>{
    await TagsTB.findByIdAndUpdate(req.params.id, req.body)
    let result = await TagsTB.findById(req.params.id)
    LIBBY.fMsg(res,"Tag updated", result)
}

let drop = async (req,res)=>{
    let result = await TagsTB.findById(req.params.id)
    await TagsTB.findByIdAndDelete(req.params.id)
    LIBBY.fMsg(res,"Tag deleted", result)
}
module.exports = {all,add,one,patch,drop}