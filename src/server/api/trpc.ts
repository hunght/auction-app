import { initTRPC, TRPCError } from "@trpc/server";
import { H } from "@highlight-run/node";
import superjson from "superjson";
import { type Context } from "../context";
import { env } from "~/env.mjs";
H.init({ projectID: env.HIGHT_LIGHT_IO_KEY });
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
