const Joi = require('joi');

module.exports = {
    UserSchema:{
        add:Joi.object({
            name:Joi.string().min(3).max(10).required(),
            phone:Joi.string().min(7).max(11).required(),
            password:Joi.string().min(8).max(30).required()
        })
    },
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
        )
    }
}