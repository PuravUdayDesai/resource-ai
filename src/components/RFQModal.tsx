import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Building2, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: any;
  material: any;
}

const RFQModal = ({ isOpen, onClose, supplier, material }: RFQModalProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    quantity: material.moq.toString(),
    targetPrice: "",
    incoterms: "FOB",
    deliveryLocation: "",
    paymentTerms: "NET30",
    qualityRequirements: "",
    complianceNeeds: "",
    additionalNotes: ""
  });

  const handleSubmit = () => {
    toast({
      title: "RFQ Submitted Successfully",
      description: "Your request for quotation has been sent to the supplier. You'll receive a response within 24-48 hours.",
    });
    
    onClose();
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const resetAndClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Request for Quotation (RFQ)
          </DialogTitle>
          <DialogDescription>
            Submit a formal RFQ to receive detailed pricing and terms from the supplier
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Material Summary */}
          <div className="p-4 bg-muted rounded-lg border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-lg">{material.type} - {material.grade}</p>
                <p className="text-sm text-muted-foreground">{supplier.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  MFI: {material.mfi} | Contamination: {material.contamination}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Base Price</p>
                <p className="font-semibold">${material.price}/kg</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Company Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  placeholder="Your company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="company@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Material Requirements */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Package className="h-4 w-4" />
              Material Requirements
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Required Quantity (kg) *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={material.moq}
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  placeholder={`Min: ${material.moq} kg`}
                />
                <p className="text-xs text-muted-foreground">
                  MOQ: {material.moq.toLocaleString()} kg
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetPrice">Target Price ($/kg)</Label>
                <Input
                  id="targetPrice"
                  type="number"
                  step="0.01"
                  value={formData.targetPrice}
                  onChange={(e) => setFormData({...formData, targetPrice: e.target.value})}
                  placeholder="Optional target price"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Commercial Terms */}
          <div className="space-y-4">
            <h3 className="font-semibold">Commercial Terms</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="incoterms">Incoterms *</Label>
                <Select value={formData.incoterms} onValueChange={(v) => setFormData({...formData, incoterms: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EXW">EXW - Ex Works</SelectItem>
                    <SelectItem value="FOB">FOB - Free on Board</SelectItem>
                    <SelectItem value="CIF">CIF - Cost, Insurance & Freight</SelectItem>
                    <SelectItem value="DDP">DDP - Delivered Duty Paid</SelectItem>
                    <SelectItem value="DAP">DAP - Delivered at Place</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Payment Terms *</Label>
                <Select value={formData.paymentTerms} onValueChange={(v) => setFormData({...formData, paymentTerms: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NET30">Net 30 Days</SelectItem>
                    <SelectItem value="NET60">Net 60 Days</SelectItem>
                    <SelectItem value="NET90">Net 90 Days</SelectItem>
                    <SelectItem value="COD">Cash on Delivery</SelectItem>
                    <SelectItem value="ADVANCE">50% Advance / 50% on Delivery</SelectItem>
                    <SelectItem value="LC">Letter of Credit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="deliveryLocation">Delivery Location *</Label>
                <Input
                  id="deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({...formData, deliveryLocation: e.target.value})}
                  placeholder="Street, City, State, ZIP"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Quality & Compliance */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quality & Compliance Requirements</h3>
            <div className="space-y-2">
              <Label htmlFor="qualityRequirements">Quality Specifications</Label>
              <Textarea
                id="qualityRequirements"
                value={formData.qualityRequirements}
                onChange={(e) => setFormData({...formData, qualityRequirements: e.target.value})}
                placeholder="Specify any additional quality requirements (e.g., specific MFI range, color consistency, pellet size)"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complianceNeeds">Compliance & Certification Needs</Label>
              <Textarea
                id="complianceNeeds"
                value={formData.complianceNeeds}
                onChange={(e) => setFormData({...formData, complianceNeeds: e.target.value})}
                placeholder="List required certifications (e.g., FDA approval, ISO standards, chain of custody)"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                placeholder="Any other information or special requirements"
                rows={2}
              />
            </div>
          </div>

          <Separator />

          {/* Important Notice */}
          <div className="p-4 border border-info/30 bg-info/5 rounded-lg">
            <p className="text-sm font-medium mb-2">RFQ Process</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Supplier will review your RFQ and respond within 24-48 hours</li>
              <li>You'll receive a formal quotation with detailed pricing and terms</li>
              <li>Compare multiple quotes before making a decision</li>
              <li>Negotiate terms directly with suppliers through the platform</li>
              <li>No commitment until you accept a quotation</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={resetAndClose}>
              Cancel
            </Button>
            <Button 
              className="flex-1" 
              size="lg" 
              onClick={handleSubmit}
              disabled={!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone || !formData.deliveryLocation}
            >
              Submit RFQ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RFQModal;