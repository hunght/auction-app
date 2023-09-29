import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createItemSchema } from "~/zod-schema/item";

export const itemRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createItemSchema)
    .mutation(async ({ input, ctx }) => {
      console.log("ctx.user", ctx.user);
      const item = await ctx.db.item.create({
        data: {
          name: input.name,
          startingPrice: input.startingPrice,
          createdById: ctx.user.userId,
          auctionEndTime: input.timeWindow,
        },
      });
      return {
        item,
      };
    }),
});
