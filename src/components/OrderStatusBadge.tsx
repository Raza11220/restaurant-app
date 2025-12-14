import { Badge } from "@/components/ui/badge";

interface OrderStatusBadgeProps {
  status: string;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const statusStyles: Record<string, string> = {
    pending: "status-pending",
    preparing: "status-preparing",
    ready: "status-ready",
    delivered: "status-delivered",
    cancelled: "status-cancelled",
  };

  return (
    <Badge className={`${statusStyles[status] || ""} capitalize`}>
      {status}
    </Badge>
  );
};

export default OrderStatusBadge;
