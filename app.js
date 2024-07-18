const express = require('express');
const path = require('path'); // Added this line
const bodyParser = require('body-parser'); // Added this line
const fileUpload = require('express-fileupload');
const {saveFile,saveFiles,deleteFile} = require('./utils/gallery');
require('dotenv').config();

console.log(process.env.PORT);

const app = express();

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false })); // Updated this line
app.use(bodyParser.json()); // Updated this line

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.status(200).json({message:"Welcome to the home page"})
})
app.post('/cat',deleteFile,(req,res)=>{
    res.status(200).json({"message":"File deleted"})
})

app.use((err,req,res,next)=>{
    err.status = err.status || 505;
    res.status(err.status).json({con:false,"message":err.message})
})

//must be bottom of your all route definitions
app.get("*", (req, res) => {
    res.status(200).json({ message: "Invalid Route" });
});


app.listen(process.env.PORT, () => {
    console.log(`The port is connected at the port ${process.env.PORT}`);
});