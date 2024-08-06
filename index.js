const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const app = express()
const PORT = 8000


//Middleware  //Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log("Hello from middlewer 1");
    fs.appendFile('log.txt', `${Date.now()} : ${req.method}: ${req.path}\n`, (err, date) => {
        next()
    })
})

//ROUTES
app.get('/users', (req, res) => {

    const html = `
    <ul>
    
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    
    </ul>`;
    res.send(html)

})

//Rest Api
// Getting all users

app.get('/api/users', (req, res) => {
    //Always add X on custom headers
    // res.setHeader('x-myName', 'Anaintay') // custom headers
    return res.json(users)
})

app.route('/api/users/:id').get(
    (req, res) => {
        const id = Number(req.params.id)
        const user = users.find((user) => user.id === id)
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
    .delete((req, res) => {
        // Delete users by id 
        const id = Number(req.params.id)
        const index = users.findIndex(user => user.id === id)
        if (index !== -1) {
            const deleteUser = users.splice(index, 1);
            fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ error: "Failed to delete user" });

                }
                return res.json({ status: "Succesfully Deleted", user: deleteUser[0] })

            })
        } else {
            res.status(404).json({ error: "User not found" });
        }
    })


// Creating user

app.post('/api/users', (req, res) => {
    //Todo Create new user
    const body = req.body;
    const newUser = { ...body, id: users.length + 1 }
    users.push(newUser)
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to create user" })
        }
        return res.send({ status: "success", id: users.length + 1 })

    })

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
