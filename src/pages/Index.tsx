import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, ChefHat, Clock, CreditCard, ArrowRight } from "lucide-react";
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
        <div className="container relative mx-auto px-4 py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <UtensilsCrossed className="h-4 w-4" />
              Welcome to Tastify
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Delicious Food,{" "}
              <span className="text-primary">Delivered Fast</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Order your favorite dishes from our extensive menu. Fresh ingredients, 
              expert chefs, and quick delivery right to your table.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="text-base">
                <Link to="/menu">
                  View Menu
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base">
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Why Choose Tastify?</h2>
            <p className="text-muted-foreground">Experience the best dining with our modern ordering system</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-background p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground">Ready to Order?</h2>
            <p className="mb-8 text-lg text-primary-foreground/90">
              Sign up now and start exploring our delicious menu
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth?mode=signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Tastify Restaurant. Built for educational purposes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
