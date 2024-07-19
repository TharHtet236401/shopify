const fs = require('fs');

let saveFile = (req, res, next) => {
    console.log('req.files:', req.files); // Log the files object to see what is being sent
    if (!req.files || !req.files.file) {
        return res.status(400).json({ con: false, "message": "No file uploaded" });
    }

    let fileName = new Date().valueOf() + "_" + req.files.file.name;
    req.files.file.mv(`./uploads/${fileName}`, err => {
        if (err) {
            return res.status(500).json({ con: false, "message": err.message });
        }
        req.body['image'] = fileName;
        next();
    });
}

module.exports = {
    saveFile
};
