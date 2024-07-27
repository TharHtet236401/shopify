const TB = require("../models/permit");
const LIBBY = require("../utils/libby");
const mongoose = require("mongoose");

let all = async (req, res, next) => {
    try {
        let result = await TB.find();
        LIBBY.fMsg(res, "All permits fetch", result);
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
}

let add = async (req, res, next) => {
    try {
        let existsPermit = await TB.findOne({ name: req.body.name });
        if (!existsPermit) {
            let result = await new TB(req.body).save();
            LIBBY.fMsg(res, "Permit added", result);
        } else {
            next(new Error("Permit already exists"));
        }
    } catch (error) {
        next(error);
    }
}

let one = async (req, res, next) => {
    try {
        let result = await TB.findById(req.params.id);
        if (!result) {
            next(new Error("Permit not found"));
        } else {
            LIBBY.fMsg(res, "Permit fetch", result);
        }
    } catch (error) {
        next(error);
    }
}

let patch = async (req, res, next) => {
    try {
        let editResult = await TB.findById(req.params.id);
        if (!editResult) {
            next(new Error("Permit not found"));
        } else {
            await TB.findByIdAndUpdate(req.params.id, req.body);
            let result = await TB.findById(req.params.id);
            LIBBY.fMsg(res, "Permit updated", result);
        }
    } catch (error) {
        next(error);
    }
}

let drop = async (req, res, next) => {
    try {
        let id = req.params.id.trim().replace(/"/g, ''); // Trim and remove extra quotes
        if (!mongoose.Types.ObjectId.isValid(id)) { // Validate ObjectId
            return next(new Error("Invalid ObjectId"));
        }
        
        let result = await TB.findById(id);
        if (!result) {
            next(new Error("Permit not found"));
        } else {
            await TB.findByIdAndDelete(id);
            LIBBY.fMsg(res, "Permit deleted", result);
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { all, add, one, patch, drop };