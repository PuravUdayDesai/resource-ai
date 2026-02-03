import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import { cn } from "@/lib/utils";

export type VerificationStatus = "verified" | "conditional" | "not-verified";

interface AIVerifiedBadgeProps {
  status: VerificationStatus;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const statusConfig = {
  verified: {
    icon: ShieldCheck,
    label: "AI Verified",
    bgClass: "bg-success/10 hover:bg-success/20",
    textClass: "text-success",
    borderClass: "border-success/20",
    tooltip: "Verified using ReSource AI quality analysis based on visual inspection, contamination detection, and batch consistency.",
  },
  conditional: {
    icon: ShieldAlert,
    label: "Conditionally Verified",
    bgClass: "bg-warning/10 hover:bg-warning/20",
    textClass: "text-warning",
    borderClass: "border-warning/20",
    tooltip: "Conditionally verified. Some quality parameters require manual review or additional documentation.",
  },
  "not-verified": {
    icon: ShieldX,
    label: "Not Verified",
    bgClass: "bg-destructive/10 hover:bg-destructive/20",
    textClass: "text-destructive",
    borderClass: "border-destructive/20",
    tooltip: "This batch has not passed AI quality verification. Manual inspection recommended before procurement.",
  },
};

const sizeConfig = {
  sm: {
    badge: "text-xs px-2 py-0.5",
    icon: "h-3 w-3",
  },
  md: {
    badge: "text-sm px-2.5 py-1",
    icon: "h-4 w-4",
  },
  lg: {
    badge: "text-sm px-3 py-1.5",
    icon: "h-5 w-5",
  },
};

const AIVerifiedBadge = ({
  status,
  size = "md",
  showLabel = true,
  className,
}: AIVerifiedBadgeProps) => {
  const config = statusConfig[status];
  const sizeStyles = sizeConfig[size];
  const Icon = config.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              config.bgClass,
              config.textClass,
              config.borderClass,
              sizeStyles.badge,
              "cursor-help transition-colors",
              className
            )}
          >
            <Icon className={cn(sizeStyles.icon, showLabel && "mr-1")} />
            {showLabel && <span>{config.label}</span>}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-center">
          <p className="text-sm">{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AIVerifiedBadge;
