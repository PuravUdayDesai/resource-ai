import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Award, Leaf } from "lucide-react";

interface CompletionCertificateProps {
  orderId: string;
  buyerName: string;
  supplierName: string;
  material: string;
  quantity: number;
  completionDate: string;
  recycledPercentage: number;
  certifications: string[];
}

const CompletionCertificate = ({
  orderId,
  buyerName,
  supplierName,
  material,
  quantity,
  completionDate,
  recycledPercentage,
  certifications
}: CompletionCertificateProps) => {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <CardContent className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
              <Award className="h-8 w-8 text-success" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Completion Certificate</h2>
          <p className="text-muted-foreground">Recycled Plastic Procurement - Verified Transaction</p>
        </div>

        <Separator className="mb-6" />

        {/* Certificate Content */}
        <div className="space-y-6">
          {/* Confirmation Statement */}
          <div className="text-center p-6 bg-success/5 border border-success/20 rounded-lg">
            <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-3" />
            <p className="text-lg font-semibold mb-2">This certifies that</p>
            <p className="text-2xl font-bold text-primary mb-2">{buyerName}</p>
            <p className="text-muted-foreground">
              has successfully procured and received verified recycled plastic materials 
              through the ReSource platform
            </p>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Transaction Details</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground">Order ID</p>
                  <p className="font-semibold">{orderId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Completion Date</p>
                  <p className="font-semibold">{completionDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Verified Supplier</p>
                  <p className="font-semibold">{supplierName}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground">Material Type</p>
                  <p className="font-semibold">{material}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Quantity Received</p>
                  <p className="font-semibold">{quantity.toLocaleString()} kg</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Quality Status</p>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    QC Verified
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Compliance Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Leaf className="h-5 w-5 text-success" />
              Compliance Summary
            </h3>
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold">Recycled Content Percentage</p>
                <p className="text-3xl font-bold text-success">{recycledPercentage}%</p>
              </div>
              <p className="text-sm text-muted-foreground">
                This transaction contributes towards meeting the 25% mandatory recycled plastic requirement 
                for packaging materials as per regulatory standards.
              </p>
            </div>
          </div>

          {/* Verification & Certifications */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Verification & Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <Badge 
                  key={cert} 
                  variant="outline" 
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  {cert}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              All materials have been verified for quality, compliance, and chain-of-custody documentation.
            </p>
          </div>

          <Separator />

          {/* Chain of Custody */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Chain of Custody Verified</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-muted-foreground">Material Source:</span>
                <span className="font-semibold">Post-Consumer Recycled (PCR)</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-muted-foreground">Supplier Verification:</span>
                <span className="font-semibold">Platform Verified ✓</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-muted-foreground">Quality Control:</span>
                <span className="font-semibold">Third-Party Tested ✓</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-muted-foreground">Documentation:</span>
                <span className="font-semibold">Complete & Verified ✓</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              This certificate is issued by ReSource Platform and serves as official documentation 
              of verified recycled plastic procurement for compliance and reporting purposes.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Certificate ID: CERT-{orderId}-{new Date().getFullYear()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletionCertificate;
