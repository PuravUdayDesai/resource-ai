import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OrderTimeline from "@/components/OrderTimeline";
import { Download, Package, Truck, MapPin, FileText, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const OrderTracking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "PO-2024-001";

  // Mock order tracking data
  const orderData = {
    orderId: orderId,
    status: "In Transit",
    currentStep: 5,
    supplier: "GreenCycle Materials",
    material: "rPET - Food Grade",
    quantity: 5000,
    expectedDelivery: "Dec 20, 2025",
    tracking: {
      carrier: "Swift Logistics",
      trackingNumber: "TRK-2024-5891",
      currentLocation: "Distribution Center - Chicago, IL",
      lastUpdate: "Dec 18, 2025 02:30 PM",
      estimatedDelivery: "Dec 20, 2025"
    },
    qcReport: {
      status: "Passed",
      date: "Dec 10, 2025",
      mfi: "28 g/10min",
      contamination: "< 0.1%",
      color: "Clear",
      inspector: "QC Lab Services Inc."
    },
    documents: [
      { name: "Purchase Order", id: "PO-2024-001", type: "PO" },
      { name: "Quality Certificate", id: "QC-2024-892", type: "QC" },
      { name: "Bill of Lading", id: "BOL-2024-4521", type: "BOL" },
      { name: "Chain of Custody", id: "COC-2024-331", type: "COC" },
      { name: "Packing List", id: "PL-2024-778", type: "PL" }
    ]
  };

  const handleDownloadDocument = (docName: string) => {
    toast({
      title: "Downloading Document",
      description: docName,
    });
  };

  const handleTrackShipment = () => {
    toast({
      title: "Opening Tracking Portal",
      description: `Tracking #${orderData.tracking.trackingNumber}`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Order Tracking</h1>
              <p className="text-muted-foreground">Order ID: {orderData.orderId}</p>
            </div>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              View All Orders
            </Button>
          </div>

          <div className="flex gap-2">
            <Badge variant="outline" className="bg-info/10 text-info border-info/20">
              {orderData.status}
            </Badge>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              QC Passed
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderTimeline currentStep={orderData.currentStep} />
              </CardContent>
            </Card>

            {/* Shipment Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Carrier</p>
                    <p className="font-semibold">{orderData.tracking.carrier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
                    <p className="font-semibold">{orderData.tracking.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Location</p>
                    <p className="font-semibold flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      {orderData.tracking.currentLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Last Update</p>
                    <p className="font-semibold">{orderData.tracking.lastUpdate}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="font-bold text-lg">{orderData.tracking.estimatedDelivery}</p>
                  </div>
                  <Button onClick={handleTrackShipment} className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Track Shipment on Carrier Website
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* QC Report */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Quality Control Report
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
                  <div>
                    <p className="font-semibold text-success">QC Status: {orderData.qcReport.status}</p>
                    <p className="text-sm text-muted-foreground">Inspection Date: {orderData.qcReport.date}</p>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Verified
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">MFI (Melt Flow Index)</p>
                    <p className="font-semibold">{orderData.qcReport.mfi}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Contamination Level</p>
                    <p className="font-semibold">{orderData.qcReport.contamination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Color Grade</p>
                    <p className="font-semibold">{orderData.qcReport.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Inspector</p>
                    <p className="font-semibold text-sm">{orderData.qcReport.inspector}</p>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownloadDocument("Quality Control Report")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Full QC Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary & Documents */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Supplier</p>
                  <p className="font-semibold">{orderData.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Material</p>
                  <p className="font-semibold">{orderData.material}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                  <p className="font-semibold">{orderData.quantity.toLocaleString()} kg</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expected Delivery</p>
                  <p className="font-semibold">{orderData.expectedDelivery}</p>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {orderData.documents.map((doc) => (
                    <Button
                      key={doc.id}
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => handleDownloadDocument(doc.name)}
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{doc.name}</span>
                      </span>
                      <Download className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/delivery-confirmation?orderId=" + orderId)}
                >
                  Mark as Received
                </Button>
                <Button variant="outline" className="w-full" onClick={() => toast({ title: "Contact Supplier", description: "Messaging feature will be available soon." })}>
                  Contact Supplier
                </Button>
                <Button variant="outline" className="w-full" onClick={() => toast({ title: "Report Issue", description: "Issue reporting will be available soon. For urgent issues, contact support." })}>
                  Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
