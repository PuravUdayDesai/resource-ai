import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ComplianceTrackerProps {
  currentPercentage: number;
  requiredPercentage: number;
  totalUsed: number;
  recycledUsed: number;
}

const ComplianceTracker = ({
  currentPercentage,
  requiredPercentage,
  totalUsed,
  recycledUsed,
}: ComplianceTrackerProps) => {
  const isCompliant = currentPercentage >= requiredPercentage;
  const progressValue = (currentPercentage / requiredPercentage) * 100;

  return (
    <Card className="shadow-[var(--shadow-soft)]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recycled Plastic Compliance</span>
          {isCompliant ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : (
            <AlertCircle className="h-5 w-5 text-warning" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-3xl font-bold text-foreground">
                {currentPercentage}%
              </p>
              <p className="text-sm text-muted-foreground">
                Current recycled content
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-muted-foreground">
                {requiredPercentage}%
              </p>
              <p className="text-xs text-muted-foreground">Required</p>
            </div>
          </div>
          <Progress 
            value={Math.min(progressValue, 100)} 
            className="h-3"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Plastic Used</p>
            <p className="text-xl font-semibold text-foreground">
              {totalUsed.toLocaleString()} kg
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Recycled Content</p>
            <p className="text-xl font-semibold text-success">
              {recycledUsed.toLocaleString()} kg
            </p>
          </div>
        </div>

        {!isCompliant && (
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-md">
            <p className="text-sm text-foreground">
              You need <span className="font-semibold">{((requiredPercentage - currentPercentage) / 100 * totalUsed).toFixed(0)} kg</span> more recycled plastic to meet the 25% requirement.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceTracker;
