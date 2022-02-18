import express from 'express';
import * as jwt from 'jsonwebtoken';

export function verifyToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const header: string = req.headers.cookie
    ? req.headers.cookie.split('authorization=')[1]
    : undefined;
  const token: string = header && header.split(';')[0];
  if (token === undefined) return res.status(401).send('invalid token');
  jwt.verify(
    token,
    process.env.SECRET_TOKEN || 'token',
    (err: jwt.VerifyErrors, login: jwt.JwtPayload) => {
      if (err) return res.status(403);
      req.body.login = login.login;
      next();
    }
  );
}

export function checkRequestMethod(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const allowedMethod: Array<string> = [
    'OPTIONS',
    'HEAD',
    'CONNECT',
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
  ];
  if (!allowedMethod.includes(req.method))
    return res.status(405).send('not allowed method');
  next();
}
