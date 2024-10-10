const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPost, createComment, getFeedFromFriends, getFeedFromNonFriends } = require('../controllers/postControllers');

router.post('/create', auth, createPost);
router.post('/comment', auth, createComment);
router.get('/friend-posts', auth, getFeedFromFriends);
router.get('/non-friend-posts', auth, getFeedFromNonFriends);

module.exports = router;
