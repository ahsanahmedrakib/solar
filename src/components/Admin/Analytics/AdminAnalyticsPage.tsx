import { BarChart3, TrendingUp } from "lucide-react";

const kpis = [
  {
    label: "Conversion Rate",
    value: "3.84%",
    change: "+0.6%",
    up: true,
    color: "#f59e0b",
  },
  {
    label: "Avg Order Value",
    value: "$1,932",
    change: "+$124",
    up: true,
    color: "#10b981",
  },
  {
    label: "Return Rate",
    value: "2.1%",
    change: "-0.3%",
    up: true,
    color: "#3b82f6",
  },
  {
    label: "Customer LTV",
    value: "$8,240",
    change: "+$420",
    up: true,
    color: "#8b5cf6",
  },
];

const topProducts = [
  { name: "Solar Panel 400W", revenue: "$124,800", units: 390, pct: 85 },
  { name: "Lithium Battery 10kWh", revenue: "$102,600", units: 19, pct: 70 },
  { name: "Hybrid Inverter 5kW", revenue: "$80,900", units: 43, pct: 55 },
  { name: "Bifacial Panel 450W", revenue: "$60,500", units: 144, pct: 42 },
  { name: "EV Charger Level 2", revenue: "$48,000", units: 40, pct: 33 },
];

const monthlyData = [
  { month: "Jan", revenue: 18200, orders: 94 },
  { month: "Feb", revenue: 22400, orders: 116 },
  { month: "Mar", revenue: 31000, orders: 160 },
  { month: "Apr", revenue: 28400, orders: 147 },
  { month: "May", revenue: 38200, orders: 198 },
  { month: "Jun", revenue: 42100, orders: 218 },
];

export default function AdminAnalyticsPage() {
  const maxRevenue = Math.max(...monthlyData?.map((d) => d.revenue));

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Analytics</h2>
          <p className="admin-page-header-sub">Business performance insights</p>
        </div>
        <div className="admin-page-header-actions">
          <button className="admin-btn-outline">
            <BarChart3 size={14} />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="admin-stats-grid" style={{ marginBottom: 24 }}>
        {kpis?.map((kpi) => (
          <div key={kpi.label} className="admin-stat-card">
            <span className="admin-stat-label">{kpi.label}</span>
            <div className="admin-stat-value">{kpi.value}</div>
            <span
              className={`admin-stat-trend ${kpi.up ? "up" : "down"}`}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              <TrendingUp size={12} />
              {kpi.change} this month
            </span>
          </div>
        ))}
      </div>

      <div className="admin-dashboard-grid">
        {/* Revenue chart */}
        <div className="admin-section-card">
          <div className="admin-section-header">
            <div>
              <p className="admin-section-title">Monthly Revenue & Orders</p>
              <p className="admin-section-subtitle">H1 2026 performance</p>
            </div>
          </div>
          <div className="admin-section-body">
            <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  color: "var(--admin-text-secondary)",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: "#f59e0b",
                    display: "inline-block",
                  }}
                />
                Revenue
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  color: "var(--admin-text-secondary)",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: "#3b82f6",
                    display: "inline-block",
                  }}
                />
                Orders
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-end",
                height: 160,
              }}
            >
              {monthlyData?.map((d) => {
                const revH = (d.revenue / maxRevenue) * 140;
                const ordH = (d.orders / 220) * 140;
                return (
                  <div
                    key={d.month}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      height: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 4,
                        alignItems: "flex-end",
                        height: 140,
                      }}
                    >
                      <div
                        style={{
                          width: "45%",
                          height: revH,
                          background: "#f59e0b",
                          borderRadius: "3px 3px 0 0",
                          opacity: 0.85,
                        }}
                      />
                      <div
                        style={{
                          width: "45%",
                          height: ordH,
                          background: "#3b82f6",
                          borderRadius: "3px 3px 0 0",
                          opacity: 0.85,
                        }}
                      />
                    </div>
                    <span
                      style={{ fontSize: 10, color: "var(--admin-text-muted)" }}
                    >
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Traffic sources */}
        <div className="admin-section-card">
          <div className="admin-section-header">
            <div>
              <p className="admin-section-title">Traffic Sources</p>
              <p className="admin-section-subtitle">Lead origin breakdown</p>
            </div>
          </div>
          <div className="admin-section-body">
            {[
              { source: "Organic Search", pct: 42, color: "#f59e0b" },
              { source: "Direct", pct: 28, color: "#10b981" },
              { source: "Social Media", pct: 18, color: "#3b82f6" },
              { source: "Referral", pct: 8, color: "#8b5cf6" },
              { source: "Email", pct: 4, color: "#ef4444" },
            ]?.map((s) => (
              <div key={s.source} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: "var(--admin-text-secondary)",
                    }}
                  >
                    {s.source}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--admin-text-primary)",
                    }}
                  >
                    {s.pct}%
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: "var(--admin-surface-2)",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${s.pct}%`,
                      background: s.color,
                      borderRadius: 10,
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="admin-table-card" style={{ marginTop: 20 }}>
        <div className="admin-table-header">
          <p className="admin-section-title">Top Products by Revenue</p>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Revenue</th>
              <th>Units Sold</th>
              <th style={{ minWidth: 180 }}>Performance</th>
            </tr>
          </thead>
          <tbody>
            {topProducts?.map((p, i) => (
              <tr key={p.name}>
                <td style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      background: "var(--admin-accent-muted)",
                      color: "var(--admin-accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    #{i + 1}
                  </span>
                  {p.name}
                </td>
                <td style={{ fontWeight: 700 }}>{p.revenue}</td>
                <td style={{ color: "var(--admin-text-secondary)" }}>
                  {p.units}
                </td>
                <td>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 6,
                        background: "var(--admin-surface-2)",
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${p.pct}%`,
                          background: "var(--admin-accent)",
                          borderRadius: 10,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--admin-text-muted)",
                        width: 30,
                      }}
                    >
                      {p.pct}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
