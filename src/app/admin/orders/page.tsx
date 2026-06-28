import { ShoppingCart, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "#ORD-4821", customer: "Sarah Johnson", product: "Solar Panel 400W", date: "Jun 28, 2026", amount: "$3,200", status: "Completed", items: 2 },
  { id: "#ORD-4820", customer: "Mike Chen", product: "Inverter 5kW", date: "Jun 28, 2026", amount: "$1,800", status: "Processing", items: 1 },
  { id: "#ORD-4819", customer: "Emily Davis", product: "Battery Storage 10kWh", date: "Jun 27, 2026", amount: "$5,500", status: "Completed", items: 1 },
  { id: "#ORD-4818", customer: "Robert Wilson", product: "Solar Panel 300W x4", date: "Jun 27, 2026", amount: "$2,800", status: "Pending", items: 4 },
  { id: "#ORD-4817", customer: "Alice Morgan", product: "EV Charger", date: "Jun 26, 2026", amount: "$1,200", status: "Cancelled", items: 1 },
  { id: "#ORD-4816", customer: "James Parker", product: "Bifacial Panel 450W", date: "Jun 26, 2026", amount: "$4,200", status: "Completed", items: 3 },
  { id: "#ORD-4815", customer: "Lisa Turner", product: "Micro Inverter x2", date: "Jun 25, 2026", amount: "$680", status: "Shipped", items: 2 },
  { id: "#ORD-4814", customer: "Tom Harris", product: "Lithium Battery 5kWh", date: "Jun 25, 2026", amount: "$2,900", status: "Processing", items: 1 },
];

const stats = [
  { label: "Total Orders", value: "1,284", icon: ShoppingCart, color: "blue" },
  { label: "Completed", value: "968", icon: CheckCircle, color: "green" },
  { label: "Pending", value: "182", icon: Clock, color: "amber" },
  { label: "Revenue", value: "$248K", icon: TrendingUp, color: "purple" },
];

type OrderStatus = "Completed" | "Processing" | "Pending" | "Cancelled" | "Shipped";

const statusVariant: Record<OrderStatus, "success" | "warning" | "destructive" | "secondary" | "default"> = {
  Completed: "success",
  Processing: "warning",
  Pending: "secondary",
  Cancelled: "destructive",
  Shipped: "default",
};

export default function OrdersPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Orders</h2>
          <p className="admin-page-header-sub">Track and manage customer orders</p>
        </div>
        <div className="admin-page-header-actions">
          <button className="admin-btn-outline">Export CSV</button>
        </div>
      </div>

      {/* Mini stats */}
      <div className="admin-stats-grid" style={{ marginBottom: 24 }}>
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-label">{s.label}</span>
                <div className={`admin-stat-icon ${s.color}`}>
                  <Icon size={17} />
                </div>
              </div>
              <div className="admin-stat-value">{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <p className="admin-section-title">All Orders</p>
            <p className="admin-section-subtitle">{orders.length} orders listed</p>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Items</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ fontFamily: "monospace", color: "var(--admin-accent)", fontSize: 12 }}>{order.id}</td>
                <td style={{ fontWeight: 600 }}>{order.customer}</td>
                <td style={{ color: "var(--admin-text-secondary)" }}>{order.product}</td>
                <td style={{ color: "var(--admin-text-muted)" }}>{order.items}</td>
                <td style={{ color: "var(--admin-text-muted)", fontSize: 12 }}>{order.date}</td>
                <td style={{ fontWeight: 700 }}>{order.amount}</td>
                <td>
                  <Badge variant={statusVariant[order.status as OrderStatus] ?? "default"}>
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
