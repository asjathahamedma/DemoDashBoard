"use client";

import { useBorrower } from "@/components/BorrowerContext";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { apiData } from "@/lib/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function BorrowerDetail() {
  const { activeBorrowerId } = useBorrower();
  const detailEndpoint = apiData.endpoints.find(
    (e) => e.name === "Get Borrower Detail"
  );

  if (!detailEndpoint) return <div>No borrower details</div>;

  const borrowers = detailEndpoint.response as {
    id: string;
    name: string;
    email: string;
    phone: string;
    loan_amount: number;
    status: string;
    employment: string;
    income: number;
    existing_loan: number;
    credit_score: number;
    source_of_funds: string;
    risk_signal: string;
    ai_flags: string[];
  }[];

  // Always show the first borrower if none is selected
  const borrower =
    borrowers.find((b) => b.id === activeBorrowerId) || borrowers[0];

  return (
    <Card data-testid="card-borrower-detail">
      <CardHeader>
        <CardTitle data-testid="borrower-name">{borrower.name}</CardTitle>
        <CardDescription data-testid="borrower-email">
          {borrower.email}
        </CardDescription>
        <div className="mt-1">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {borrower.status}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p>
            <strong>Phone:</strong> {borrower.phone}
          </p>
          <p>
            <strong>Employment:</strong> {borrower.employment}
          </p>
          <p>
            <strong>Existing Loan:</strong> $
            {borrower.existing_loan.toLocaleString()}
          </p>
          <p>
            <strong>Credit Score:</strong> {borrower.credit_score}
          </p>
          {borrower.risk_signal && (
            <div className="text-yellow-500 flex items-center mt-1">
              <span>⚠️</span> {borrower.risk_signal}
            </div>
          )}
        </div>

        {borrower.ai_flags?.length > 0 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="ai-flags">
              <AccordionTrigger data-testid="ai-explainability-trigger">
                AI Explainability
              </AccordionTrigger>
              <AccordionContent>
                {borrower.ai_flags.map((flag, index) => (
                  <div
                    data-testid={`ai-flag-${index}`}
                    key={flag}
                    className="text-red-500 flex items-center"
                  >
                    <span>⚠️</span> {flag}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>

      <CardFooter className="flex flex-col md:flex-row gap-2 md:justify-between items-start md:items-center">
        <div className="flex flex-wrap gap-2">
          <Button
            data-testid="request-documents-btn"
            onClick={() => console.log("Requesting Documents")}
          >
            Request Documents
          </Button>
          <Button
            data-testid="sending-to-valuer-btn"
            variant="secondary"
            onClick={() => console.log("Sending to Valuer")}
          >
            Send to Valuer
          </Button>
          <Button
            data-testid="approve-btn"
            variant="secondary"
            onClick={() => console.log("Approving Loan")}
          >
            Approve
          </Button>
          <Button
            data-testid="escalate-btn"
            variant="destructive"
            disabled={borrower.credit_score > 650}
            onClick={() => console.log("Escalating to Credit Committee")}
          >
            Escalate to Credit Committee
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
