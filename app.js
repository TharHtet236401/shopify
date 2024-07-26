const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const { saveFile } = require('./utils/gallery');
require('dotenv').config();
const categoryRouter = require('./routes/category')
const subcatRouter = require('./routes/subcat')
const childcatRouter = require('./routes/childcat')
const tagsRouter = require('./routes/tags')
const userRouter = require('./routes/user')
const permitRouter = require('./routes/permit')
const roleRouter = require('./routes/role')
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
app.use('/subcats',subcatRouter)
app.use('/childcats',childcatRouter)
app.use('/tags',tagsRouter)
app.use('/permits',permitRouter)
app.use('/users',userRouter)
app.use('/roles',roleRouter)


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

