import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
}

const MenuItemCard = ({ id, name, description, price, imageUrl, isAvailable }: MenuItemCardProps) => {
  const { addItem } = useCart();
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      toast.info("Please login to add items to cart");
      navigate("/auth");
      return;
    }
    if (role !== "customer") {
      toast.info("Only customers can add items to cart");
      return;
    }
    addItem({ id, name, price });
    toast.success(`${name} added to cart`);
  };

  // Fallback image
  const displayImage = imageUrl || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80';

  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-border/50 ${!isAvailable ? "opacity-60" : ""}`}>
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <img 
          src={displayImage} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
            <span className="rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground shadow-lg">
              Unavailable
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{name}</h3>
          <span className="flex-shrink-0 font-bold text-primary text-lg">${price.toFixed(2)}</span>
        </div>
        {description && (
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
        )}
        <Button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className="w-full bg-gradient-to-r from-primary to-orange-500 hover:opacity-90 shadow-md transition-all"
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
