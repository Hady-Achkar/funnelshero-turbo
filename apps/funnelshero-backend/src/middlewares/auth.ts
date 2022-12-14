import jwt from 'jsonwebtoken';

export async function authenticateUser(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  //@ts-ignore
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_V2, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  })
}