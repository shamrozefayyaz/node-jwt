import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';
import { hash } from 'bcryptjs';
import fs from "fs"
export const signJwt = (payload: Object, options: SignOptions = {}) => {
const privateKey = fs.readFileSync(config.get<string>('accessTokenPrivateKey'), "utf-8");
console.log(privateKey);
return jwt.sign(payload, privateKey, {
  ...(options && options),
  algorithm: "RS256",
});
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = Buffer.from(
      config.get<string>('accessTokenPublicKey'),
      'base64'
    ).toString('ascii');
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};