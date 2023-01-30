import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  const tokenWithBearer = req.headers.authorization || '';
  const pureToken = tokenWithBearer.replace(/Bearer\s?/, '');

  if (!pureToken) {
    return res.status(403).json({
      message: 'No access'
    });
  }

  try {
    const decodedToken = jwt.verify(pureToken, 'secret-projects');
    req.userId = decodedToken._id;
    next();
  } catch (err) {
    console.log('No access', err)
    return res.status(403).json({
      message: 'No access'
    });
  }
}

export default checkAuth;
