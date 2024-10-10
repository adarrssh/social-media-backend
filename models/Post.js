const mongoose = require('mongoose');

const author = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const PostSchema = new mongoose.Schema({
  author: author,
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
