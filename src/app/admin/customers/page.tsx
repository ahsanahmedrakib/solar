import { Users, UserCheck, Star, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const customers = [
  { id: "USR-001", name: "Sarah Johnson", email: "sarah.j@email.com", orders: 12, spent: "$38,400", joined: "Jan 2025", status: "VIP", location: "New York, USA" },
  { id: "USR-002", name: "Mike Chen", email: "mike.c@email.com", orders: 8, spent: "$14,200", joined: "Mar 2025", status: "Active", location: "Los Angeles, USA" },
  { id: "USR-003", name: "Emily Davis", email: "emily.d@email.com", orders: 5, spent: "$22,000", joined: "May 2025", status: "Active", location: "Chicago, USA" },
  { id: "USR-004", name: "Robert Wilson", email: "r.wilson@email.com", orders: 3, spent: "$8,400", joined: "Jun 2025", status: "New", location: "Houston, USA" },
  { id: "USR-005", name: "Alice Morgan", email: "alice.m@email.com", orders: 1, spent: "$1,200", joined: "Jun 2026", status: "New", location: "Phoenix, USA" },
  { id: "USR-006", name: "James Parker", email: "j.parker@email.com", orders: 15, spent: "$52,000", joined: "Oct 2024", status: "VIP", location: "Philadelphia, USA" },
  { id: "USR-007", name: "Lisa Turner", email: "l.turner@email.com", orders: 6, spent: "$9,800", joined: "Feb 2025", status: "Active", location: "San Antonio, USA" },
  { id: "USR-008", name: "Tom Harris", email: "t.harris@email.com", orders: 2, spent: "$5,800", joined: "May 2026", status: "Active", location: "Dallas, USA" },
];

const stats = [
  { label: "Total Customers", value: "8,943", icon: Users, color: "blue" },
  { label: "Active", value: "7,212", icon: UserCheck, color: "green" },
  { label: "VIP Members", value: "284", icon: Star, color: "amber" },
  { label: "Avg. Spend", value: "$3,200", icon: DollarSign, color: "purple" },
];

type CustomerStatus = "VIP" | "Active" | "New" | "Inactive";
const statusVariant: Record<CustomerStatus, "success" | "warning" | "destructive" | "secondary" | "default"> = {
  VIP: "warning",
  Active: "success",
  New: "default",
  Inactive: "destructive",
};

export default function CustomersPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Customers</h2>
          <p className="admin-page-header-sub">Manage your customer base</p>
        </div>
        <div className="admin-page-header-actions">
          <button className="admin-btn-outline">Export</button>
          <button className="admin-btn-primary">
            <Users size={14} />
            Add Customer
          </button>
        </div>
      </div>

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

      <div className="admin-table-card">
        <div className="admin-table-header">
          <p className="admin-section-title">All Customers</p>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Location</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "var(--admin-accent-muted)",
                        color: "var(--admin-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 13,
                        flexShrink: 0,
                      }}
                    >
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 13.5 }}>{c.name}</p>
                      <p style={{ fontSize: 11, color: "var(--admin-text-muted)" }}>{c.id}</p>
                    </div>
                  </div>
                </td>
                <td style={{ color: "var(--admin-text-secondary)", fontSize: 13 }}>{c.email}</td>
                <td style={{ color: "var(--admin-text-muted)", fontSize: 12 }}>{c.location}</td>
                <td style={{ fontWeight: 600, textAlign: "center" }}>{c.orders}</td>
                <td style={{ fontWeight: 700 }}>{c.spent}</td>
                <td style={{ color: "var(--admin-text-muted)", fontSize: 12 }}>{c.joined}</td>
                <td>
                  <Badge variant={statusVariant[c.status as CustomerStatus] ?? "default"}>
                    {c.status}
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
