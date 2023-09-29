import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createItemSchema } from "~/zod-schema/item";

export const itemRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createItemSchema)
    .mutation(async ({ input, ctx }) => {
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
  bidItem: protectedProcedure
    .input(z.object({ id: z.number(), price: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.db.bid.create({
        data: {
          amount: input.price,
          itemId: input.id,
          userId: ctx.user.userId,
        },
      });
      return {
        item,
      };
    }),
  getAll: protectedProcedure
    .input(z.object({ limit: z.number(), page: z.number() }))
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.item.findMany({
        take: input.limit,
        skip: input.page * input.limit,
        where: { auctionEndTime: { gt: new Date() } },
        orderBy: { createdAt: "desc" },
      });
      return {
        items,
      };
    }),
});
