import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, ChefHat, Clock, CreditCard, ArrowRight, Star, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  const features = [
    {
      icon: UtensilsCrossed,
      title: "Browse Menu",
      description: "Explore our diverse menu with appetizers, mains, desserts, and drinks",
    },
    {
      icon: ChefHat,
      title: "Fresh & Quality",
      description: "All dishes prepared with fresh ingredients by our expert chefs",
    },
    {
      icon: Clock,
      title: "Quick Service",
      description: "Track your order in real-time from kitchen to your table",
    },
    {
      icon: CreditCard,
      title: "Easy Payment",
      description: "Multiple payment options for your convenience",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb,250_128_114)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(var(--accent-rgb,255_165_0)/0.1),transparent_50%)]" />
        <div className="container relative mx-auto px-4 py-28 text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary backdrop-blur-sm border border-primary/20 shadow-sm">
              <UtensilsCrossed className="h-4 w-4" />
              Welcome to Tastify Restaurant
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-foreground md:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Delicious Food,{" "}
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                Delivered Fast
              </span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground md:text-xl lg:text-2xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Order your favorite dishes from our extensive menu. Fresh ingredients, 
              expert chefs, and quick delivery right to your table.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              <Button size="lg" asChild className="text-base shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/menu">
                  View Menu
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base border-2 hover:bg-primary/5">
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Menu Items</div>
              </div>
              <div className="text-center border-x border-border">
                <div className="text-3xl md:text-4xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground mt-1">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary flex items-center justify-center gap-1">
                  4.9 <Star className="h-6 w-6 fill-primary" />
                </div>
                <div className="text-sm text-muted-foreground mt-1">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-card/50 backdrop-blur-sm py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <TrendingUp className="h-4 w-4" />
              Our Features
            </div>
            <h2 className="mb-4 text-4xl md:text-5xl font-bold text-foreground">Why Choose Tastify?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the best dining with our modern ordering system and exceptional service
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-8 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:scale-105 hover:bg-primary/5"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary to-orange-500 p-12 text-center md:p-16 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="relative">
              <h2 className="mb-6 text-4xl md:text-5xl font-bold text-primary-foreground">
                Ready to Order?
              </h2>
              <p className="mb-10 text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Sign up now and start exploring our delicious menu. Get exclusive offers and rewards with your first order!
              </p>
              <Button size="lg" variant="secondary" asChild className="shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <Link to="/auth?mode=signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
