const db = require("../models");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getMyNovel = async (req, res) => {
    try {
        let [a] = await db.Novel.findAll({ where: { id: 1 } })
        res.status(200).send(a.plot)
    } catch (err) {
        res.status(404).send({ msg: "NOT FOUND" })
    }
}

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const targetUser = await db.User.findOne({ where: { username: username } })
        if (targetUser) {
            res.status(400).send({ message: "Username already taken." })
        } else {
            const salt = bcryptjs.genSaltSync(12);
            const hashedPassword = bcryptjs.hashSync(password, salt);
            await db.User.create({
                username: username,
                password: hashedPassword
            })
            res.status(201).send({ message: "User created" })
        }
    } catch (err) {
        res.status(404).send(err)
    }
}
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const targetUser = await db.User.findOne({ where: { username: username } })
        if (!targetUser) { //ถ้าไม่มี
            res.status(400).send({ message: "username or password is wrong" })
        } else {
            const isCorrectPassword = bcryptjs.compareSync(password, targetUser.password)
            if (isCorrectPassword) {
                const payload = {
                    id: targetUser.id
                };
                const token = jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600 });
                res.status(200).send({
                    token: token,
                    message: "Login successful."
                })
            } else {
                res.status(400).send({ message: "username or password is wrong" })
            }
        }
    } catch (err) {
        res.status(404).send(err)
    }
}


// const getAllUsers = async (req, res) => {
//     try {
//         let a = await db.User.findAll();
//         res.status(200).send(a.map(item => item.username));
//     } catch (err) {
//         res.status(404).send({ msg: "NOT FOUND" })
//     }
// }
// async function addUsers(req, res) {
//     try {
//         let newUser = await db.User.create({
//             username: req.body.username,
//             password: req.body.password
//         })
//         res.status(201).send("Create username success")

//     } catch (err) {
//         res.status(404).send(err)
//     }
// }


module.exports = {
    registerUser,
    loginUser,
    getMyNovel
}