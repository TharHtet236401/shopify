const fs = require('fs')
const CategoryTB = require("../models/category")
const DB = require("../utils/tbs")



const writefile = async (file,data)=>{
    fs.writeFileSync(file,JSON.stringify(data))
    console.log('Backup completed');
}

const readfile = async (file)=>{
    return JSON.parse(await fs.readFileSync(file,'utf8'))
}

const storage =  (file)=>{
    return `./migrations/backups/${file}.json` // extracting the file path
}

const migrator = {
    backup: async(DB,file)=>{
        let data = await DB.find()
        writefile(storage(file),data)
        console.log("Backuped")
    },
    migrate: async(DB,filename)=>{
        const file = storage(filename)
        let data = await readfile(file)
        console.log(data)
        await DB.insertMany(data)
        console.log("Migrated")
    }
}


const backup = async()=>{
 await migrator.backup(DB.categories,"categories")
 await migrator.backup(DB.users,"users")
 await migrator.backup(DB.subcats,"subcats")
 await migrator.backup(DB.childcats,"childcats")
 await migrator.backup(DB.tags,"tags")
 await migrator.backup(DB.roles,"roles")
 await migrator.backup(DB.permits,"permits")
 await migrator.backup(DB.orders,"orders")
 await migrator.backup(DB.orderitems,"orderitems")
 await migrator.backup(DB.products,"products")
}

const migrate = async()=>{
    await migrator.migrate(DB.categories,"categories")
    await migrator.migrate(DB.users,"users")
    await migrator.migrate(DB.subcats,"subcats")
    await migrator.migrate(DB.childcats,"childcats")
    await migrator.migrate(DB.tags,"tags")
    await migrator.migrate(DB.roles,"roles")
    await migrator.migrate(DB.permits,"permits")
    await migrator.migrate(DB.orders,"orders")
    await migrator.migrate(DB.orderitems,"orderitems")
    await migrator.migrate(DB.products,"products")
}

module.exports = {backup,migrate}