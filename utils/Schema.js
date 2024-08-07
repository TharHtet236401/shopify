const Joi = require('joi');

module.exports = {
    UserSchema:{
        register:Joi.object({
            name:Joi.string().min(3).max(10).required(),
            phone:Joi.string().min(7).max(11).required(),
            password:Joi.string().min(8).max(30).required()
        }),
        login:Joi.object({
            phone:Joi.string().min(7).max(11).required(),
            password:Joi.string().min(8).max(30).required(),
            user:Joi.object().optional()
        }),
        addRole:Joi.object({
            userId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            roleId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            user:Joi.object().optional()
        }),
        addPermit:Joi.object({
            userId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            permitId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            user:Joi.object().optional()
        })
    },
    ProductSchema:{
        add:Joi.object({
            "name":Joi.string().required(),
            "price":Joi.number().required(),
            "brand":Joi.string().required(),
            "quantity":Joi.number().required(),
            "image":Joi.array().required(),
            "category":Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            "subcat":Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            "childcat":Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            "tag":Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            "refund":Joi.string().optional(),
            "feature":Joi.object().required(),
            "color":Joi.array().required(),
            "user":Joi.object().optional()
        })
    }
    ,
    CategorySchema:{
        add:Joi.object({
             name:Joi.string().required(),
            image:Joi.string().required()
        })
    },
    TagSchema:{
        add:Joi.object({
            name:Joi.string().required(),
            image:Joi.string().required()
        })
    },
    PermitSchema:{
        add:Joi.object({
            name:Joi.string().required().min(3)
        })
    },
    AllSchema:{
        id:Joi.object(
            {
             id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            }
        ),
        page:Joi.object(
            {
             page:Joi.number().min(1).required()
            }
        )
    }
}