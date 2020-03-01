const express = require('express');
const multer = require('multer');
const router = express.Router();
const postController = require('../controllers/post');
const likeController = require('../controllers/like');

const multerConfig = require('../config/multer');
const upload = multer(multerConfig);

router
  .get('/posts', postController.index)
  .post('/posts', upload.single('image'), postController.create)
  .post('/posts/:id/like', likeController.create);

module.exports = router;
