import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Package, 
  ShieldCheck, 
  TrendingUp, 
  Truck, 
  Star,
  FileCheck,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";

const SupplierDetail = () => {
  const { id } = useParams();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Mock data - in production this would come from API
  const supplier = {
    id: id || "1",
    name: "GreenCycle Materials",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    materials: [
      {
        type: "rPET",
        grade: "Food Grade",
        color: "Clear/Natural",
        mfi: "25-35 g/10min",
        contamination: "< 0.5%",
        pelletSize: "3-4mm",
        available: 50000,
        moq: 5000,
        price: 1.25,
        bulkPricing: [
          { quantity: 10000, price: 1.20 },
          { quantity: 25000, price: 1.15 },
          { quantity: 50000, price: 1.10 }
        ]
      },
      {
        type: "rHDPE",
        grade: "Industrial",
        color: "Mixed",
        mfi: "5-8 g/10min",
        contamination: "< 1%",
        pelletSize: "3-5mm",
        available: 75000,
        moq: 10000,
        price: 1.02,
        bulkPricing: [
          { quantity: 20000, price: 0.98 },
          { quantity: 50000, price: 0.95 }
        ]
      }
    ],
    certifications: [
      { name: "FDA Approved", verified: true },
      { name: "ISO 9001:2015", verified: true },
      { name: "Chain of Custody", verified: true },
      { name: "GRS Certified", verified: true }
    ],
    logistics: {
      pickup: true,
      delivery: true,
      estimatedFreight: "Contact for quote",
      leadTime: "7-14 days"
    },
    reviews: [
      { author: "Apex Packaging", rating: 5, comment: "Consistent quality, reliable delivery times", date: "2024-01-10" },
      { author: "Metro Bottles Inc", rating: 4, comment: "Good material quality, slightly higher pricing", date: "2024-01-05" },
      { author: "EcoPack Solutions", rating: 5, comment: "Excellent partner for PCR sourcing", date: "2023-12-20" }
    ]
  };

  const [selectedMaterial, setSelectedMaterial] = useState(supplier.materials[0]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/marketplace">
          <Button variant="ghost" className="mb-6">
            ← Back to Marketplace
          </Button>
        </Link>

        {/* Supplier Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {supplier.name}
                </h1>
                {supplier.verified && (
                  <Badge className="bg-success/10 text-success border-success/20">
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {supplier.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  {supplier.rating} ({supplier.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Material Selection */}
            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle>Available Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {supplier.materials.map((material, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedMaterial(material)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedMaterial.type === material.type
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-lg">{material.type}</span>
                        <Badge variant="secondary">{material.grade}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        ${material.price}/kg
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Available: {(material.available / 1000).toFixed(0)}+ tons
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Selected Material Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">
                    {selectedMaterial.type} - {selectedMaterial.grade}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Color</p>
                      <p className="font-medium">{selectedMaterial.color}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">MFI</p>
                      <p className="font-medium">{selectedMaterial.mfi}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Contamination</p>
                      <p className="font-medium">{selectedMaterial.contamination}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Pellet Size</p>
                      <p className="font-medium">{selectedMaterial.pelletSize}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Pricing</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Base Price (MOQ: {selectedMaterial.moq.toLocaleString()} kg)</span>
                        <span className="font-bold text-lg">${selectedMaterial.price}/kg</span>
                      </div>
                      {selectedMaterial.bulkPricing.map((tier, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm">{tier.quantity.toLocaleString()}+ kg</span>
                          <span className="font-semibold">${tier.price}/kg</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Logistics */}
            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Logistics & Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Options</p>
                    <div className="flex gap-2">
                      {supplier.logistics.pickup && (
                        <Badge variant="secondary">Pickup Available</Badge>
                      )}
                      {supplier.logistics.delivery && (
                        <Badge variant="secondary">Delivery Available</Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Lead Time</p>
                    <p className="font-medium">{supplier.logistics.leadTime}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground mb-1">Freight Cost</p>
                    <p className="font-medium">{supplier.logistics.estimatedFreight}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supplier.reviews.map((review, idx) => (
                    <div key={idx} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{review.author}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{review.comment}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Material CTA */}
            <Card className="shadow-[var(--shadow-soft)] border-2 border-primary">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Starting at</p>
                  <p className="text-3xl font-bold text-primary">
                    ${selectedMaterial.price}/kg
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    MOQ: {selectedMaterial.moq.toLocaleString()} kg
                  </p>
                </div>
                <Button 
                  className="w-full mb-3" 
                  size="lg"
                  onClick={() => setIsBookingOpen(true)}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Book Material
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Supplier
                </Button>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    Booking is subject to supplier approval. You'll receive confirmation within 24-48 hours.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {supplier.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{cert.name}</span>
                      {cert.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <Button variant="link" className="w-full mt-4 text-xs">
                  View All Documents →
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="text-base">Supplier Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Orders</span>
                  <span className="font-semibold">450+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                  <span className="font-semibold text-success">96%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="font-semibold">&lt; 4 hours</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        supplier={supplier}
        material={selectedMaterial}
      />
    </div>
  );
};

export default SupplierDetail;