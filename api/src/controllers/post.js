const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
  async index(req, res) {
    try {
      const posts = await Post.find().sort('-createdAt');

      res.json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async get(req, res) {},

  async create(req, res) {
    const { author, location, description, hashtags } = req.body;
    const { filename: image, path: imagePath, destination } = req.file;

    const [name, ext] = image.split('.');
    const filename = `${name}.jpg`;

    try {
      await sharp(imagePath)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(destination, 'resized', filename));

      fs.unlinkSync(imagePath);

      const post = await Post.create({ author, location, description, hashtags, image: filename });

      req.io.emit('post', post);

      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async delete(req, res) {},

  async update(req, res) {}
};
