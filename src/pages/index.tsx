// pages/index.tsx

import React from "react";
import Header from "~/components/header";
import Loading from "~/components/loading";

import { useAuthRedirect } from "~/hooks/useAuthRedirect";
import { api } from "~/utils/api";

const Home: React.FC = () => {
  const { user, isFetching, isError } = useAuthRedirect();
  console.log("isError", isError);
  console.log("isFetching", isFetching);

  const { data, isLoading } = api.item.getAll.useQuery({ limit: 10, page: 0 });
  const items = data?.items;
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
          {items?.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">${item.startingPrice}</td>
              <td className="px-4 py-2">{item.auctionEndTime.toISOString()}</td>
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
