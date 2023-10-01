import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const items = await db.item.findMany({
    where: { auctionEndTime: { lt: new Date() }, status: "PUBLISHED" },
  });
  //TODO: handle batch update
  const promises = items.map(async (item) => {
    try {
      await db.$transaction(
        async (tx) => {
          const bids = await tx.bid.findMany({
            where: { itemId: item.id },
            orderBy: { amount: "desc" },
            take: 1,
          });
          const bid = bids[0];
          if (!bid) {
            //handle no bid then set status to COMPLETED
            await tx.item.update({
              where: { id: item.id },
              data: { status: "COMPLETED" },
            });
            return;
          }
          const sender = await tx.user.findUnique({
            where: { id: bid.userId },
          });
          if (!sender) {
            throw new Error("Sender not found");
          }

          await tx.item.update({
            where: { id: item.id },
            data: { status: "COMPLETED", winnerId: sender.id },
          });

          const transaction = await tx.transaction.create({
            data: {
              amount: bid.amount,
              senderId: sender.id,
              bidId: bid.id,
              receiverId: item.createdById,
            },
          });

          //no need update sender balance because we already did when they bid item

          //update receiver balance
          const receiver = await tx.user.findUnique({
            where: { id: item.createdById },
          });
          if (!receiver) {
            throw new Error("Receiver not found");
          }

          await tx.user.update({
            where: { id: receiver.id },
            data: { balance: receiver.balance + bid.amount },
          });

          return transaction;
        },
        {
          maxWait: 5000, // default: 2000
          timeout: 10000, // default: 5000
        },
      );
      return;
    } catch (error) {
      console.error(`[cron/minutes] item.id= ${item.id}`, error);
      throw error;
    }
  });
  const transactions = await Promise.allSettled(promises);
  res.status(200).json({ count: transactions.length });
}
