import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { month: "Jan", rPET: 1.20, rHDPE: 0.95, rPP: 1.05 },
  { month: "Feb", rPET: 1.25, rHDPE: 0.98, rPP: 1.08 },
  { month: "Mar", rPET: 1.22, rHDPE: 0.93, rPP: 1.12 },
  { month: "Apr", rPET: 1.28, rHDPE: 0.99, rPP: 1.15 },
  { month: "May", rPET: 1.30, rHDPE: 1.02, rPP: 1.18 },
  { month: "Jun", rPET: 1.27, rHDPE: 1.00, rPP: 1.14 },
];

const PriceChart = () => {
  return (
    <Card className="shadow-[var(--shadow-soft)]">
      <CardHeader>
        <CardTitle>Price Trends (USD per kg)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              stroke="hsl(var(--border))"
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              stroke="hsl(var(--border))"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="rPET" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="rPET"
            />
            <Line 
              type="monotone" 
              dataKey="rHDPE" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              name="rHDPE"
            />
            <Line 
              type="monotone" 
              dataKey="rPP" 
              stroke="hsl(var(--trust-blue))" 
              strokeWidth={2}
              name="rPP"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-sm text-muted-foreground">rPET</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <span className="text-sm text-muted-foreground">rHDPE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-trust"></div>
            <span className="text-sm text-muted-foreground">rPP</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
