let DB = require('../utils/tbs')
const LIBBY = require('../utils/libby')

let ownerUser = {
    "name":"Owner",
    "phone":"123456789j",
    "password":"123456789",
    "roles":["66a4f9119bc755e1d285079c"],
    "permits":[]
}

let ownerGenerate = async()=>{
    ownerUser.password = LIBBY.encode(ownerUser.password)
    let result = await new DB.users(ownerUser).save()
    console.log("owner generted")
}

module.exports = {
    ownerGenerate
}