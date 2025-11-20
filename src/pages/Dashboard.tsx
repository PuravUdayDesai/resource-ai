import Navigation from "@/components/Navigation";
import ComplianceTracker from "@/components/ComplianceTracker";
import PriceChart from "@/components/PriceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Package, TrendingUp, DollarSign } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Compliance Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your recycled plastic usage and compliance status
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg. Price
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$1.23/kg</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-destructive">+5%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cost Savings
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$18,250</div>
              <p className="text-xs text-muted-foreground">
                vs. market average
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Tracker */}
        <div className="mb-8">
          <ComplianceTracker 
            currentPercentage={28}
            requiredPercentage={25}
            totalUsed={150000}
            recycledUsed={42000}
          />
        </div>

        {/* Price Trends */}
        <div className="mb-8">
          <PriceChart />
        </div>

        {/* Recent Orders */}
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { supplier: "GreenCycle Materials", material: "rPET", quantity: "5,000 kg", price: "$1.25/kg", date: "2024-01-15", status: "Delivered" },
                { supplier: "EcoResin Supply Co", material: "rPP", quantity: "3,500 kg", price: "$1.18/kg", date: "2024-01-12", status: "In Transit" },
                { supplier: "Circular Plastics Inc", material: "rHDPE", quantity: "10,000 kg", price: "$1.02/kg", date: "2024-01-08", status: "Delivered" },
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{order.supplier}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.material} • {order.quantity}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold text-foreground">{order.price}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="ml-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === "Delivered" 
                        ? "bg-success/10 text-success" 
                        : "bg-warning/10 text-warning"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
