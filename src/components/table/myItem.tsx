import React, { useState } from "react";
import { api } from "~/utils/api";

import Loading from "../loading";

import { Switch } from "~/components/ui/switch";

const MyItemTable: React.FunctionComponent = () => {
  const { data, isLoading, isFetching } = api.item.getMyItems.useQuery({
    limit: 10,
    page: 0,
  });
  const { mutateAsync, isLoading: isUpdateItem } =
    api.item.update.useMutation();

  const utils = api.useContext();
  const items = data?.items;

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Current Price</th>
          <th className="px-4 py-2 text-left">Create At</th>
          <th className="px-4 py-2 text-left">End Time</th>
          <th className="px-4 py-2 text-left">Publish</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-2">{item.name}</td>
            <td className="px-4 py-2">${item.currentPrice}</td>
            <td className="px-4 py-2">{item.createdAt.toLocaleString()}</td>
            <td className="px-4 py-2">
              {item.auctionEndTime.toLocaleString()}
            </td>
            <td className="px-4 py-2">
              {item.status === "COMPLETED" ? (
                <p>{item.status}</p>
              ) : (
                <Switch
                  checked={item.status === "PUBLISHED"}
                  onCheckedChange={(value) => {
                    void mutateAsync({
                      id: item.id,
                      status: !value ? "DRAFT" : "PUBLISHED",
                    }).then(() => {
                      void utils.item.getMyItems.invalidate();
                      void utils.item.getAll.invalidate();
                    });
                  }}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <Loading isLoading={isUpdateItem || (!isLoading && isFetching)} />
    </table>
  );
};

export default MyItemTable;
