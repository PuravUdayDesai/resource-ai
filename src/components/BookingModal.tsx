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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Package, Truck, FileText } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: any;
  material: any;
}

const BookingModal = ({ isOpen, onClose, supplier, material }: BookingModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(material.moq.toString());
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("delivery");
  const [date, setDate] = useState<Date>();
  const [notes, setNotes] = useState("");

  const calculatedPrice = () => {
    const qty = parseInt(quantity) || 0;
    let pricePerKg = material.price;
    
    for (const tier of material.bulkPricing) {
      if (qty >= tier.quantity) {
        pricePerKg = tier.price;
      }
    }
    
    return qty * pricePerKg;
  };

  const handleSubmit = () => {
    // In production, this would submit to backend
    toast({
      title: "Booking Request Submitted",
      description: "Your booking request has been sent to the supplier for approval.",
    });
    
    // Reset and close
    setStep(1);
    setQuantity(material.moq.toString());
    setDate(undefined);
    setNotes("");
    onClose();
    
    // Navigate to dashboard after short delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const resetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step === 1 ? "Book Material" : "Review & Confirm"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 
              ? "Enter your requirements to reserve supply" 
              : "Review your booking details before submission"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6 py-4">
            {/* Material Summary */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-lg">{material.type}</p>
                  <p className="text-sm text-muted-foreground">{supplier.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${material.price}/kg</p>
                  <p className="text-xs text-muted-foreground">Base price</p>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (kg) *</Label>
              <Input
                id="quantity"
                type="number"
                min={material.moq}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder={`Min: ${material.moq} kg`}
              />
              <p className="text-xs text-muted-foreground">
                Minimum order: {material.moq.toLocaleString()} kg
              </p>
            </div>

            {/* Delivery Method */}
            <div className="space-y-3">
              <Label>Delivery Method *</Label>
              <RadioGroup value={deliveryMethod} onValueChange={(v) => setDeliveryMethod(v as any)}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Truck className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Delivery</p>
                      <p className="text-xs text-muted-foreground">Freight quote provided after booking</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Package className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Pickup</p>
                      <p className="text-xs text-muted-foreground">Arrange your own logistics</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Preferred Date */}
            <div className="space-y-2">
              <Label>Preferred Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requirements or compliance information..."
                rows={3}
              />
            </div>

            {/* Price Summary */}
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Quantity</span>
                <span className="font-medium">{parseInt(quantity || "0").toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Unit Price</span>
                <span className="font-medium">
                  ${(() => {
                    const qty = parseInt(quantity) || 0;
                    let price = material.price;
                    for (const tier of material.bulkPricing) {
                      if (qty >= tier.quantity) price = tier.price;
                    }
                    return price;
                  })()}/kg
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Estimated Total</span>
                <span className="text-primary">${calculatedPrice().toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Final cost may vary based on delivery and additional fees
              </p>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={() => setStep(2)}
              disabled={!quantity || parseInt(quantity) < material.moq || !date}
            >
              Continue to Review
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 py-4">
            {/* Order Summary */}
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Order Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Supplier</span>
                  <span className="font-medium">{supplier.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material</span>
                  <span className="font-medium">{material.type} - {material.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="font-medium">{parseInt(quantity).toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Method</span>
                  <span className="font-medium capitalize">{deliveryMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Preferred Date</span>
                  <span className="font-medium">{date ? format(date, "PPP") : "Not set"}</span>
                </div>
                {notes && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Notes</span>
                    <span className="font-medium text-right max-w-xs">{notes}</span>
                  </div>
                )}
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Estimated Total</span>
                <span className="text-primary">${calculatedPrice().toLocaleString()}</span>
              </div>
            </div>

            {/* Important Notice */}
            <div className="p-4 border-2 border-warning/30 bg-warning/5 rounded-lg">
              <p className="text-sm font-medium mb-2">Important Notice</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Your booking request will be sent to the supplier for approval</li>
                <li>You will receive confirmation within 24-48 hours</li>
                <li>Final pricing may include delivery fees and taxes</li>
                <li>Payment terms will be discussed after approval</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1" size="lg" onClick={handleSubmit}>
                Submit Booking Request
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;