import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { decodeAndVerifyJwtToken } from "./ultil/token";
import { db } from "./db";

export function createContext({ req, res }: CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  if (req.headers.authorization) {
    const arrayStr = req.headers.authorization.split(" ");
    const user = decodeAndVerifyJwtToken(arrayStr[1]);
    return { user, db };
  }
  return { user: null, db };
}
export type Context = inferAsyncReturnType<typeof createContext>;
