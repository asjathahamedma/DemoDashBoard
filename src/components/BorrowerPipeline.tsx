"use client";

import { useBorrower } from "@/components/BorrowerContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { apiData } from "@/lib/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function BorrowerPipeline() {
  const { setActiveBorrowerId } = useBorrower();
  const pipelineEndpoint = apiData.endpoints.find(
    (e) => e.name === "Get Borrower Pipeline"
  );

  if (!pipelineEndpoint) return <div>No pipeline data</div>;

  const pipeline = pipelineEndpoint.response as {
    new: {
      id: string;
      name: string;
      loan_type: string;
      amount: number;
      status: string;
    }[];
    in_review: {
      id: string;
      name: string;
      loan_type: string;
      amount: number;
      status: string;
    }[];
    approved: {
      id: string;
      name: string;
      loan_type: string;
      amount: number;
      status: string;
    }[];
  };

  return (
    <Card data-testid="card-borrower-pipeline">
      <CardHeader>
        <CardTitle>Borrower Pipeline</CardTitle>
        <CardDescription>
          Manage borrowers across different stages
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="new">
          <TabsList>
            <TabsTrigger value="new" data-testid="tab-new">
              New
            </TabsTrigger>
            <TabsTrigger value="in_review" data-testid="tab-in-review">
              In Review
            </TabsTrigger>
            <TabsTrigger value="approved" data-testid="tab-approved">
              Approved
            </TabsTrigger>
          </TabsList>

          {["new", "in_review", "approved"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              {pipeline[tab as keyof typeof pipeline]?.map((borrower) => (
                <div
                  key={borrower.id}
                  data-testid="borrower-card" // <-- use a single consistent testid
                  data-borrower-id={borrower.id} // <-- store the id separately for tests if needed
                  className="p-2 border-b cursor-pointer hover:bg-gray-200 transition-all duration-150"
                  onClick={() => setActiveBorrowerId(borrower.id)}
                >
                  <div className="font-medium">{borrower.name}</div>
                  <div className="text-sm text-gray-600">
                    {borrower.loan_type}
                  </div>
                  <div className="text-right font-semibold">
                    ${borrower.amount.toLocaleString()}
                  </div>
                  <span className="text-xs text-blue-800 bg-blue-100 px-2 py-1 rounded-full">
                    {borrower.status}
                  </span>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>

      <CardFooter>
        <p className="text-xs text-gray-500">
          Select a borrower to view details
        </p>
      </CardFooter>
    </Card>
  );
}
