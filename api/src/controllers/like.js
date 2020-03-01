const Post = require('../models/Post');

module.exports = {
  async create(req, res) {
    const { id } = req.params;
    try {
      const post = await Post.findById(id);

      await post.update({
        like: post.likes++
      });

      await post.save();

      req.io.emit('like', post);

      res.json(post);
    } catch (error) {
      res.json(error);
    }
  }
};
