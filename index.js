const express = require("express")
const users = require("./MOCK_DATA.json")
const app = express()
const PORT = 8000

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
        return res.json({ status: pending })
    })
    .delete((req, res) => {
        // Delete users by id 
        return res.json({ status: pending })
    })


// Creating user

app.post('/api/users', (req, res) => {
    //Todo Create new user
    return res.send({ status: pending })
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
//     return res.send({ status: pending })
// })

//Delete User

// app.delete('/api/users/:id', (req, res) => {
//     //Todo delete new user with id
//     return res.send({ status: pending })
// })

app.listen(PORT, () => console.log(`Server Startwd at PORT:${PORT}`));
