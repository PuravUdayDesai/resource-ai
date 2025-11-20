import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CheckCircle2, MapPin, Package } from "lucide-react";

interface SupplierCardProps {
  name: string;
  location: string;
  materials: string[];
  minOrder: string;
  priceRange: string;
  verified: boolean;
  certifications: string[];
}

const SupplierCard = ({
  name,
  location,
  materials,
  minOrder,
  priceRange,
  verified,
  certifications,
}: SupplierCardProps) => {
  return (
    <Card className="hover:shadow-[var(--shadow-medium)] transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
              {name}
              {verified && (
                <CheckCircle2 className="h-5 w-5 text-trust" />
              )}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
            Materials Available
          </p>
          <div className="flex flex-wrap gap-2">
            {materials.map((material) => (
              <Badge key={material} variant="secondary" className="text-xs">
                {material}
              </Badge>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Min. Order</p>
            <p className="text-sm font-medium text-foreground flex items-center gap-1">
              <Package className="h-4 w-4" />
              {minOrder}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Price Range</p>
            <p className="text-sm font-medium text-foreground">{priceRange}</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
            Certifications
          </p>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert) => (
              <Badge key={cert} variant="outline" className="text-xs border-success text-success">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-primary hover:bg-primary/90">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupplierCard;
