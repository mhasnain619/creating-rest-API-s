const User = require('../models/user')

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: "User not found" })
    res.json(user)
}


async function handleUpdateUserById(req, res) {
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
}



async function handleDeleteUserById(req, res) {
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
}

async function handleCreateNewUser(req, res) {
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

    return res.status(201).json({ msg: "Success", id: result._id })
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}