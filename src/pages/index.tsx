// pages/index.tsx

import React from "react";
import BidItemDialog from "~/components/bid-item-dialog";
import Header from "~/components/header";
import Loading from "~/components/loading";
import { api } from "~/utils/api";

const Home: React.FC = () => {
  const { data, isLoading, isFetching } = api.item.getAll.useQuery({
    limit: 10,
    page: 0,
  });
  const items = data?.items;
  return (
    <div className="container mx-auto p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Current Price</th>
            <th className="px-4 py-2 text-left">Duration</th>
            <th className="px-4 py-2 text-left">Bid</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">${item.currentPrice}</td>
              <td className="px-4 py-2">{item.auctionEndTime.toISOString()}</td>
              <td className="px-4 py-2">
                <BidItemDialog item={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Loading isLoading={isFetching} />
    </div>
  );
};

export default Home;
