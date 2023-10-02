import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const accountRouter = createTRPCRouter({
  deposit: protectedProcedure
    .input(
      z.object({
        amount: z.coerce.number().min(0).max(1000000),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.user.userId,
        },
      });

      if (!user) {
        throw new Error("No user");
      }

      const updatedUser = await ctx.db.user.update({
        data: {
          balance: {
            increment: input.amount,
          },
        },
        where: { id: ctx.user.userId },
      });
      return {
        user: updatedUser,
      };
    }),
});
