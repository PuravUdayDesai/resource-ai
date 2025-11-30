import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  FileText, 
  Eye, 
  MessageSquare, 
  CheckCircle, 
  Package, 
  Truck, 
  CheckCircle2,
  CircleDot
} from "lucide-react";

type OrderStatus = 
  | "RFQ Sent"
  | "Quote Received"
  | "Under Review"
  | "Negotiation"
  | "Confirmed"
  | "In Production"
  | "In Transit"
  | "Delivered"
  | "Completed"
  | "Pending Approval"
  | "Cancelled";

interface StatusBadgeProps {
  status: OrderStatus;
  showIcon?: boolean;
}

const StatusBadge = ({ status, showIcon = true }: StatusBadgeProps) => {
  const getStatusConfig = (status: OrderStatus) => {
    const configs = {
      "RFQ Sent": {
        icon: FileText,
        className: "bg-info/10 text-info border-info/20",
      },
      "Quote Received": {
        icon: FileText,
        className: "bg-success/10 text-success border-success/20",
      },
      "Under Review": {
        icon: Eye,
        className: "bg-pending/10 text-pending border-pending/20",
      },
      "Negotiation": {
        icon: MessageSquare,
        className: "bg-pending/10 text-pending border-pending/20",
      },
      "Confirmed": {
        icon: CheckCircle,
        className: "bg-success/10 text-success border-success/20",
      },
      "In Production": {
        icon: Package,
        className: "bg-info/10 text-info border-info/20",
      },
      "In Transit": {
        icon: Truck,
        className: "bg-info/10 text-info border-info/20",
      },
      "Delivered": {
        icon: CheckCircle2,
        className: "bg-success/10 text-success border-success/20",
      },
      "Completed": {
        icon: CheckCircle2,
        className: "bg-muted text-muted-foreground border-border",
      },
      "Pending Approval": {
        icon: Clock,
        className: "bg-pending/10 text-pending border-pending/20",
      },
      "Cancelled": {
        icon: CircleDot,
        className: "bg-destructive/10 text-destructive border-destructive/20",
      },
    };

    return configs[status] || configs["Under Review"];
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {status}
    </Badge>
  );
};

export default StatusBadge;