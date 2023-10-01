// pages/index.tsx

import React from "react";
import BidItemDialog from "~/components/bid-item-dialog";
import Header from "~/components/header";
import Loading from "~/components/loading";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import OnGoingTable from "~/components/table/ongoing";
import CompletedTable from "~/components/table/completed";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="ongoing" className="container mx-auto p-4">
        <TabsList>
          <TabsTrigger value="ongoing">On going</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing">
          <OnGoingTable status="PUBLISHED" />
        </TabsContent>
        <TabsContent value="completed">
          <CompletedTable status="COMPLETED" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
