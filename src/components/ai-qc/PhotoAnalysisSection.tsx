import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, Eye, EyeOff, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyzedImage {
  id: string;
  originalUrl: string;
  hasAnnotations: boolean;
  annotationType: "contaminant" | "irregularity" | "none";
  annotationCount: number;
  caption: string;
}

interface PhotoAnalysisSectionProps {
  images: AnalyzedImage[];
  className?: string;
}

const PhotoAnalysisSection = ({ images, className }: PhotoAnalysisSectionProps) => {
  const [showAnnotations, setShowAnnotations] = useState(true);

  const getAnnotationBadge = (type: string, count: number) => {
    if (type === "none") {
      return (
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          No Issues
        </Badge>
      );
    }
    if (type === "contaminant") {
      return (
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {count} Contaminant{count !== 1 ? "s" : ""}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
        <AlertTriangle className="h-3 w-3 mr-1" />
        {count} Irregularit{count !== 1 ? "ies" : "y"}
      </Badge>
    );
  };

  return (
    <Card className={cn("shadow-[var(--shadow-soft)]", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Photos Analyzed by AI
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Switch
              id="annotations-toggle"
              checked={showAnnotations}
              onCheckedChange={setShowAnnotations}
            />
            <Label htmlFor="annotations-toggle" className="text-sm flex items-center gap-1 cursor-pointer">
              {showAnnotations ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              Show AI Annotations
            </Label>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Images analyzed using computer vision models trained on recycled plastic datasets.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="relative group rounded-lg overflow-hidden border bg-muted/30"
            >
              {/* Image container */}
              <div className="aspect-square relative">
                {/* Original Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground/50" />
                </div>
                
                {/* AI Annotation Overlay */}
                {showAnnotations && image.hasAnnotations && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Simulated bounding boxes for contaminants */}
                    {image.annotationType === "contaminant" && (
                      <>
                        <div className="absolute top-[20%] left-[15%] w-[25%] h-[20%] border-2 border-destructive rounded bg-destructive/10" />
                        {image.annotationCount > 1 && (
                          <div className="absolute bottom-[25%] right-[20%] w-[18%] h-[15%] border-2 border-destructive rounded bg-destructive/10" />
                        )}
                      </>
                    )}
                    
                    {/* Simulated heatmap overlay for irregularities */}
                    {image.annotationType === "irregularity" && (
                      <div className="absolute inset-0 bg-gradient-to-br from-warning/20 via-transparent to-warning/10" />
                    )}
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                  <p className="text-xs text-center text-muted-foreground">
                    {image.caption}
                  </p>
                </div>
              </div>
              
              {/* Annotation badge */}
              <div className="absolute top-2 right-2">
                {getAnnotationBadge(image.annotationType, image.annotationCount)}
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Camera className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No images available for analysis</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoAnalysisSection;
export type { AnalyzedImage };
