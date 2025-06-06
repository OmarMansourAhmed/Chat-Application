const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleWare");

dotenv.config();

connectDB();
const app = express();

app.use(express.json()); // to accept json data


app.get("/", (req, res) => {
    res.send("API is Running");
});


// app.get('/api/chat',(req,res)=>{
//     res.send(chats);
// });

// app.get('/api/chat/:id',(req,res)=>{
//     // console.log(req.params.id); 

//     const singleChat = chats.find((c)=> c._id === req.params.id);
//     res.send(singleChat);
// });

app.use('/api/chat', chatRoutes);
app.use('/api/User', userRoutes);
app.use('/api/message', messageRoutes);


const PORT = process.env.PORT || 5000

const server = app.listen(`${PORT}`, console.log(`Server started on PORT ${PORT}`.yellow.bold));
const io = require('socket.io')(server, {
    pingTimeout: 60000,  //wait for 60 sec 
    cors: {
        origin: "http://localhost:3000",
    },
});
io.on("connection", (socket) => {
    console.log("connected to socket.io walahy");

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        // console.log(userData._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User joined Room: " + room);

    });

    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return HTMLFormControlsCollection.log('chat.users not defined');

        chat.users.forEach(user => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        })
    });
    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});
app.use(notFound);
app.use(errorHandler);