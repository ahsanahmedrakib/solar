import { Bell, CheckCircle, Package, Users, CreditCard } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order #ORD-4821 placed by Sarah Johnson for $3,200",
    time: "2 minutes ago",
    read: false,
    icon: Package,
    color: "#f59e0b",
  },
  {
    id: 2,
    type: "customer",
    title: "New Customer Registration",
    message: "James Parker signed up as a new customer",
    time: "18 minutes ago",
    read: false,
    icon: Users,
    color: "#3b82f6",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment Confirmed",
    message: "Payment of $5,500 received from Emily Davis",
    time: "1 hour ago",
    read: false,
    icon: CreditCard,
    color: "#10b981",
  },
  {
    id: 4,
    type: "system",
    title: "System Update Complete",
    message: "Admin panel updated to version 2.4.1 successfully",
    time: "3 hours ago",
    read: true,
    icon: CheckCircle,
    color: "#8b5cf6",
  },
  {
    id: 5,
    type: "order",
    title: "Order Shipped",
    message: "Order #ORD-4815 has been shipped to Lisa Turner",
    time: "5 hours ago",
    read: true,
    icon: Package,
    color: "#f59e0b",
  },
];

export default function NotificationsPage() {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Notifications</h2>
          <p className="admin-page-header-sub">
            {unread} unread notification{unread !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="admin-page-header-actions">
          <button id="mark-all-read-btn" className="admin-btn-outline">
            <CheckCircle size={14} />
            Mark all as read
          </button>
        </div>
      </div>

      <div className="admin-section-card">
        <div className="admin-activity-list" style={{ padding: "0 20px" }}>
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className="admin-activity-item"
                style={{
                  padding: "16px 0",
                  opacity: notif.read ? 0.6 : 1,
                  alignItems: "flex-start",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${notif.color}18`,
                    color: notif.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: notif.read ? 500 : 700,
                        color: "var(--admin-text-primary)",
                      }}
                    >
                      {notif.title}
                    </p>
                    <span style={{ fontSize: 11, color: "var(--admin-text-muted)", flexShrink: 0 }}>
                      {notif.time}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--admin-text-secondary)", marginTop: 4 }}>
                    {notif.message}
                  </p>
                </div>
                {!notif.read && (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--admin-accent)",
                      flexShrink: 0,
                      marginTop: 6,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
