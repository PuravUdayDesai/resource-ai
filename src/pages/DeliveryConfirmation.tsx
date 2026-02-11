import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Package, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DeliveryConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "PO-2024-001";

  const [formData, setFormData] = useState({
    receivedQuantity: "5000",
    deliveryDate: "",
    receivedBy: "",
    qualityCheck: "passed",
    packagingCondition: "excellent",
    materialCondition: "excellent",
    notes: "",
    issuesReported: false,
    issueDescription: ""
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Mock order data
  const orderData = {
    orderId: orderId,
    supplier: "GreenCycle Materials",
    material: "rPET - Food Grade",
    expectedQuantity: 5000,
    tracking: "TRK-2024-5891"
  };

  const handleFileUpload = (fileType: string) => {
    setUploadedFiles([...uploadedFiles, fileType]);
    toast({
      title: "File Uploaded",
      description: `${fileType} has been uploaded successfully`,
    });
  };

  const handleConfirmReceipt = () => {
    if (!formData.receivedBy || !formData.deliveryDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Delivery Confirmed",
      description: "Order has been marked as received. Generating completion certificate...",
    });
    
    setTimeout(() => {
      navigate(`/order-completion?orderId=${orderId}`);
    }, 1500);
  };

  const handleReportIssue = () => {
    toast({
      title: "Issue Reported",
      description: "The supplier and support team have been notified",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Delivery Confirmation</h1>
              <p className="text-muted-foreground">Order ID: {orderData.orderId}</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Supplier</p>
                <p className="font-semibold">{orderData.supplier}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Material</p>
                <p className="font-semibold">{orderData.material}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Expected Quantity</p>
                <p className="font-semibold">{orderData.expectedQuantity.toLocaleString()} kg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Details Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="receivedQuantity">Received Quantity (kg) *</Label>
                <Input
                  id="receivedQuantity"
                  type="number"
                  value={formData.receivedQuantity}
                  onChange={(e) => setFormData({...formData, receivedQuantity: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Delivery Date *</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="receivedBy">Received By (Name) *</Label>
                <Input
                  id="receivedBy"
                  value={formData.receivedBy}
                  onChange={(e) => setFormData({...formData, receivedBy: e.target.value})}
                  placeholder="Full name of receiving personnel"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality Inspection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quality Inspection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Quality Check Result *</Label>
              <RadioGroup 
                value={formData.qualityCheck} 
                onValueChange={(value) => setFormData({...formData, qualityCheck: value})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="passed" id="qc-passed" />
                  <Label htmlFor="qc-passed" className="font-normal cursor-pointer">
                    Passed - Material meets specifications
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="minor-issues" id="qc-minor" />
                  <Label htmlFor="qc-minor" className="font-normal cursor-pointer">
                    Minor Issues - Acceptable with notes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="failed" id="qc-failed" />
                  <Label htmlFor="qc-failed" className="font-normal cursor-pointer">
                    Failed - Material does not meet specifications
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>Packaging Condition</Label>
                <RadioGroup 
                  value={formData.packagingCondition}
                  onValueChange={(value) => setFormData({...formData, packagingCondition: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="pkg-excellent" />
                    <Label htmlFor="pkg-excellent" className="font-normal cursor-pointer">Excellent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="pkg-good" />
                    <Label htmlFor="pkg-good" className="font-normal cursor-pointer">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="damaged" id="pkg-damaged" />
                    <Label htmlFor="pkg-damaged" className="font-normal cursor-pointer">Damaged</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Material Condition</Label>
                <RadioGroup 
                  value={formData.materialCondition}
                  onValueChange={(value) => setFormData({...formData, materialCondition: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="mat-excellent" />
                    <Label htmlFor="mat-excellent" className="font-normal cursor-pointer">Excellent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="mat-good" />
                    <Label htmlFor="mat-good" className="font-normal cursor-pointer">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="mat-poor" />
                    <Label htmlFor="mat-poor" className="font-normal cursor-pointer">Poor</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload Delivery Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-24 flex-col"
                onClick={() => handleFileUpload("Delivery Challan")}
              >
                <Upload className="h-6 w-6 mb-2" />
                <span className="text-sm">Upload Delivery Challan</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex-col"
                onClick={() => handleFileUpload("Bill of Lading")}
              >
                <Upload className="h-6 w-6 mb-2" />
                <span className="text-sm">Upload Bill of Lading</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex-col"
                onClick={() => handleFileUpload("Quality Test Results")}
              >
                <Upload className="h-6 w-6 mb-2" />
                <span className="text-sm">Upload QC Test Results</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex-col"
                onClick={() => handleFileUpload("Photos")}
              >
                <Upload className="h-6 w-6 mb-2" />
                <span className="text-sm">Upload Photos</span>
              </Button>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                <p className="text-sm font-semibold mb-2">Uploaded Files:</p>
                <ul className="text-sm space-y-1">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {file}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Additional Notes & Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Delivery Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Any additional observations or comments about the delivery"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="issues"
                checked={formData.issuesReported}
                onCheckedChange={(checked) => setFormData({...formData, issuesReported: checked as boolean})}
              />
              <Label htmlFor="issues" className="font-normal cursor-pointer">
                Report issues with this delivery
              </Label>
            </div>

            {formData.issuesReported && (
              <div className="space-y-2 p-4 border border-destructive/30 bg-destructive/5 rounded-lg">
                <Label htmlFor="issueDescription" className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  Describe the Issue
                </Label>
                <Textarea
                  id="issueDescription"
                  value={formData.issueDescription}
                  onChange={(e) => setFormData({...formData, issueDescription: e.target.value})}
                  placeholder="Provide detailed information about the issue"
                  rows={4}
                />
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleReportIssue}
                >
                  Submit Issue Report
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button 
            className="flex-1" 
            size="lg"
            onClick={handleConfirmReceipt}
            disabled={!formData.receivedBy || !formData.deliveryDate}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Confirm Receipt & Complete Order
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DeliveryConfirmation;
