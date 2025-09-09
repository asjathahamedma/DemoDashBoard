"use client";

import { BorrowerProvider } from "@/components/BorrowerContext";
import BorrowerPipeline from "@/components/BorrowerPipeline";
import BorrowerDetail from "@/components/BorrowerDetail";
import BrokerOverview from "@/components/BrokerOverview";

export default function Home() {
  return (
    <BorrowerProvider>
      <div className="p-4 sm:p-6 flex flex-col items-center w-full">
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
            <BorrowerPipeline data-testid="card-borrower-pipeline" />
            <BorrowerDetail data-testid="card-borrower-detail" />
            <BrokerOverview data-testid="card-broker-overview" />
        </div>
      </div>
    </BorrowerProvider>
  );
}
