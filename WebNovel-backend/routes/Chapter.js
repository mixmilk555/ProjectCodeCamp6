const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/Chapter')
const passport = require('passport')


const authentication = passport.authenticate("jwt", { session: false });

// router.get('/', authentication, chapterController.getAllChapter)
router.get('/:id', authentication, chapterController.getOnlyChapter)
router.get('/novel/:id', chapterController.getOnlyChapter2)
router.get('/titleNovel/:id', chapterController.getTitleChapter)

router.get('/story/:id/:chapterId', chapterController.getStory)

router.post('/:id', authentication, chapterController.addChapterName)
router.put('/:id/:chapterId', authentication, chapterController.addChapterStory)
router.get('/:id/:chapterId', authentication, chapterController.getChapterStory)
router.delete('/:id/:chapterId', authentication, chapterController.deleteChapter)

module.exports = router;