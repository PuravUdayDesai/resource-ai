import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CompletionCertificate from "@/components/CompletionCertificate";
import { Download, CheckCircle2, Home } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const OrderCompletion = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "PO-2024-001";

  // Mock completion data
  const completionData = {
    orderId: orderId,
    buyerName: "PackMaster Industries",
    supplierName: "GreenCycle Materials",
    material: "rPET - Food Grade",
    quantity: 5000,
    completionDate: "Dec 20, 2025",
    recycledPercentage: 100,
    certifications: [
      "FDA Food Contact Approved",
      "ISO 9001:2015",
      "Chain of Custody Verified",
      "GRS Certificate",
      "Third-Party QC Tested"
    ]
  };

  const handleDownloadCertificate = () => {
    toast({
      title: "Downloading Certificate",
      description: `Certificate-${orderId}.pdf`,
    });
  };

  const handleDownloadAllDocuments = () => {
    toast({
      title: "Preparing Download",
      description: "Packaging all order documents into a ZIP file",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center animate-pulse">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3">Order Completed Successfully!</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Your recycled plastic procurement has been completed and verified
          </p>
          <p className="text-sm text-muted-foreground">
            Order ID: {orderId}
          </p>
        </div>

        {/* Completion Certificate */}
        <div className="mb-8">
          <CompletionCertificate
            orderId={completionData.orderId}
            buyerName={completionData.buyerName}
            supplierName={completionData.supplierName}
            material={completionData.material}
            quantity={completionData.quantity}
            completionDate={completionData.completionDate}
            recycledPercentage={completionData.recycledPercentage}
            certifications={completionData.certifications}
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          <Button 
            onClick={handleDownloadCertificate} 
            className="w-full" 
            size="lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Completion Certificate
          </Button>
          
          <Button 
            onClick={handleDownloadAllDocuments} 
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Download All Order Documents (ZIP)
          </Button>

          <div className="grid md:grid-cols-2 gap-3 pt-4">
            <Button 
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/marketplace")}
            >
              Browse More Materials
            </Button>
          </div>
        </div>

        {/* What's Next Section */}
        <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">What's Next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <span>This order is now recorded in your compliance dashboard</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <span>Your recycled plastic usage percentage has been updated</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <span>All certificates are available for audit and compliance reporting</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <span>You can reorder the same material or explore new suppliers anytime</span>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderCompletion;
