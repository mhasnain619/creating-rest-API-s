const express = require("express")
// const users = require("./MOCK_DATA.json")
const mongoose = require('mongoose')
const fs = require("fs")
const { type } = require("os")
const app = express()
const PORT = 8000

//Connection

mongoose
    .connect('mongodb://127.0.0.1:27017/youtube-app-2')
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log('Mongodb Connection Error', err))
// Schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitlt: {
        type: String,
    },
    gender: {
        type: String,
    },
}, { timeseries: true }
)

const User = mongoose.model('user', userSchema)


//Middleware  //Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log("Hello from middlewer 1");
    fs.appendFile('log.txt', `${Date.now()} : ${req.method}: ${req.path}\n`, (err, date) => {
        next()
    })
})

//ROUTES
app.get('/users', async (req, res) => {

    const allDbUsers = await User.find({})

    const html = `
    <ul>
    
    ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    
    </ul>`;
    res.send(html)

})

//Rest Api
// Getting all users

app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({})

    //Always add X on custom headers
    // res.setHeader('x-myName', 'Anaintay') // custom headers
    return res.json(allDbUsers)
})

app.route('/api/users/:id')
    .get(async (req, res) => {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ error: "User not found" })
        res.json(user)
    })
    .patch((req, res) => {
        // Edit users by id 
        const id = Number(req.params.id)
        const index = users.findIndex(user => user.id === id)
        if (index !== -1) {

            users[index] = { ...users[index], ...req.body }
            fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ error: "Failed to update User" })
                }
                return res.json({ status: "Success", user: users[index] })
            })
        } else {
            res.status(404).json({ error: "User not found" });

        }
    })
    .delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id)
        return res.json({ status: " Success" })
        // Delete users by id 
        // const id = Number(req.params.id)
        // const index = users.findIndex(user => user.id === id)
        // if (index !== -1) {
        //     const deleteUser = users.splice(index, 1);
        //     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        //         if (err) {
        //             return res.status(500).json({ error: "Failed to delete user" });

        //         }
        //         return res.json({ status: "Succesfully Deleted", user: deleteUser[0] })

        //     })
        // } else {
        //     res.status(404).json({ error: "User not found" });
        // }
    })


// Creating user

app.post('/api/users', async (req, res) => {
    //Todo Create new user
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "all fields are require" })
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })

    return res.status(201).json({ msg: "Success" })
})


// Getting users by id 

// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id)
//     const user = users.find((user) => user.id === id)
//     return res.json(user)
// })



//Update User

// app.patch('/api/users/:id', (req, res) => {
//     //Todo Edit new user with id
//     return res.send({ status: "pending" })
// })

//Delete User

// app.delete('/api/users/:id', (req, res) => {
//     //Todo delete new user with id
//     return res.send({ status: "pending" })
// })

app.listen(PORT, () => console.log(`Server Startwd at PORT:${PORT}`));
