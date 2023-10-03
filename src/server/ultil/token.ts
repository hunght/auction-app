import * as jwt from 'jsonwebtoken';
import { env } from '~/env.mjs';

export function generateUniqueToken(): string {
  const rand = () => Math.random().toString(36);
  const token = rand() + rand();
  return token;
}
// Function to generate a JWT token
export const generateToken = (userId: number): string => {
  // Token payload (you can include additional data if needed)
  const payload = {
    userId: userId,
  };

  // Options for the JWT token
  const options = {
    expiresIn: '2h', // Token expiration time (e.g., 1 hour)
  };
  console.log('[generateToken] payload', payload);
  console.log('[generateToken] env.JWT_SECRET', env.JWT_SECRET);
  // Sign the token with your secret key
  const token = jwt.sign(payload, env.JWT_SECRET, options);

  return token;
};

type UserToken = {
  userId: number;
};

// Function to decode and verify a JWT token
export const decodeAndVerifyJwtToken = (token?: string) => {
  try {
    if (!token) {
      throw new Error('No token provided');
    }
    // Decode the JWT token
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded as UserToken;
  } catch (err) {
    console.log('[decodeAndVerifyJwtToken] token', token);
    console.log('[decodeAndVerifyJwtToken] env.JWT_SECRET', env.JWT_SECRET);
    throw err;
  }
};
