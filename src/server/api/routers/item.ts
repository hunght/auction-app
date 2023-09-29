import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const itemRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        startPrice: z.number(),
        auctionEndTime: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      console.log("ctx.user", ctx.user);
      const item = await ctx.db.item.create({
        data: {
          name: input.name,
          startingPrice: input.startPrice,
          createdById: ctx.user.userId,
          auctionEndTime: input.auctionEndTime,
        },
      });
      return {
        item,
      };
    }),
});
