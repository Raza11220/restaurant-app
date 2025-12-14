import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Clock, ChefHat, Check, X } from "lucide-react";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  item_name: string;
  quantity: number;
  subtotal: number;
  special_instructions: string | null;
}

interface Order {
  id: string;
  status: string;
  order_type: string;
  table_number: number | null;
  total_amount: number;
  notes: string | null;
  created_at: string;
  order_items: OrderItem[];
}

const statuses = ["pending", "preparing", "ready", "delivered", "cancelled"];

const Staff = () => {
  const { user, role, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("active");

  useEffect(() => {
    if (!authLoading && (!user || (role !== "staff" && role !== "admin"))) {
      toast.error("Access denied. Staff only.");
      navigate("/");
    }
  }, [user, role, authLoading, navigate]);

  useEffect(() => {
    if (role === "staff" || role === "admin") {
      fetchOrders();
    }
  }, [role]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(`*, order_items (*)`)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", orderId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    }
  };

  const getFilteredOrders = () => {
    if (filter === "active") {
      return orders.filter((o) => ["pending", "preparing", "ready"].includes(o.status));
    }
    return orders.filter((o) => o.status === filter);
  };

  const getOrderCounts = () => ({
    pending: orders.filter((o) => o.status === "pending").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    ready: orders.filter((o) => o.status === "ready").length,
  });

  const counts = getOrderCounts();

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Staff Dashboard</h1>
          <Button variant="outline" onClick={fetchOrders}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="flex items-center gap-4 p-4">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{counts.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="flex items-center gap-4 p-4">
              <ChefHat className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{counts.preparing}</p>
                <p className="text-sm text-muted-foreground">Preparing</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="flex items-center gap-4 p-4">
              <Check className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{counts.ready}</p>
                <p className="text-sm text-muted-foreground">Ready</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={setFilter} className="mb-6">
          <TabsList>
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="preparing">Preparing</TabsTrigger>
            <TabsTrigger value="ready">Ready</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Orders */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {getFilteredOrders().map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </CardTitle>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="capitalize">{order.order_type}</span>
                  {order.table_number && <span>• Table {order.table_number}</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.item_name}</span>
                      {item.special_instructions && (
                        <span className="text-xs text-muted-foreground italic">
                          ({item.special_instructions})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                
                {order.notes && (
                  <p className="text-xs text-muted-foreground italic">
                    Note: {order.notes}
                  </p>
                )}

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="font-semibold">${Number(order.total_amount).toFixed(2)}</span>
                  <Select
                    value={order.status}
                    onValueChange={(value) => handleStatusChange(order.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status} className="capitalize">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <p className="text-xs text-muted-foreground">
                  {new Date(order.created_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" • "}
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredOrders().length === 0 && (
          <div className="py-16 text-center">
            <X className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold">No orders found</h3>
            <p className="text-muted-foreground">There are no orders matching this filter</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Staff;
