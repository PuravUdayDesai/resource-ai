import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Download, FileText, Building2, Package, Truck, DollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const quoteId = searchParams.get("quoteId") || "Q-001";

  // Mock order data
  const orderData = {
    orderId: "PO-2024-001",
    rfqId: "RFQ-2024-001",
    quoteId: quoteId,
    supplier: {
      name: "GreenCycle Materials",
      contact: "John Smith",
      email: "procurement@greencycle.com",
      phone: "+1 (555) 123-4567",
      address: "123 Industrial Pkwy, Houston, TX 77001"
    },
    buyer: {
      name: "PackMaster Industries",
      contact: "Jane Doe",
      email: "jane@packmaster.com",
      phone: "+1 (555) 987-6543",
      address: "456 Manufacturing Dr, Chicago, IL 60601"
    },
    material: {
      type: "rPET - Food Grade",
      grade: "Premium",
      quantity: 5000,
      pricePerKg: 1.85,
      moq: 5000
    },
    terms: {
      incoterms: "FOB Houston",
      paymentTerms: "Net 30 Days",
      leadTime: "14 days",
      expectedDispatch: "Dec 16, 2025",
      expectedDelivery: "Dec 30, 2025"
    },
    pricing: {
      materialCost: 9250,
      shippingCost: 450,
      total: 9700
    },
    certifications: ["FDA Food Contact", "ISO 9001:2015", "Chain of Custody", "GRS Certificate"]
  };

  const handleConfirmOrder = () => {
    toast({
      title: "Order Confirmed",
      description: "Purchase order has been generated and sent to the supplier",
    });
    setTimeout(() => {
      navigate(`/order-tracking?orderId=${orderData.orderId}`);
    }, 1500);
  };

  const handleDownloadPO = () => {
    toast({
      title: "Downloading Purchase Order",
      description: "PO-2024-001.pdf",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Order Confirmation</h1>
              <p className="text-muted-foreground">Purchase Order: {orderData.orderId}</p>
            </div>
          </div>

          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            Pending Confirmation
          </Badge>
        </div>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Material</p>
                  <p className="font-semibold text-lg">{orderData.material.type}</p>
                  <p className="text-sm text-muted-foreground">Grade: {orderData.material.grade}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                  <p className="font-semibold text-lg">{orderData.material.quantity.toLocaleString()} kg</p>
                  <p className="text-sm text-muted-foreground">Price: ${orderData.material.pricePerKg}/kg</p>
                </div>
              </div>

              <Separator />

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expected Dispatch</p>
                  <p className="font-semibold">{orderData.terms.expectedDispatch}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expected Delivery</p>
                  <p className="font-semibold">{orderData.terms.expectedDelivery}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Lead Time</p>
                  <p className="font-semibold">{orderData.terms.leadTime}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supplier & Buyer Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5" />
                Supplier Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-base">{orderData.supplier.name}</p>
                <p className="text-muted-foreground">{orderData.supplier.address}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Contact Person</p>
                <p className="font-semibold">{orderData.supplier.contact}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-semibold">{orderData.supplier.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-semibold">{orderData.supplier.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5" />
                Buyer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-base">{orderData.buyer.name}</p>
                <p className="text-muted-foreground">{orderData.buyer.address}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Contact Person</p>
                <p className="font-semibold">{orderData.buyer.contact}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-semibold">{orderData.buyer.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-semibold">{orderData.buyer.phone}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commercial Terms */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Commercial Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Incoterms:</span>
                  <span className="font-semibold">{orderData.terms.incoterms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Terms:</span>
                  <span className="font-semibold">{orderData.terms.paymentTerms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RFQ Reference:</span>
                  <span className="font-semibold">{orderData.rfqId}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quote Reference:</span>
                  <span className="font-semibold">{orderData.quoteId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PO Number:</span>
                  <span className="font-semibold">{orderData.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Date:</span>
                  <span className="font-semibold">Dec 02, 2025</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Breakdown */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Material Cost ({orderData.material.quantity.toLocaleString()} kg × ${orderData.material.pricePerKg}/kg)</span>
                <span className="font-semibold">${orderData.pricing.materialCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping & Logistics</span>
                <span className="font-semibold">${orderData.pricing.shippingCost.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold text-lg">Total Amount</span>
                <span className="font-bold text-2xl">${orderData.pricing.total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications & Documents */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Certifications & Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {orderData.certifications.map((cert) => (
                <Badge key={cert} variant="outline" className="bg-success/10 text-success border-success/20">
                  {cert}
                </Badge>
              ))}
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full md:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Download Quality Certificates
              </Button>
              <Button variant="outline" size="sm" className="w-full md:w-auto ml-0 md:ml-2">
                <Download className="h-4 w-4 mr-2" />
                Download Chain of Custody
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="border-info/30 bg-info/5 mb-6">
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-2">Order Confirmation Process</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>By confirming this order, you agree to the stated terms and conditions</li>
              <li>A formal Purchase Order (PO) document will be generated and sent to both parties</li>
              <li>Supplier will confirm production start within 24 hours</li>
              <li>You'll receive real-time updates on production and shipment status</li>
              <li>Payment terms: {orderData.terms.paymentTerms}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>
            Back to Quotes
          </Button>
          <Button onClick={handleDownloadPO} variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download PO
          </Button>
          <Button onClick={handleConfirmOrder} size="lg" className="flex-1">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Confirm Order
          </Button>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
