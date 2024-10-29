import User from '../../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ 'message': 'Username and password are required' });
  }

  const foundUser = await User.findOne({ username: username }).exec();
  if (!foundUser) {
    return res.sendStatus(401);
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const accessToken = jwt.sign(
      { "UserInfo": 
        { "username": foundUser.username } 
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1hr' }
    );
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1w' }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None', secure: true });
    return res.json({ message: 'success' });
  } else {
    return res.sendStatus(401);
  }
};
