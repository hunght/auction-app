import { date, z } from "zod";

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
          currentPrice: input.startingPrice,
          status: "PUBLISHED",
        },
      });
      return {
        item,
      };
    }),
  bidItem: protectedProcedure
    .input(z.object({ id: z.number(), price: z.number() }))
    .mutation(async ({ input, ctx }) => {
      // Make transaction here to update bid and then update item
      const result = await ctx.db.$transaction(
        async (tx) => {
          const item = await tx.item.findUnique({
            where: {
              id: input.id,
              auctionEndTime: { gt: new Date() },
              status: "PUBLISHED",
            },
            include: {
              bids: { where: { userId: ctx.user.userId, status: "ACTIVE" } },
            },
          });
          if (!item) {
            throw new Error("Item not found");
          }
          if (item.auctionEndTime < new Date()) {
            throw new Error("Auction ended");
          }
          if (item.startingPrice > input.price) {
            throw new Error("Bid price must be greater than starting price");
          }
          if (item.currentPrice > input.price) {
            throw new Error("Bid price must be greater than current price");
          }

          // 1. Inactived previous bid of the sender and return money back to sender.
          for (const iterator of item.bids) {
            await tx.user.update({
              data: {
                balance: {
                  increment: iterator.amount,
                },
              },
              where: { id: ctx.user.userId },
            });
            await tx.bid.update({
              data: {
                status: "DELETED",
              },
              where: { id: iterator.id },
            });
          }

          // 2. Update the sender's balance.
          const sender = await tx.user.update({
            data: {
              balance: {
                decrement: input.price,
              },
            },
            where: { id: ctx.user.userId },
          });
          if (!sender) {
            throw new Error("User not found");
          }
          // 2. Verify that the sender's balance didn't go below zero.
          if (sender.balance < 0) {
            throw new Error(
              `${sender.email} doesn't have enough to send ${input.price}`,
            );
          }
          const bid = await tx.bid.create({
            data: {
              amount: input.price,
              itemId: input.id,
              userId: ctx.user.userId,
            },
          });

          const updatedItem = await tx.item.update({
            data: {
              currentPrice: input.price,
            },
            where: { id: input.id },
          });

          return {
            sender,
            bid,
            item: updatedItem,
          };
        },
        {
          maxWait: 5000, // default: 2000
          timeout: 10000, // default: 5000
        },
      );

      return {
        bid: result.bid,
        item: result.item,
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
