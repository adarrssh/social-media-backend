const User = require('../models/User');

exports.sendFriendRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const friend = await User.findById(req.body.friendId);

    if (!friend) {
      return res.status(400).json({ msg: 'Invalid request' });
    }

    if(user.friends.some(f => f.userId.equals(friend.id))){
      return res.status(400).json({ msg: 'Already a friend' });
    }

    if (friend.friendRequests.some(f => f.userId.equals(user.id))) {
      return res.status(400).json({ msg: 'Friend request already sent' });
    }

    friend.friendRequests.push({ userId: user.id, username: user.username, email: user.email })
    await friend.save();
    return res.status(200).json({ message: 'Friend request sent' });
  } catch (error) {
    console.error(error)
    res.status(500).send({error:'Internal Server Error', message:error.message});
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const friend = await User.findById(req.body.friendId);

    const requestIndex = user.friendRequests.findIndex(f => f.userId.equals(friend.id));
    if (requestIndex === -1) {
      return res.status(400).json({ msg: 'Invalid request' });
    }

    const friendRequest = user.friendRequests[requestIndex];
    user.friendRequests.splice(requestIndex, 1);
    user.friends.push(friendRequest);
    friend.friends.push({ userId: user.id, username: user.username, email: user.email });

    await user.save();
    await friend.save();
    res.json({ msg: 'Friend request accepted' });
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error');
  }
};

exports.rejectFriendRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const friend = await User.findById(req.body.friendId);

    const requestIndex = user.friendRequests.findIndex(f => f.userId.equals(friend.id));

    if (requestIndex === -1) {
      return res.status(400).json({ msg: 'Invalid request' });
    }

    user.friendRequests.splice(requestIndex, 1);
    await user.save();
    return res.status(200).json({ msg: 'Friend request rejected' });
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error');
  }
};
