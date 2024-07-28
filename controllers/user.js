const UsersTB = require("../models/user");
const LIBBY = require("../utils/libby");

let all = async (req, res, next) => {
    try {
        let result = await UsersTB.find().populate('roles').populate('permits');
        LIBBY.fMsg(res, "All users fetch", result);
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
}

let register = async (req, res, next) => {
    try {
        let check = await UsersTB.findOne({ phone: req.body.phone });
        if (!check) {
            req.body.password = LIBBY.encode(req.body.password);
            let saveData = new UsersTB(req.body);
            let result = await saveData.save();
            LIBBY.fMsg(res, "Registered Successfully");
        } else {
            next(new Error("Phone is already existed"));
        }
    } catch (error) {
        next(error);
    }
}

let login = async (req, res, next) => {
    try {
        let dbUser = await UsersTB.findOne({ phone: req.body.phone }).populate('roles');
        if (dbUser) {
            if (LIBBY.decode(req.body.password, dbUser.password)) {
                let userObj = dbUser.toObject();
                delete userObj.password;
                userObj.token = LIBBY.genToken(userObj);
                LIBBY.fMsg(res, "User Logged In", userObj);
            } else {
                next(new Error("Invalid password"));
            }
        } else {
            next(new Error("User not found"));
        }
    } catch (error) {
        next(error);
    }
}

let userAddRole = async (req, res, next) => {
    try {
        let dbUser = await UsersTB.findById(req.body.userId);
        let found = dbUser.roles.find(rid => rid.equals(req.body.roleId));

        if (found) {
            LIBBY.fMsg(res, "Already There", found);
        } else {
            await UsersTB.findByIdAndUpdate(req.body.userId, { $push: { roles: req.body.roleId } });
            let result = await UsersTB.findById(req.body.userId);
            LIBBY.fMsg(res, "Role Added to User", result);
        }
    } catch (error) {
        next(error);
    }
}

let userRemoveRole = async (req, res, next) => {
    try {
        let dbUser = await UsersTB.findById(req.body.userId);
        let found = dbUser.roles.find(rid => rid.equals(req.body.roleId));

        if (!found) {
            LIBBY.fMsg(res, "Role not found", found);
        } else {
            await UsersTB.findByIdAndUpdate(req.body.userId, { $pull: { roles: req.body.roleId } });
            let result = await UsersTB.findById(req.body.userId);
            LIBBY.fMsg(res, "Role Removed From User", result);
        }
    } catch (error) {
        next(error);
    }
}

let userAddPermit = async (req, res, next) => {
    try {
        let dbUser = await UsersTB.findById(req.body.userId).populate('permits');
        if (dbUser) {
            let found = dbUser.permits.find(pid => pid.equals(req.body.permitId));
            if (found) {
                LIBBY.fMsg(res, "Already There", found);
            } else {
                await UsersTB.findByIdAndUpdate(req.body.userId, { $push: { permits: req.body.permitId } });
                let result = await UsersTB.findById(req.body.userId).populate('permits');
                LIBBY.fMsg(res, "Permit Added to User", result);
            }
        } else {
            LIBBY.fMsg(res, "User not found", null);
        }
    } catch (error) {
        next(error);
    }
}

let userRemovePermit = async (req, res, next) => {
    try {
        let dbUser = await UsersTB.findById(req.body.userId).populate('permits');
        if (dbUser) {
            let found = dbUser.permits.find(pid => pid.equals(req.body.permitId));
            if (found) {
                await UsersTB.findByIdAndUpdate(req.body.userId, { $pull: { permits: req.body.permitId } });
                let result = await UsersTB.findById(req.body.userId).populate('permits');
                LIBBY.fMsg(res, "Permit Removed From User", result);
            } else {
                LIBBY.fMsg(res, `Not Such Permit ${req.body.permitId}`, found);
            }
        } else {
            LIBBY.fMsg(res, `Not Such User ${req.body.userId}`, null);
        }
    } catch (error) {
        next(new Error("Not Such User"));
    }
}


module.exports = { all, register, login, userAddRole, userRemoveRole, userAddPermit,userRemovePermit};