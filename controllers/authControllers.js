const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {

    if(!username || !email || !password){
        return res.status(400).json({ message: 'Invalid Data' });
    }

    let user = await User.findOne({ email });

    if (user) {
        console.log(user)
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 })
    return res.status(200).json({message:'Success',token})
  } catch (error) {
    console.error(error)
    res.status(500).send({error:'Interval Server Error', message:error.message});
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 })
    return res.status(200).json({message:'Success',token})
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error');
  }
};
