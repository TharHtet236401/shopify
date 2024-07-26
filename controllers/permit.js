const TB = require("../models/permit");
const LIBBY = require("../utils/libby")

let all = async (req,res,next)=>{
    let result = await TB.find()
    LIBBY.fMsg(res,"All permits fetch", result)
}

let add = async(req,res,next)=>{
    let existsPermit = await TB.findOne({name:req.body.name})
    if (!existsPermit) {
        let result = await new TB( req.body).save();
        LIBBY.fMsg(res,"Permit added", result)
    }else{
       next (new Error("Permit already exists"))
    }
}

let one = async (req,res,next)=>{
    let result = await TB.findById(req.params.id)
    if(!result){
        next (new Error("Permit not found"))
    }else{
        LIBBY.fMsg(res,"Permit fetch", result)
    }
}

let patch = async (req,res,next)=>{
    let editResult = await TB.findById(req.params.id)
    if (!editResult) {
        await TB.findByIdAndUpdate(req.params.id,req.body)
        let result = await TB.findById(req.params.id)
        LIBBY.fMsg(res,"Permit updated", result)
    }else{
        next (new Error("Permit not found"))
    }
}

let drop = async (req,res,next)=>{
    let result = await TB.findById(req.params.id)
    if (!result) { 
        next (new Error("Permit not found"))
    }else{
        await TB.findByIdAndDelete(req.params.id)
        LIBBY.fMsg(res,"Permit deleted", result)
    }
    
}
module.exports = {all,add,one,patch,drop}