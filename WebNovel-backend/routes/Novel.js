const express = require('express');
const router = express.Router();
const novelController = require('../controllers/Novel')
const passport = require('passport');

const authentication = passport.authenticate("jwt", { session: false });

router.get('/mynovel', authentication, novelController.getNovel)
router.get('/allNovel', novelController.getAllNovel)
router.get('/randomNovel', novelController.getRandomNovel)
router.post('/createnovel', authentication, novelController.addNovel)
router.put('/createnovel/:id', authentication, novelController.editTitleNovel)
router.delete('/createnovel/:id', authentication, novelController.deleteNovel)

module.exports = router;