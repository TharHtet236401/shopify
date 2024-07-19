const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const { saveFile } = require('./utils/gallery');
require('dotenv').config();
const categoryRouter = require('./routes/category')
const app = express();

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Category = require('./models/category');

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cats',categoryRouter)
// Routes
// app.post('/cats', saveFile, async (req, res) => {
//     try {
//         let savedCat = new Category(req.body);
//         let result = await savedCat.save();
//         res.status(200).json({ "message": "File uploaded", result: result });
//     } catch (err) {
//         res.status(500).json({ con: false, "message": err.message });
//     }
// });

// app.get('/cats', async (req, res) => {
//     let cats = await Category.find();
//     res.status(200).json({ con: true, "message": "Category fetched", cats: cats });
// });

// app.get('/cats/:id', async (req, res) => {
//     let cat = await Category.findById(req.params.id);
//     res.status(200).json({ con: true, "message": "Category fetched", cat: cat });
// });

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the home page" });
});

// Catch-all route
app.get("*", (req, res) => {
    res.status(200).json({ message: "Invalid Route" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    err.status = err.status || 505;
    res.status(err.status).json({ con: false, "message": err.message });
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

