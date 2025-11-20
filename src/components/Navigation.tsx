import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { Recycle } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <NavLink to="/" className="flex items-center gap-2 font-semibold text-lg text-foreground hover:text-primary transition-colors">
              <Recycle className="h-6 w-6 text-primary" />
              <span>ReSource</span>
            </NavLink>
            <div className="hidden md:flex items-center gap-6">
              <NavLink 
                to="/marketplace" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                activeClassName="text-foreground font-medium"
              >
                Marketplace
              </NavLink>
              <NavLink 
                to="/dashboard" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                activeClassName="text-foreground font-medium"
              >
                Dashboard
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
