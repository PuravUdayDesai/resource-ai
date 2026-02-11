import { useState } from "react";
import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Recycle, Menu } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignIn = () => {
    toast({
      title: "Sign In",
      description: "Authentication will be available soon. Stay tuned!",
    });
  };

  const handleGetStarted = () => {
    toast({
      title: "Welcome to ReSource",
      description: "Account creation will be available soon. Explore the marketplace in the meantime!",
    });
  };

  const navLinks = (
    <>
      <NavLink
        to="/marketplace"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        activeClassName="text-foreground font-medium"
        onClick={() => setMobileOpen(false)}
      >
        Marketplace
      </NavLink>
      <NavLink
        to="/dashboard"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        activeClassName="text-foreground font-medium"
        onClick={() => setMobileOpen(false)}
      >
        Dashboard
      </NavLink>
    </>
  );

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
              {navLinks}
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex flex-col gap-4">
                    {navLinks}
                  </div>
                  <div className="flex flex-col gap-2 pt-4 border-t border-border">
                    <Button variant="ghost" size="sm" onClick={() => { handleSignIn(); setMobileOpen(false); }}>
                      Sign In
                    </Button>
                    <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => { handleGetStarted(); setMobileOpen(false); }}>
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
