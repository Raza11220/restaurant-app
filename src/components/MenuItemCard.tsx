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

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${!isAvailable ? "opacity-60" : ""}`}>
      <div className="relative aspect-[4/3] bg-muted">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <UtensilsCrossed className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="rounded-full bg-destructive px-3 py-1 text-sm font-medium text-destructive-foreground">
              Unavailable
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <span className="flex-shrink-0 font-bold text-primary">${price.toFixed(2)}</span>
        </div>
        {description && (
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{description}</p>
        )}
        <Button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className="w-full"
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
