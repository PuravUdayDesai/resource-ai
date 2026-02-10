import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import alexMascot from "@/assets/alex-mascot.png";

interface AlexMascotProps {
  message: string;
  className?: string;
  compact?: boolean;
}

const AlexMascot = ({ message, className, compact = false }: AlexMascotProps) => {
  return (
    <Card className={cn("shadow-[var(--shadow-soft)] border-primary/10 bg-primary/5", className)}>
      <CardContent className={cn("flex items-start gap-4", compact ? "pt-4 pb-3" : "pt-6")}>
        <img
          src={alexMascot}
          alt="Alex — ReSource quality guide"
          className={cn(
            "rounded-full object-cover flex-shrink-0 border-2 border-primary/20",
            compact ? "w-10 h-10" : "w-14 h-14"
          )}
        />
        <div className="flex-1 min-w-0">
          <p className={cn(
            "font-medium text-foreground mb-0.5",
            compact ? "text-sm" : "text-sm"
          )}>
            Alex — Quality Guide
          </p>
          <p className={cn(
            "text-muted-foreground leading-relaxed",
            compact ? "text-xs" : "text-sm"
          )}>
            {message}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlexMascot;
