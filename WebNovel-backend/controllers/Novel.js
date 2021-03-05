const db = require('../models')

const getNovel = async (req, res) => {
    try {
        const allNovel = await db.Novel.findAll({ where: { user_id: req.user.id } });
        res.status(200).send(allNovel)
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}
const getRandomNovel = async (req, res) => {
    try {
        const NovelId = await db.Novel.findAll();
        let a = [];
        for (let k of NovelId) {
            a.push(k.dataValues.id)
        }
        let valueItems1 = []
        let valueItems2 = []
        function random_item(items) {
            for (let i = 0; i < 3; i++) {
                valueItems1.push(items[Math.floor(Math.random() * items.length)]);
                valueItems2.push(items[Math.floor(Math.random() * items.length)]);
            }
            // console.log(`${valueItems1}`)
            // console.log(`${valueItems2}`)

            let difference = new Set(valueItems1)
            for (let elem of valueItems2) {
                if (difference.has(elem)) {
                    difference.delete(elem)
                } else {
                    difference.add(elem)
                }
            }
            difference = Array.from(difference)
            difference.length = 3
            return difference
        }
        const allNovel1 = await db.Novel.findAll({ where: { id: random_item(a) } });
        res.status(200).send(allNovel1)
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}

const getAllNovel = async (req, res) => {
    try {
        const allNovel = await db.Novel.findAll();
        res.status(200).send(allNovel)
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}


const addNovel = async (req, res) => {
    try {
        const addMyNovel = await db.Novel.create({
            title: req.body.title,
            plot: req.body.plot,
            user_id: req.user.id
        })
        res.status(201).send(addMyNovel)
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}

const editTitleNovel = async (req, res) => {
    try {
        const targetNovel = await db.Novel.findOne({ where: { id: req.params.id, user_id: req.user.id } })
        if (targetNovel) {
            await targetNovel.update({ title: req.body.title });
            return res.status(200).send({ message: "Updating is success" })
        }
        res.status(400).send({ message: "Novel not found" })

    } catch (err) {
        res.status(404).send("Error" + err)
    }
}

const deleteNovel = async (req, res) => {
    try {
        const targetId = Number(req.params.id);
        const targetTodo = await db.Novel.findOne({ where: { id: targetId, user_id: req.user.id } })
        if (targetTodo) {
            await targetTodo.destroy()
            res.status(204).send()
        } else {
            res.status(400).send({ message: "Novel Not Found" })
        }
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}

module.exports = {
    getNovel,
    addNovel,
    deleteNovel,
    editTitleNovel,
    getAllNovel,
    getRandomNovel
}