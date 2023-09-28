import crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { env } from "~/env.mjs";

export function generateUniqueToken(length = 32): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const token = buffer.toString("hex");
        resolve(token);
      }
    });
  });
}
// Function to generate a JWT token
export const generateToken = (userId: number): string => {
  // Token payload (you can include additional data if needed)
  const payload = {
    userId: userId,
  };

  // Options for the JWT token
  const options = {
    expiresIn: "6h", // Token expiration time (e.g., 1 hour)
  };

  // Sign the token with your secret key
  const token = jwt.sign(payload, env.JWT_SECRET, options);

  return token;
};
