import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Users, TrendingUp, ShieldCheck, FileCheck } from "lucide-react";

interface CompanyProfileProps {
  type: "buyer" | "supplier";
  company?: {
    name: string;
    registration: string;
    location: string;
    annualCapacity?: string;
    employees?: string;
    verified: boolean;
    certifications: string[];
    founded?: string;
  };
}

const CompanyProfile = ({ type, company }: CompanyProfileProps) => {
  // Mock data for demonstration
  const defaultCompany = {
    name: type === "buyer" ? "Apex Packaging Corp" : "GreenCycle Materials",
    registration: type === "buyer" ? "US-12345678" : "US-87654321",
    location: type === "buyer" ? "Los Angeles, CA" : "Los Angeles, CA",
    annualCapacity: type === "supplier" ? "50,000 tons/year" : undefined,
    employees: type === "buyer" ? "150-200" : "50-100",
    verified: true,
    certifications: type === "supplier" 
      ? ["ISO 9001:2015", "FDA Approved", "GRS Certified"]
      : ["ISO 14001:2015", "EPR Compliant"],
    founded: type === "buyer" ? "2008" : "2012",
  };

  const data = company || defaultCompany;

  return (
    <Card className="shadow-[var(--shadow-soft)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Company Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">{data.name}</h3>
              <p className="text-sm text-muted-foreground">
                Reg. No: {data.registration}
              </p>
            </div>
            {data.verified && (
              <Badge className="bg-success/10 text-success border-success/20">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Location
            </p>
            <p className="text-sm font-medium">{data.location}</p>
          </div>
          
          {data.annualCapacity && (
            <div>
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Annual Capacity
              </p>
              <p className="text-sm font-medium">{data.annualCapacity}</p>
            </div>
          )}
          
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Users className="h-3 w-3" />
              Employees
            </p>
            <p className="text-sm font-medium">{data.employees}</p>
          </div>
          
          {data.founded && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Founded</p>
              <p className="text-sm font-medium">{data.founded}</p>
            </div>
          )}
        </div>

        <div className="pt-2">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <FileCheck className="h-3 w-3" />
            Certifications & Compliance
          </p>
          <div className="flex flex-wrap gap-2">
            {data.certifications.map((cert, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyProfile;