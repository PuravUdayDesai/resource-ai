import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ComplianceTracker from "@/components/ComplianceTracker";
import PriceChart from "@/components/PriceChart";
import CompanyProfile from "@/components/CompanyProfile";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { 
  Download, Package, TrendingUp, DollarSign, FileText, Eye, Filter
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EnhancedDashboard = () => {
  const navigate = useNavigate();

  const handleExportReport = () => {
    toast({
      title: "Exporting Report",
      description: "Your compliance report is being generated as a PDF.",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filters",
      description: "Advanced filtering will be available soon.",
    });
  };

  const handleNewRFQ = () => {
    navigate("/marketplace");
    toast({
      title: "New RFQ",
      description: "Select a supplier from the marketplace to create a new RFQ.",
    });
  };

  const handleDownloadReports = () => {
    toast({
      title: "Downloading Reports",
      description: "Your reports are being packaged for download.",
    });
  };

  const handleTrackShipments = () => {
    navigate("/order-tracking");
  };

  const rfqs = [
    { id: "RFQ-2024-001", supplier: "GreenCycle Materials", material: "rPET - Food Grade", quantity: "10,000 kg", requestDate: "2024-01-28", status: "Quote Received" as const, quotedPrice: "$1.20/kg" },
    { id: "RFQ-2024-002", supplier: "EcoResin Supply Co", material: "rPP - Industrial", quantity: "15,000 kg", requestDate: "2024-01-26", status: "Under Review" as const, quotedPrice: "$1.15/kg" },
    { id: "RFQ-2024-003", supplier: "Circular Plastics Inc", material: "rHDPE - Mixed", quantity: "20,000 kg", requestDate: "2024-01-25", status: "Negotiation" as const, quotedPrice: "$0.98/kg" },
  ];

  const activeOrders = [
    { orderId: "ORD-2024-156", supplier: "GreenCycle Materials", material: "rPET - Food Grade", quantity: "5,000 kg", orderDate: "2024-02-01", deliveryDate: "2024-02-15", status: "In Production" as const, totalValue: "$6,250", incoterms: "FOB" },
    { orderId: "ORD-2024-157", supplier: "EcoResin Supply Co", material: "rPP - Industrial", quantity: "3,500 kg", orderDate: "2024-02-03", deliveryDate: "2024-02-18", status: "Confirmed" as const, totalValue: "$4,130", incoterms: "CIF" },
    { orderId: "ORD-2024-158", supplier: "Circular Plastics Inc", material: "rHDPE - Mixed", quantity: "10,000 kg", orderDate: "2024-01-20", deliveryDate: "2024-02-10", status: "In Transit" as const, totalValue: "$10,200", incoterms: "DAP" },
  ];

  const completedOrders = [
    { orderId: "ORD-2024-145", supplier: "GreenCycle Materials", material: "rPET", quantity: "5,000 kg", deliveryDate: "2024-01-15", status: "Delivered" as const, totalValue: "$6,250" },
    { orderId: "ORD-2024-143", supplier: "Circular Plastics Inc", material: "rHDPE", quantity: "10,000 kg", deliveryDate: "2024-01-08", status: "Delivered" as const, totalValue: "$10,200" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Enterprise Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              B2B Procurement & Compliance Management
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleFilter}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active RFQs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8</div>
              <p className="text-xs text-muted-foreground"><span className="text-pending">3 pending quotes</span></p>
            </CardContent>
          </Card>
          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">24</div>
              <p className="text-xs text-muted-foreground"><span className="text-success">+12%</span> from last month</p>
            </CardContent>
          </Card>
          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Unit Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$1.23/kg</div>
              <p className="text-xs text-muted-foreground"><span className="text-destructive">+5%</span> from last month</p>
            </CardContent>
          </Card>
          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cost Savings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$18,250</div>
              <p className="text-xs text-muted-foreground">vs. market average</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <ComplianceTracker currentPercentage={28} requiredPercentage={25} totalUsed={150000} recycledUsed={42000} />

            <Card className="shadow-[var(--shadow-soft)]">
              <Tabs defaultValue="rfqs" className="w-full">
                <CardHeader className="pb-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="rfqs">RFQs</TabsTrigger>
                    <TabsTrigger value="active">Active Orders</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent>
                  <TabsContent value="rfqs" className="mt-0">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>RFQ ID</TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Material</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Quoted Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rfqs.map((rfq) => (
                            <TableRow key={rfq.id}>
                              <TableCell className="font-medium">{rfq.id}</TableCell>
                              <TableCell>{rfq.supplier}</TableCell>
                              <TableCell className="text-sm">{rfq.material}</TableCell>
                              <TableCell>{rfq.quantity}</TableCell>
                              <TableCell><StatusBadge status={rfq.status} /></TableCell>
                              <TableCell className="font-semibold">{rfq.quotedPrice}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" onClick={() => navigate(`/quote-comparison?rfqId=${rfq.id}`)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="active" className="mt-0">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Material</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Delivery</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {activeOrders.map((order) => (
                            <TableRow key={order.orderId}>
                              <TableCell className="font-medium">{order.orderId}</TableCell>
                              <TableCell>{order.supplier}</TableCell>
                              <TableCell className="text-sm">{order.material}</TableCell>
                              <TableCell>{order.quantity}</TableCell>
                              <TableCell className="text-sm">{order.deliveryDate}</TableCell>
                              <TableCell><StatusBadge status={order.status} /></TableCell>
                              <TableCell className="font-semibold">{order.totalValue}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" onClick={() => navigate(`/order-tracking?orderId=${order.orderId}`)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="completed" className="mt-0">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Material</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Delivered</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="text-right">Docs</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {completedOrders.map((order) => (
                            <TableRow key={order.orderId}>
                              <TableCell className="font-medium">{order.orderId}</TableCell>
                              <TableCell>{order.supplier}</TableCell>
                              <TableCell className="text-sm">{order.material}</TableCell>
                              <TableCell>{order.quantity}</TableCell>
                              <TableCell className="text-sm">{order.deliveryDate}</TableCell>
                              <TableCell><StatusBadge status={order.status} /></TableCell>
                              <TableCell className="font-semibold">{order.totalValue}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" onClick={() => navigate(`/order-completion?orderId=${order.orderId}`)}>
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>

            <PriceChart />
          </div>

          <div className="space-y-6">
            <CompanyProfile type="buyer" />

            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={handleNewRFQ}>
                  <FileText className="h-4 w-4 mr-2" />
                  New RFQ
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleDownloadReports}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Reports
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleTrackShipments}>
                  <Package className="h-4 w-4 mr-2" />
                  Track Shipments
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--shadow-soft)] border-warning/30">
              <CardHeader>
                <CardTitle className="text-base text-warning">Compliance Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your current PCR usage (28%) exceeds the required minimum (25%). 
                  Keep up the great work on sustainability compliance!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EnhancedDashboard;
