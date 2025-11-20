import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Shield, TrendingDown, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-recycling.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]"></div>
        <img 
          src={heroImage} 
          alt="Sustainable recycling manufacturing" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="container relative mx-auto px-4 py-24 md:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 drop-shadow-lg">
              Reliable Recycled Plastic for Growing Manufacturers
            </h1>
            <p className="text-xl text-primary-foreground/95 mb-8 leading-relaxed drop-shadow-md">
              Source verified, high-quality recycled plastic at fair prices. Meet your 25% compliance requirement with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/marketplace">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
                  Explore Suppliers
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for SME Packaging Manufacturers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand the challenges you face competing with large corporations who control PCR supply chains.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-[var(--shadow-soft)]">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Quality Verified</h3>
                <p className="text-sm text-muted-foreground">
                  All suppliers vetted with FDA, ISO, and chain-of-custody certifications
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-[var(--shadow-soft)]">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Fair Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent pricing and historical trends to ensure you pay market rates
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-[var(--shadow-soft)]">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-trust/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-trust" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Compliance Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Track your 25% requirement automatically with downloadable reports
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-[var(--shadow-soft)]">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Demand Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Get alerts when suppliers have materials that match your needs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple Process, Reliable Results
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Browse Verified Suppliers",
                description: "Search our marketplace of vetted suppliers offering rPET, rHDPE, rPP, and more.",
              },
              {
                step: "02",
                title: "Compare Quality & Pricing",
                description: "Review certifications, pricing, and availability to find the best match for your needs.",
              },
              {
                step: "03",
                title: "Track Your Compliance",
                description: "Monitor your recycled plastic usage against the 25% requirement in real-time.",
              },
              {
                step: "04",
                title: "Generate Reports",
                description: "Download compliance reports for audits and regulatory submissions.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex-grow pt-2">
                  <h3 className="font-semibold text-xl mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Source Recycled Plastic with Confidence?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join manufacturers who are meeting compliance requirements while building a sustainable supply chain.
          </p>
          <Link to="/marketplace">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
