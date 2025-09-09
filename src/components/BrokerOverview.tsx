import { apiData } from "@/lib/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { ReactNode } from "react";
import { Switch } from "./ui/switch";
import { CheckCircle2, Circle } from "lucide-react";

export default function BrokerOverview() {
  const brokerEndpoint = apiData.endpoints.find(
    (e) => e.name === "Get Broker Info"
  );
  if (!brokerEndpoint) return <div>No broker data</div>;
  const broker = brokerEndpoint.response as {
    [x: string]: ReactNode;
    name: string;
    deals: number;
    approval_rate: string;
    pending: number;
  };

  const workflowEndpoint = apiData.endpoints.find(
    (e) => e.name === "Get Onboarding Workflow"
  );
  if (!workflowEndpoint) return <div>No workflow data</div>;
  const workflow = workflowEndpoint.response as { steps: string[] };

  return (
    <Card data-testid="card-broker-overview">
      <CardHeader>
        <CardTitle>{broker.name}</CardTitle>
        <CardDescription>Broker Overview</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{broker.deals}</div>
            <div>Deals</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{broker.approval_rate}</div>
            <div>Approval Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              ${broker.pending.toLocaleString()}
            </div>
            <div>Pending</div>
          </div>
        </div>

        {/* Onboarding Workflow */}
        <div>
          <h4 className="font-semibold text-sm sm:text-base">
            Onboarding Workflow
          </h4>
          <ol className="relative border-l-2 border-gray-300 ml-4 sm:ml-6 mt-2 sm:mt-3">
            {workflow.steps.map((step: string, index: number) => (
              <li key={index} className="mb-3 sm:mb-5 last:mb-0">
                <div className="absolute -left-3 sm:-left-3 mt-1">
                  {index <= 2 ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  ) : (
                    <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  )}
                </div>
                <div className="ml-6 sm:ml-8">
                  <h3 className="text-sm sm:text-base font-medium">
                    {index + 1}. {step}
                  </h3>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* AI Assistant Toggle */}
        <div>
          <label className="flex items-center gap-2">
            <Switch id="AI Assistant" />
            AI Assistant
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
