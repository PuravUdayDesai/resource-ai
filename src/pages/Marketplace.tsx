import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SupplierCard from "@/components/SupplierCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

const mockSuppliers = [
  {
    name: "GreenCycle Materials",
    location: "Ohio, USA",
    materials: ["rPET", "rHDPE"],
    minOrder: "5,000 kg",
    priceRange: "$1.20-1.35/kg",
    verified: true,
    certifications: ["FDA", "ISO 9001", "GRS"],
    aiVerificationStatus: "verified" as const,
  },
  {
    name: "EcoResin Supply Co",
    location: "California, USA",
    materials: ["rPP", "rPET"],
    minOrder: "3,000 kg",
    priceRange: "$1.15-1.28/kg",
    verified: true,
    certifications: ["FDA", "ISO 14001"],
    aiVerificationStatus: "verified" as const,
  },
  {
    name: "Circular Plastics Inc",
    location: "Texas, USA",
    materials: ["rHDPE", "rLDPE"],
    minOrder: "10,000 kg",
    priceRange: "$0.95-1.10/kg",
    verified: true,
    certifications: ["ISO 9001", "Chain of Custody"],
    aiVerificationStatus: "conditional" as const,
  },
  {
    name: "Renewed Resources",
    location: "Michigan, USA",
    materials: ["rPET", "rPP", "rHDPE"],
    minOrder: "7,500 kg",
    priceRange: "$1.10-1.30/kg",
    verified: true,
    certifications: ["FDA", "GRS", "ISO 9001"],
    aiVerificationStatus: "verified" as const,
  },
  {
    name: "Pacific PCR Solutions",
    location: "Oregon, USA",
    materials: ["rPET"],
    minOrder: "5,000 kg",
    priceRange: "$1.25-1.40/kg",
    verified: true,
    certifications: ["FDA", "ISO 9001", "ISO 14001"],
    aiVerificationStatus: "not-verified" as const,
  },
  {
    name: "Midwest Reclaimed Plastics",
    location: "Illinois, USA",
    materials: ["rHDPE", "rPP"],
    minOrder: "8,000 kg",
    priceRange: "$0.98-1.15/kg",
    verified: true,
    certifications: ["ISO 9001", "Chain of Custody"],
    aiVerificationStatus: "conditional" as const,
  },
];

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Supplier Marketplace
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse verified suppliers of recycled plastic materials
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search suppliers by name or location..." 
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Material Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Materials</SelectItem>
                <SelectItem value="rpet">rPET</SelectItem>
                <SelectItem value="rhdpe">rHDPE</SelectItem>
                <SelectItem value="rpp">rPP</SelectItem>
                <SelectItem value="rldpe">rLDPE</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="midwest">Midwest</SelectItem>
                <SelectItem value="west">West Coast</SelectItem>
                <SelectItem value="east">East Coast</SelectItem>
                <SelectItem value="south">South</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{mockSuppliers.length}</span> verified suppliers
          </p>
        </div>

        {/* Supplier Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSuppliers.map((supplier, index) => (
            <SupplierCard key={index} {...supplier} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace;
