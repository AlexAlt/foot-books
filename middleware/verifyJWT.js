import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
  const cookies  = req.cookies;

  if (!cookies?.jwt) { return res.sendStatus(401) }

  jwt.verify(
    cookies.jwt, 
    process.env.REFRESH_TOKEN_SECRET, 
    (error, decoded) => {
      if (error) return res.sendStatus(403);
      req.username = decoded.username;
      next();
    }
  )
}
