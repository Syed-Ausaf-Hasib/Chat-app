require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const messageRoute = require("./routes/messagesRoute")
const socket = require("socket.io")

const path = require("path")

const app = express();

app.get('/', (req, res) => res.send('Server is running!'))

app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoute)

//============================DEPLOYMENT====================

// const __dirname1 = path.resolve()
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname1, '/frontend/build')))
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
//     })
// }
// else {
//     app.get("/", (req, res) => {
//         res.send("API is running...")
//     })
// }

//============================DEPLOYMENT====================


mongoose.connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000           // 45 seconds
})
.then(() => {
    console.log("Database connected");
})
.catch(err => {
    console.log("Database connection error:", err.message);
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server connected to ${PORT}`)
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        // origin: "https://chat-app-bz5t.vercel.app",
        credentials: true,
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    })
    socket.on("send-msg", data => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.message)
        }
    })
})