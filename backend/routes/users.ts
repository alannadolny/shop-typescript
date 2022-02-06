import express from 'express';
import * as jwt from 'jsonwebtoken';
const router = express.Router();
const User = require('../models/User');

interface Person {
  login: String;
}

const authenticate = (req, res, next) => {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];
  if (token === null) return res.status(401);
  jwt.verify(token, process.env.SECRET_TOKEN || 'token', (err, login) => {
    if (err) return res.status(403);
    req.login = login;
    next();
  });
};

require('dotenv').config();

router.post('/register', async (req, res) => {
  try {
    await new User({
      login: req.body.login,
      email: req.body.email,
      password: req.body.password,
    }).save();
    const newUser: Person = { login: req.body.login };
    const token = jwt.sign(newUser, process.env.SECRET_TOKEN || 'token');
    res.send(token);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      login: req.body.login,
      password: req.body.password,
    });
    if (!user) return res.status(404);
    else {
      const user: Person = { login: req.body.login };
      const token = jwt.sign(user, process.env.SECRET_TOKEN || 'token');
      return res.send(token);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
