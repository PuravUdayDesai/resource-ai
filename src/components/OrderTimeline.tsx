import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, Package, Truck, ShieldCheck } from "lucide-react";

interface TimelineStep {
  id: string;
  label: string;
  status: "completed" | "active" | "pending";
  timestamp?: string;
  icon: any;
  details?: string;
}

interface OrderTimelineProps {
  currentStep: number;
  steps?: TimelineStep[];
}

const OrderTimeline = ({ currentStep, steps }: OrderTimelineProps) => {
  const defaultSteps: TimelineStep[] = [
    {
      id: "confirmed",
      label: "Order Confirmed",
      status: currentStep >= 1 ? "completed" : "pending",
      timestamp: currentStep >= 1 ? "Dec 02, 2025 10:30 AM" : undefined,
      icon: CheckCircle2,
      details: "Purchase order generated and sent to supplier"
    },
    {
      id: "processing",
      label: "Processing",
      status: currentStep === 2 ? "active" : currentStep > 2 ? "completed" : "pending",
      timestamp: currentStep >= 2 ? "Dec 03, 2025 09:15 AM" : undefined,
      icon: Package,
      details: "Material preparation and quality checks in progress"
    },
    {
      id: "qc",
      label: "QC Verification",
      status: currentStep === 3 ? "active" : currentStep > 3 ? "completed" : "pending",
      timestamp: currentStep >= 3 ? "Dec 10, 2025 02:45 PM" : undefined,
      icon: ShieldCheck,
      details: "Quality control tests passed - Material QC approved"
    },
    {
      id: "dispatch",
      label: "Ready for Dispatch",
      status: currentStep === 4 ? "active" : currentStep > 4 ? "completed" : "pending",
      timestamp: currentStep >= 4 ? "Dec 15, 2025 11:00 AM" : undefined,
      icon: Package,
      details: "Material packed and ready for shipment"
    },
    {
      id: "transit",
      label: "In Transit",
      status: currentStep === 5 ? "active" : currentStep > 5 ? "completed" : "pending",
      timestamp: currentStep >= 5 ? "Dec 16, 2025 08:30 AM" : undefined,
      icon: Truck,
      details: "Shipment in progress - Tracking #TRK-2024-5891"
    },
    {
      id: "delivered",
      label: "Delivered",
      status: currentStep >= 6 ? "completed" : "pending",
      timestamp: currentStep >= 6 ? "Dec 20, 2025 03:20 PM" : undefined,
      icon: CheckCircle2,
      details: "Material received at destination"
    }
  ];

  const timelineSteps = steps || defaultSteps;

  return (
    <div className="relative">
      {timelineSteps.map((step, index) => {
        const Icon = step.icon;
        const isLast = index === timelineSteps.length - 1;
        
        return (
          <div key={step.id} className="relative pb-8">
            {/* Connector Line */}
            {!isLast && (
              <div 
                className={`absolute left-5 top-10 w-0.5 h-full ${
                  step.status === "completed" 
                    ? "bg-success" 
                    : "bg-border"
                }`}
              />
            )}

            {/* Timeline Node */}
            <div className="flex items-start gap-4">
              {/* Icon Circle */}
              <div 
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                  step.status === "completed"
                    ? "bg-success border-success text-success-foreground"
                    : step.status === "active"
                    ? "bg-primary border-primary text-primary-foreground animate-pulse"
                    : "bg-background border-border text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className={`font-semibold ${
                    step.status === "active" ? "text-primary" : ""
                  }`}>
                    {step.label}
                  </h4>
                  {step.status === "completed" && (
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Completed
                    </Badge>
                  )}
                  {step.status === "active" && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      <Clock className="h-3 w-3 mr-1" />
                      In Progress
                    </Badge>
                  )}
                </div>
                
                {step.timestamp && (
                  <p className="text-sm text-muted-foreground mb-1">
                    {step.timestamp}
                  </p>
                )}
                
                {step.details && (
                  <p className="text-sm text-muted-foreground">
                    {step.details}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
