require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const { Server } = require("socket.io");
const httpServer = require('http').createServer(app);

const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const LIBBY = require('./utils/libby');

const categoryRouter = require('./routes/category')
const subcatRouter = require('./routes/subcat')
const childcatRouter = require('./routes/childcat')
const tagsRouter = require('./routes/tags')
const userRouter = require('./routes/user')
const permitRouter = require('./routes/permit')
const roleRouter = require('./routes/role')
const apiRouter = require('./routes/api')
const productRouter = require('./routes/product')


app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));  

const io = new Server(httpServer, {
    cors: {
      origin: "*", // You can specify the allowed origins here
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    },
    transports: ['websocket','polling'],
    path: '/socket.io'
  });

  

const {validateToken} = require('./utils/validator')

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB}`, {});

const Category = require('./models/category');
const { Socket } = require('dgram');

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cats',validateToken(),categoryRouter)
app.use('/subcats',subcatRouter)
app.use('/childcats',childcatRouter)
app.use('/tags',tagsRouter)
app.use('/permits',permitRouter)
app.use('/roles',roleRouter)
app.use('/users',validateToken(),userRouter)
app.use('/api',apiRouter)
app.use('/products',validateToken(),productRouter)

// Catch-all route
app.get("*", (req, res) => {
    res.status(200).json({ message: "Invalid Route" });
});



let migrate = async()=>{
    let migrator = require('./migrations/migrator')
    let generator = require('./migrations/generate')
    // await migrator.backup()
    // await migrator.migrate()
}
// migrate()


// Error handling middleware
app.use((err, req, res, next) => {
    err.status = err.status || 505;
    res.status(err.status).json({ con: false, "message": err.message });
});

// io.on("connection", (socket) => {
//     console.log('Connection Established Thar Htet Aung');
//     socket.emit("greet", "Hello World Thar Htet Aung");
//     socket.on("info", (data)=>{
//         console.log(data);
//         socket.emit("myinfo",{name:"Thar Htet Aung",age:20})
//     })
// });

io.of("/chat").use(async (socket,next)=>{
    await LIBBY.tokenFromSocket(socket,next)
}).on("connection",(socket)=>{
    console.log('Connection Established Thar Htet Aung');
    socket.emit("greet","Hello World Thar hTte Aung")
})


io.on("connect_error", (err) => {
    console.error("Connection Error:", err);
});

httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
