import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Download, 
  Share2, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Beaker,
  Eye,
  Clock,
  Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";
import AIVerifiedBadge, { VerificationStatus } from "./AIVerifiedBadge";

interface AIQualityReportData {
  batchId: string;
  verificationStatus: VerificationStatus;
  confidenceScore: number;
  analysisTimestamp: string;
  modelVersion: string;
  purityPercentage: number;
  contaminantIndicators: {
    type: string;
    level: "none" | "trace" | "minor" | "significant";
    details: string;
  }[];
  visualAnomalies: {
    detected: boolean;
    count: number;
    description: string;
  };
  verdict: string;
}

interface AIQualityReportProps {
  report: AIQualityReportData;
  className?: string;
}

const getContaminantColor = (level: string) => {
  switch (level) {
    case "none": return "text-success";
    case "trace": return "text-success";
    case "minor": return "text-warning";
    case "significant": return "text-destructive";
    default: return "text-muted-foreground";
  }
};

const AIQualityReport = ({ report, className }: AIQualityReportProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    // Simulate PDF download
    const content = `AI Quality Report - Batch ${report.batchId}\n\nVerdict: ${report.verdict}\nConfidence: ${report.confidenceScore}%\nPurity: ${report.purityPercentage}%\n\nGenerated: ${report.analysisTimestamp}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-quality-report-${report.batchId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `AI Quality Report - Batch ${report.batchId}`,
        text: `View AI Quality Report for Batch ${report.batchId}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("gap-2", className)}>
          <FileText className="h-4 w-4" />
          View AI Quality Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FileText className="h-5 w-5" />
            AI Quality Report
            <AIVerifiedBadge status={report.verificationStatus} size="sm" />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Section */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardContent className="pt-4">
              <div className="flex items-start gap-4">
                {report.verificationStatus === "verified" ? (
                  <CheckCircle2 className="h-8 w-8 text-success flex-shrink-0" />
                ) : report.verificationStatus === "conditional" ? (
                  <AlertTriangle className="h-8 w-8 text-warning flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">AI Verdict</h3>
                  <p className="text-muted-foreground">{report.verdict}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Confidence:</span>
                      <Badge variant="secondary" className="font-bold">
                        {report.confidenceScore}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Dimensions */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Beaker className="h-4 w-4" />
              Quality Dimensions
            </h4>

            {/* Purity */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Purity Percentage</span>
                <Badge 
                  variant="outline" 
                  className={cn(
                    report.purityPercentage >= 95 ? "bg-success/10 text-success border-success/20" :
                    report.purityPercentage >= 85 ? "bg-warning/10 text-warning border-warning/20" :
                    "bg-destructive/10 text-destructive border-destructive/20"
                  )}
                >
                  {report.purityPercentage}%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Measured purity level of recycled plastic material
              </p>
            </div>

            {/* Contamination Indicators */}
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-3">Contamination Indicators</h5>
              <div className="space-y-2">
                {report.contaminantIndicators.map((indicator, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span>{indicator.type}</span>
                    <div className="flex items-center gap-2">
                      <span className={cn("capitalize", getContaminantColor(indicator.level))}>
                        {indicator.level}
                      </span>
                      <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Anomaly Detection */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium">Visual Anomaly Detection</span>
                </div>
                <Badge 
                  variant="outline"
                  className={cn(
                    report.visualAnomalies.detected 
                      ? "bg-warning/10 text-warning border-warning/20"
                      : "bg-success/10 text-success border-success/20"
                  )}
                >
                  {report.visualAnomalies.detected ? `${report.visualAnomalies.count} Detected` : "None Detected"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {report.visualAnomalies.description}
              </p>
            </div>
          </div>

          <Separator />

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Timestamp</p>
                <p className="font-medium">{report.analysisTimestamp}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Model Version</p>
                <p className="font-medium">{report.modelVersion}</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground flex items-start gap-2">
              <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
              This report is generated by ReSource AI and is intended to support sourcing decisions. 
              It does not replace professional quality assurance processes.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIQualityReport;
export type { AIQualityReportData };
