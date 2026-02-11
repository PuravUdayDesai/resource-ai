import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, Clock, FileText, Download, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const QuoteComparison = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rfqId = searchParams.get("rfqId") || "RFQ-2024-001";

  // Mock quote data
  const quotes = [
    {
      id: "Q-001",
      supplier: "GreenCycle Materials",
      supplierRating: 4.8,
      material: "rPET - Food Grade",
      pricePerKg: 1.85,
      moq: 5000,
      leadTime: "14 days",
      incoterms: "FOB",
      paymentTerms: "Net 30",
      verificationLevel: "Full FDA + ISO",
      shippingEstimate: 450,
      totalEstimate: 9700,
      status: "Received",
      certifications: ["FDA", "ISO 9001", "Chain of Custody"],
      notes: "Can expedite to 10 days if needed"
    },
    {
      id: "Q-002",
      supplier: "EcoPlast Solutions",
      supplierRating: 4.6,
      material: "rPET - Food Grade",
      pricePerKg: 1.78,
      moq: 5000,
      leadTime: "21 days",
      incoterms: "FOB",
      paymentTerms: "Net 45",
      verificationLevel: "ISO Only",
      shippingEstimate: 420,
      totalEstimate: 9320,
      status: "Received",
      certifications: ["ISO 9001"],
      notes: "Bulk discounts available for 10+ tons"
    },
    {
      id: "Q-003",
      supplier: "ReSource Polymers",
      supplierRating: 4.9,
      material: "rPET - Food Grade",
      pricePerKg: 1.92,
      moq: 3000,
      leadTime: "10 days",
      incoterms: "DDP",
      paymentTerms: "Net 30",
      verificationLevel: "Full FDA + ISO + Third-party QC",
      shippingEstimate: 0,
      totalEstimate: 9600,
      status: "Received",
      certifications: ["FDA", "ISO 9001", "ISO 14001", "Chain of Custody", "Third-party QC"],
      notes: "Premium quality, DDP pricing includes delivery"
    },
  ];

  const handleAcceptQuote = (quoteId: string, supplier: string) => {
    toast({
      title: "Quote Accepted",
      description: `Proceeding to order confirmation with ${supplier}`,
    });
    setTimeout(() => {
      navigate(`/order-confirmation?quoteId=${quoteId}`);
    }, 1000);
  };

  const handleRejectQuote = (quoteId: string) => {
    toast({
      title: "Quote Rejected",
      description: "The supplier has been notified",
    });
  };

  const handleRequestRevision = (quoteId: string) => {
    toast({
      title: "Revision Requested",
      description: "The supplier will be notified of your revision request",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Quote Comparison</h1>
              <p className="text-muted-foreground">RFQ Reference: {rfqId}</p>
            </div>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              <FileText className="h-4 w-4 mr-2" />
              View RFQ Details
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Request Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Material</p>
                  <p className="font-semibold">rPET - Food Grade</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Quantity</p>
                  <p className="font-semibold">5,000 kg</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Target Date</p>
                  <p className="font-semibold">Dec 30, 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Quotes Received</p>
                  <p className="font-semibold">{quotes.length} quotes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quotes Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle>Received Quotes</CardTitle>
            <CardDescription>Compare pricing, terms, and verification levels from suppliers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Price/kg</TableHead>
                    <TableHead>MOQ</TableHead>
                    <TableHead>Lead Time</TableHead>
                    <TableHead>Terms</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead>Total Est.</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell>
                        <div>
                          <p className="font-semibold">{quote.supplier}</p>
                          <p className="text-xs text-muted-foreground">
                            Rating: {quote.supplierRating}/5.0
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-lg">${quote.pricePerKg}</span>
                      </TableCell>
                      <TableCell>{quote.moq.toLocaleString()} kg</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-info/10 text-info border-info/20">
                          <Clock className="h-3 w-3 mr-1" />
                          {quote.leadTime}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <p>{quote.incoterms}</p>
                          <p className="text-muted-foreground">{quote.paymentTerms}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {quote.certifications.map((cert) => (
                            <Badge key={cert} variant="outline" className="mr-1 mb-1 text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-bold text-lg">${quote.totalEstimate.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">inc. freight</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2 min-w-[120px]">
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleAcceptQuote(quote.id, quote.supplier)}
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleRequestRevision(quote.id)}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Revise
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="w-full text-destructive hover:text-destructive"
                            onClick={() => handleRejectQuote(quote.id)}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Quote Cards (Alternative View) */}
        <div className="mt-8 grid gap-6">
          {quotes.map((quote) => (
            <Card key={quote.id} className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{quote.supplier}</CardTitle>
                    <CardDescription>Quote ID: {quote.id}</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    {quote.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <h4 className="font-semibold mb-3">Pricing</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price per kg:</span>
                        <span className="font-semibold">${quote.pricePerKg}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping:</span>
                        <span className="font-semibold">${quote.shippingEstimate}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="font-semibold">Total Estimate:</span>
                        <span className="font-bold text-lg">${quote.totalEstimate.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Terms & Delivery</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lead Time:</span>
                        <span className="font-semibold">{quote.leadTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">MOQ:</span>
                        <span className="font-semibold">{quote.moq.toLocaleString()} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Incoterms:</span>
                        <span className="font-semibold">{quote.incoterms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment:</span>
                        <span className="font-semibold">{quote.paymentTerms}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Verification & Compliance</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground mb-2">{quote.verificationLevel}</p>
                      <div className="flex flex-wrap gap-1">
                        {quote.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                        <Download className="h-3 w-3 mr-1" />
                        Download Certificates
                      </Button>
                    </div>
                  </div>
                </div>

                {quote.notes && (
                  <div className="p-3 bg-muted rounded-lg mb-4">
                    <p className="text-sm"><span className="font-semibold">Supplier Note:</span> {quote.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuoteComparison;
