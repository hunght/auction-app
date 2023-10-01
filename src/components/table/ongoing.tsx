import React, { useState } from "react";
import { api } from "~/utils/api";
import BidItemDialog from "../bid-item-dialog";
import Loading from "../loading";
import { intervalToDuration } from "date-fns";

// get duration from date to now plus offset in seconds
const getDuration = (startDate: Date) => {
  const now = new Date();
  const duration = intervalToDuration({
    end: now,
    start: startDate,
  });
  console.log("duration", startDate.getTime());
  return `${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
};
const getCountdown = (endDate: Date) => {
  const now = new Date();
  const duration = intervalToDuration({
    start: now,
    end: endDate,
  });
  console.log("duration", endDate.getTime());
  return `${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
};

const OnGoingTable: React.FunctionComponent<{
  status: "PUBLISHED" | "COMPLETED";
}> = ({ status }) => {
  const { data, isLoading, isFetching } = api.item.getAll.useQuery({
    limit: 10,
    page: 0,
    filter: { status },
  });
  const items = data?.items;
  const [offsetSeconds, setOffsetSeconds] = useState(0);
  //update time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setOffsetSeconds((offsetSeconds) => offsetSeconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Current Price</th>
          <th className="px-4 py-2 text-left">Duration</th>
          <th className="px-4 py-2 text-left">Countdown</th>
          <th className="px-4 py-2 text-left">Bid</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-2">{item.name}</td>
            <td className="px-4 py-2">${item.currentPrice}</td>
            <td className="px-4 py-2">{getDuration(item.createdAt)}</td>
            <td className="px-4 py-2">{getCountdown(item.auctionEndTime)}</td>
            <td className="px-4 py-2">
              <BidItemDialog item={item} />
            </td>
          </tr>
        ))}
      </tbody>
      <Loading isLoading={!isLoading && isFetching} />
    </table>
  );
};

export default OnGoingTable;
