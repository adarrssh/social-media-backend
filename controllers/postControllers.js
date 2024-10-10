const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);
    const {text} = req.body
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const newPost = new Post({
      author: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      text: text,
    });

    const post = await newPost.save();
    res.status(200).json({message:'Success',post});

  } catch (error) {
    console.error(error)
    res.status(500).send({message:'Internal Server Error', error:error.message});
  }
};

exports.createComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    if (!postId || !text) {
      return res.status(400).json({ msg: 'Post ID and text are required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = new Comment({
      post: postId,
      user: req.user.id,
      text: text,
    });

    const comment = await newComment.save();

    await (await comment.populate('user', 'username email')).populate();

    return res.status(200).json({ message: "Success", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.getFeedFromFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const allFriends = user.friends
    let allPosts = []

    for(let i = 0 ; i<allFriends.length; i++){
       const posts = await Post.find({ 'author.userId': allFriends[i].userId });
       allPosts = [...allPosts,...posts]
    }
   
    res.status(200).json({message:'Success',posts:allPosts});
  } catch (error) {
    console.error(error)
    res.status(500).send({message:'Error',error:error.message});
  }
};

exports.getFeedFromNonFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    const allFriends = user.friends
    let allComments = []



    for(let i = 0 ; i<allFriends.length; i++){
      const comments = await Comment.find({ user: allFriends[i].userId }).populate('post').populate('user', 'username email');
      allComments = [...allComments,...comments]
    }

    const uniquePosts = [];

    const filteredComments = allComments.filter(item => {
      if (uniquePosts.includes(item.post._id)) {
        return false;
      } else {
        uniquePosts.push(item.post._id);
        return true;
      }
    });

    const filteredPostFromNonFriends = filteredComments.filter(item => {
      const author = item.post.author.userId.toString(); 
      console.log(allFriends);
      console.log('author: ', author, allFriends.some(user => user.userId.toString() === author));
      
      return !allFriends.some(user => user.userId.toString() === author);
    });



    res.status(200).json({message:'Success',filteredPostFromNonFriends});
  } catch (error) {
    console.error(error)
    res.status(500).send({message:'Error',error:error.message});
  }
};
