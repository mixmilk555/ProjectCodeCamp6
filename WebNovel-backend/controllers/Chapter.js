const db = require('../models')


const getAllChapter = async (req, res) => {
    try {
        const allMyNovel = await db.Novel.findAll({ where: { user_id: req.user.id } })
        let a = [];
        for (let k of allMyNovel) {
            a.push(k.dataValues.id)
        }
        let allMyChapter = []
        for (let k of a) {
            allMyChapter.push(await db.Chapter.findAll({ where: { novel_id: k } }))
        }
        res.status(200).send(allMyChapter);
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}

const getTitleChapter = async (req, res) => {
    try {
        const allMyNovel = await db.Novel.findAll()
        res.status(200).send(allMyNovel);
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}



const getOnlyChapter = async (req, res) => {
    try {
        const allMyNovel = await db.Novel.findAll({ where: { user_id: req.user.id } })
        let a = [];
        for (let k of allMyNovel) {
            a.push(k.dataValues.id)
        }
        if (a.includes(+req.params.id)) {
            const chapter = await db.Chapter.findAll({ where: { novel_id: req.params.id } })
            res.status(200).send(chapter)
        } else {
            res.status(400).send({ message: "NOT FOUND Chapter" })
        }
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}

const getOnlyChapter2 = async (req, res) => {
    try {
        const allMyNovel = await db.Chapter.findAll()
        res.status(200).send(allMyNovel);
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}


const getChapterStory = async (req, res) => {
    try {
        const allMyNovel = await db.Novel.findAll({ where: { user_id: req.user.id } })
        let a = [];
        for (let k of allMyNovel) {
            a.push(k.dataValues.id)
        }
        if (a.includes(+req.params.id)) {
            const chapter = await db.Chapter.findOne({ where: { id: req.params.chapterId } })
            res.status(200).send(chapter.dataValues.story)
        } else {
            res.status(400).send({ message: "NOT FOUND Chapter" })
        }
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}

const getStory = async (req, res) => {
    try {
        const myStoryChapter = await db.Chapter.findAll({ where: { novel_id: req.params.id } })
        const targetStory = await myStoryChapter.find(item=>item.id === +req.params.chapterId)
        res.status(200).send(targetStory)
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}

const addChapterName = async (req, res) => {
    try {
        const allMyNovel = await db.Novel.findAll({ where: { user_id: req.user.id } })
        let a = [];
        for (let k of allMyNovel) {
            a.push(k.dataValues.id)
        }
        if (a.includes(+req.params.id)) {
            const addChapter = await db.Chapter.create({
                chapterName: req.body.chapterName,
                story: req.body.story,
                novel_id: req.params.id
            })
            res.status(201).send(addChapter)
        } else {
            res.status(400).send({ message: "Cannot add Chapter" })
        }
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}



const addChapterStory = async (req, res) => {
    try {
        const allMyNovel = await db.Novel.findAll({ where: { user_id: req.user.id } })
        let a = [];
        for (let k of allMyNovel) {
            a.push(k.dataValues.id)
        }
        if (a.includes(+req.params.id)) {
            const target = await db.Chapter.findOne({ where: { id: req.params.chapterId } })
            if (target) {
                await target.update({
                    chapterName: req.body.chapterName,
                    story: req.body.story
                })
                res.status(200).send({ message: "Update Success" })
            } else {
                res.status(400).send({ message: "Cannot Update" })
            }

        } else {
            res.status(400).send({ message: "Cannot Update" })
        }
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}

const deleteChapter = async (req, res) => {
    try {
        const allMyNovel = await db.Novel.findAll({ where: { user_id: req.user.id } })
        let a = [];
        for (let k of allMyNovel) {
            a.push(k.dataValues.id)
        }
        if (a.includes(+req.params.id)) {
            const target = await db.Chapter.findOne({ where: { id: req.params.chapterId } })
            if (target) {
                await target.destroy();
                res.status(200).send({ message: "Deleted Success" })
            } else {
                res.status(400).send({ message: "NOT FOUND Chapter" })
            }
        } else {
            res.status(400).send({ message: "Cannot Delete" })
        }
    } catch (err) {
        res.status(404).send("Error" + err)
    }
}

module.exports = {
    getAllChapter,
    addChapterName,
    deleteChapter,
    getOnlyChapter,
    addChapterStory,
    getChapterStory,
    getOnlyChapter2,
    getTitleChapter,
    getStory
}