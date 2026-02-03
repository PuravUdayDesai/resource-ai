import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Activity, AlertTriangle, BarChart3, History } from "lucide-react";
import AIVerifiedBadge, { VerificationStatus } from "./AIVerifiedBadge";

interface BatchQualityData {
  batchId: string;
  aiQualityScore: number;
  contaminationRisk: "low" | "medium" | "high";
  materialConsistency: number;
  historicalMatchScore: number;
  verificationStatus: VerificationStatus;
}

interface BatchQualityPanelProps {
  batch: BatchQualityData;
  className?: string;
}

const getRiskConfig = (risk: "low" | "medium" | "high") => {
  switch (risk) {
    case "low":
      return { label: "Low Risk", bgClass: "bg-success/10", textClass: "text-success", borderClass: "border-success/20" };
    case "medium":
      return { label: "Medium Risk", bgClass: "bg-warning/10", textClass: "text-warning", borderClass: "border-warning/20" };
    case "high":
      return { label: "High Risk", bgClass: "bg-destructive/10", textClass: "text-destructive", borderClass: "border-destructive/20" };
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "bg-success";
  if (score >= 60) return "bg-warning";
  return "bg-destructive";
};

const BatchQualityPanel = ({ batch, className }: BatchQualityPanelProps) => {
  const riskConfig = getRiskConfig(batch.contaminationRisk);

  return (
    <Card className={cn("shadow-[var(--shadow-soft)]", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4" />
            AI Quality Overview
          </CardTitle>
          <AIVerifiedBadge status={batch.verificationStatus} size="sm" />
        </div>
        <p className="text-xs text-muted-foreground">Batch ID: {batch.batchId}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI Quality Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">AI Quality Score</span>
            </div>
            <span className={cn(
              "text-sm font-bold",
              batch.aiQualityScore >= 80 ? "text-success" :
              batch.aiQualityScore >= 60 ? "text-warning" : "text-destructive"
            )}>
              {batch.aiQualityScore}/100
            </span>
          </div>
          <Progress 
            value={batch.aiQualityScore} 
            className="h-2"
            indicatorClassName={getScoreColor(batch.aiQualityScore)}
          />
        </div>

        {/* Contamination Risk */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Contamination Risk</span>
          </div>
          <Badge 
            variant="outline" 
            className={cn(riskConfig.bgClass, riskConfig.textClass, riskConfig.borderClass)}
          >
            {riskConfig.label}
          </Badge>
        </div>

        {/* Material Consistency */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Material Consistency</span>
            </div>
            <span className={cn(
              "text-sm font-bold",
              batch.materialConsistency >= 80 ? "text-success" :
              batch.materialConsistency >= 60 ? "text-warning" : "text-destructive"
            )}>
              {batch.materialConsistency}%
            </span>
          </div>
          <Progress 
            value={batch.materialConsistency} 
            className="h-2"
            indicatorClassName={getScoreColor(batch.materialConsistency)}
          />
        </div>

        {/* Historical Match Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Historical Match Score</span>
            </div>
            <span className={cn(
              "text-sm font-bold",
              batch.historicalMatchScore >= 80 ? "text-success" :
              batch.historicalMatchScore >= 60 ? "text-warning" : "text-destructive"
            )}>
              {batch.historicalMatchScore}%
            </span>
          </div>
          <Progress 
            value={batch.historicalMatchScore} 
            className="h-2"
            indicatorClassName={getScoreColor(batch.historicalMatchScore)}
          />
          <p className="text-xs text-muted-foreground">
            Compared to prior verified batches from this supplier
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchQualityPanel;
export type { BatchQualityData };
