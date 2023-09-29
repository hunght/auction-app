// pages/index.tsx

import React from "react";
import Header from "~/components/header";
import Loading from "~/components/loading";

import { useAuthRedirect } from "~/hooks/useAuthRedirect";

interface AuctionItem {
  id: number;
  name: string;
  currentPrice: number;
  duration: string;
}

const Home: React.FC = () => {
  const { user, isFetching, isError } = useAuthRedirect();
  console.log("isError", isError);
  console.log("isFetching", isFetching);
  const auctionItems: AuctionItem[] = [
    { id: 1, name: "Item 1", currentPrice: 50, duration: "1d" },
    { id: 2, name: "Item 2", currentPrice: 75, duration: "2d" },
    // Add more auction items as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Current Price</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Bid</th>
          </tr>
        </thead>
        <tbody>
          {auctionItems.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">${item.currentPrice}</td>
              <td className="px-4 py-2">{item.duration}</td>
              <td className="px-4 py-2">
                <button className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600">
                  Bid
                </button>
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
