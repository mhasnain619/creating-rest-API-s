const express = require("express")
// const users = require("./MOCK_DATA.json")
const { connectMongodb } = require('./connection')
const { logReqRes } = require('./middlewares/index')
const userRouter = require('./routes/user')
const app = express()
const PORT = 8000

// Connection
connectMongodb('mongodb://127.0.0.1:27017/youtube-app-2').then(() => {
    console.log('Mongodb Connected');
})

//Middleware  //Plugin
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes('log.txt'))

app.use('/api/users', userRouter)

app.listen(PORT, () => console.log(`Server Startwd at PORT:${PORT}`));
