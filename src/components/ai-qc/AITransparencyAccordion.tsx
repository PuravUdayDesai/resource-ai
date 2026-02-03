import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Upload, Cpu, Search, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AITransparencyAccordionProps {
  className?: string;
}

const steps = [
  {
    icon: Upload,
    title: "1. Image Ingestion",
    description: "Supplier-uploaded photos are securely received and preprocessed for analysis. Images are standardized for consistent evaluation across all batches.",
  },
  {
    icon: Cpu,
    title: "2. Feature Extraction",
    description: "Our AI models identify key visual characteristics of the recycled plastic, including color consistency, particle size distribution, and surface texture patterns.",
  },
  {
    icon: Search,
    title: "3. Contamination Detection",
    description: "Advanced computer vision scans for foreign materials, discoloration, and quality anomalies that could affect material performance or compliance.",
  },
  {
    icon: CheckCircle2,
    title: "4. Scoring & Verification",
    description: "All quality dimensions are combined into an overall quality score and verification status. The AI compares results against historical data for consistency checks.",
  },
];

const AITransparencyAccordion = ({ className }: AITransparencyAccordionProps) => {
  return (
    <Card className={cn("shadow-[var(--shadow-soft)]", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          How AI Verified This
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="transparency" className="border-none">
            <AccordionTrigger className="text-sm text-muted-foreground hover:no-underline py-2">
              Learn how ReSource AI analyzes and verifies recycled plastic batches
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{step.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Note:</strong> ReSource AI is a decision-support system designed to help you make informed sourcing decisions. 
                    It does not replace professional quality assurance processes. Always verify critical specifications with supplier documentation.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AITransparencyAccordion;
