import { Badge } from "@/components/ui/badge";
import {
  Activity,
  ArrowUpRight,
  DollarSign,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { JSX } from "react/jsx-runtime";

const stats = [
  {
    label: "Total Revenue",
    value: "$248,500",
    trend: "+18.2%",
    trendUp: true,
    sub: "vs last month",
    icon: DollarSign,
    color: "amber",
  },
  {
    label: "Active Orders",
    value: "1,284",
    trend: "+6.4%",
    trendUp: true,
    sub: "vs last month",
    icon: ShoppingCart,
    color: "green",
  },
  {
    label: "Total Customers",
    value: "8,943",
    trend: "+12.7%",
    trendUp: true,
    sub: "vs last month",
    icon: Users,
    color: "blue",
  },
  {
    label: "Energy Output",
    value: "94.2 MW",
    trend: "-2.1%",
    trendUp: false,
    sub: "vs last month",
    icon: Zap,
    color: "purple",
  },
];

const recentOrders = [
  {
    id: "#ORD-4821",
    customer: "Sarah Johnson",
    product: "Solar Panel 400W",
    amount: "$3,200",
    status: "Completed",
  },
  {
    id: "#ORD-4820",
    customer: "Mike Chen",
    product: "Inverter 5kW",
    amount: "$1,800",
    status: "Processing",
  },
  {
    id: "#ORD-4819",
    customer: "Emily Davis",
    product: "Battery Storage 10kWh",
    amount: "$5,500",
    status: "Completed",
  },
  {
    id: "#ORD-4818",
    customer: "Robert Wilson",
    product: "Solar Panel 300W x4",
    amount: "$2,800",
    status: "Pending",
  },
  {
    id: "#ORD-4817",
    customer: "Alice Morgan",
    product: "EV Charger",
    amount: "$1,200",
    status: "Cancelled",
  },
];

const activities = [
  {
    text: "New order #ORD-4821 placed by Sarah Johnson",
    time: "2 minutes ago",
    color: "#10b981",
  },
  {
    text: "Product 'Solar Panel 400W' inventory low (12 left)",
    time: "18 minutes ago",
    color: "#f59e0b",
  },
  {
    text: "Payment of $5,500 received from Emily Davis",
    time: "1 hour ago",
    color: "#3b82f6",
  },
  {
    text: "Order #ORD-4818 status updated to Processing",
    time: "2 hours ago",
    color: "#8b5cf6",
  },
  {
    text: "New customer 'James Parker' registered",
    time: "3 hours ago",
    color: "#10b981",
  },
];

const statusVariant: Record<
  string,
  "success" | "warning" | "destructive" | "secondary" | "default"
> = {
  Completed: "success",
  Processing: "warning",
  Pending: "secondary",
  Cancelled: "destructive",
};

const barData = [
  { label: "Jan", h: 40 },
  { label: "Feb", h: 60 },
  { label: "Mar", h: 80 },
  { label: "Apr", h: 55 },
  { label: "May", h: 90 },
  { label: "Jun", h: 70 },
  { label: "Jul", h: 100 },
];

const donutSegments = [
  { label: "Solar Panels", value: "42%", color: "#f59e0b", pct: 42 },
  { label: "Inverters", value: "28%", color: "#3b82f6", pct: 28 },
  { label: "Batteries", value: "18%", color: "#10b981", pct: 18 },
  { label: "Accessories", value: "12%", color: "#8b5cf6", pct: 12 },
];

function DonutChart() {
  const r = 54;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * r;
  const donutCircles = donutSegments.reduce(
    (state: { offset: number; elements: JSX.Element[] }, seg, i) => {
      const strokeLen = (seg.pct / 100) * circumference;
      const gap = circumference - strokeLen;
      state.elements.push(
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={seg.color}
          strokeWidth="16"
          strokeDasharray={`${strokeLen} ${gap}`}
          strokeDashoffset={-state.offset}
          strokeLinecap="butt"
        />,
      );
      state.offset += strokeLen;
      return state;
    },
    { offset: 0, elements: [] as JSX.Element[] },
  ).elements;

  return (
    <div className="admin-donut-wrapper">
      <div className="admin-donut-chart">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {donutCircles}
          {/* Inner ring background */}
          <circle cx={cx} cy={cy} r="38" fill="#161b27" />
        </svg>
        <div className="admin-donut-center">
          <span className="admin-donut-center-value">100%</span>
          <span className="admin-donut-center-label">Sales</span>
        </div>
      </div>
      <div className="admin-donut-legend">
        {donutSegments.map((seg) => (
          <div key={seg.label} className="admin-donut-legend-item">
            <span className="admin-donut-legend-label">
              <span
                className="admin-donut-dot"
                style={{ background: seg.color }}
              />
              {seg.label}
            </span>
            <span className="admin-donut-legend-value">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div>
      {/* Stats */}
      <div className="admin-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-label">{stat.label}</span>
                <div className={`admin-stat-icon ${stat.color}`}>
                  <Icon size={17} />
                </div>
              </div>
              <div className="admin-stat-value">{stat.value}</div>
              <div
                className="admin-stat-trend-row"
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <span
                  className={`admin-stat-trend ${stat.trendUp ? "up" : "down"}`}
                >
                  {stat.trendUp ? (
                    <TrendingUp size={13} />
                  ) : (
                    <TrendingDown size={13} />
                  )}
                  {stat.trend}
                </span>
                <span className="admin-stat-sub">{stat.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="admin-dashboard-grid">
        {/* Bar chart */}
        <div className="admin-section-card">
          <div className="admin-section-header">
            <div>
              <p className="admin-section-title">Revenue Overview</p>
              <p className="admin-section-subtitle">
                Monthly sales performance
              </p>
            </div>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                color: "#10b981",
                fontWeight: 600,
              }}
            >
              <ArrowUpRight size={14} /> +18.2% this month
            </span>
          </div>
          <div className="admin-section-body">
            <div className="admin-bar-chart">
              {barData.map((bar) => (
                <div key={bar.label} className="admin-bar-group">
                  <div className="admin-bar-track">
                    <div
                      className="admin-bar-fill"
                      style={{ height: `${bar.h}%` }}
                    />
                  </div>
                  <span className="admin-bar-label">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Donut chart */}
        <div className="admin-section-card">
          <div className="admin-section-header">
            <div>
              <p className="admin-section-title">Sales by Category</p>
              <p className="admin-section-subtitle">Product breakdown</p>
            </div>
          </div>
          <div className="admin-section-body">
            <DonutChart />
          </div>
        </div>
      </div>

      {/* Two column row: Recent Orders + Activity */}
      <div className="admin-dashboard-grid">
        {/* Recent Orders */}
        <div className="admin-table-card">
          <div className="admin-table-header">
            <div>
              <p className="admin-section-title">Recent Orders</p>
              <p className="admin-section-subtitle">Latest 5 transactions</p>
            </div>
            <a
              href="/admin/orders"
              style={{
                fontSize: 12,
                color: "var(--admin-accent)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              View all →
            </a>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td
                    style={{
                      fontFamily: "monospace",
                      color: "var(--admin-accent)",
                      fontSize: 12,
                    }}
                  >
                    {order.id}
                  </td>
                  <td>{order.customer}</td>
                  <td style={{ color: "var(--admin-text-secondary)" }}>
                    {order.product}
                  </td>
                  <td style={{ fontWeight: 700 }}>{order.amount}</td>
                  <td>
                    <Badge variant={statusVariant[order.status] ?? "default"}>
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity Feed */}
        <div className="admin-section-card">
          <div className="admin-section-header">
            <div>
              <p className="admin-section-title">Recent Activity</p>
              <p className="admin-section-subtitle">Live event feed</p>
            </div>
            <Activity size={15} style={{ color: "var(--admin-text-muted)" }} />
          </div>
          <div className="admin-section-body">
            <div className="admin-activity-list">
              {activities.map((act, i) => (
                <div key={i} className="admin-activity-item">
                  <div
                    className="admin-activity-dot"
                    style={{ background: act.color }}
                  />
                  <div className="admin-activity-content">
                    <p className="admin-activity-text">{act.text}</p>
                    <p className="admin-activity-time">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
