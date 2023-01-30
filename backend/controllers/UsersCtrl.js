import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserSchema from "../models/User.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Bad request data'
      });
    }

    const user = await UserSchema.findOne( { email: email } );

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        error: 'Incorrect password'
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, 'secret-projects', {
      expiresIn: '24h',
    })

    const { passwordWithHash, ...userData } = user._doc;

    res.status(200).json({
      ...userData,
      token,
    });

  } catch (err) {
    console.log('login error: ', err);
    return res.status(500).json({ error: 'Can not login' });
  }
}


export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Incorrect data' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const doc = new UserSchema({
      email: email,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign({
      _id: user._id
    }, 'secret-projects', {
      expiresIn: '1d',
    });

    const { passwordWithHash, ...userData } = user._doc;

    res.status(200).json({
      ...userData,
      token,
    });

  } catch (err) {
      console.log('register error: ', err);
      return res.status(500).json({ error: 'Can not register, this user already registered or server error' });
  }
}

export const getUser = async (req, res) => {
  try {
    const tokenWithBearer = req.headers.authorization || '';

    if (!tokenWithBearer) {
      return res.status(403).json({
        message: 'No access'
      });
    }

    const pureToken = tokenWithBearer.replace(/Bearer\s?/, '');

    if (!pureToken) {
      return res.status(403).json({
        message: 'No access'
      });
    }

    try {
      const decodedToken = jwt.verify(pureToken, 'secret-projects');

      let userId = decodedToken._id;

      if (!userId) {
        return res.status(400).json({
          error: 'No user id'
        });
      }

      const user = await UserSchema.findById(userId);

      if (!user) {
        return res.status(404).json({
          userData: {},
          message: 'No user with this id'
        });
      }

      const { passwordHash, ...userData } = user._doc;

      res.status(200).json({
        ...userData,
      });
    } catch (err) {
      return res.status(403).json({
        message: 'No access'
      });
    }
  } catch (err) {
    console.log('getUserInfo error: ', err);
    return res.status(500).json({ error: 'Can not get current user info' });
  }
}


export const getAllUsers = async (req, res) => {
  try {
    await UserSchema
      .find()
      .sort({ email: 1 })
      .then(users => res.status(200).json(users))
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ success: false, err: err });
      });
  } catch (err) {
    console.log('getAllProjects error: ', err);
    return res.status(500).json({ success: false, err: 'Getting all users server error' });
  }
}