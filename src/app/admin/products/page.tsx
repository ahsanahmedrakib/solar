"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Package,
  Sun,
  Zap,
  Battery,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ProductStatus = "Active" | "Low Stock" | "Out of Stock" | "Discontinued";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  status: ProductStatus;
  sold: number;
  icon: React.ElementType;
}

const products: Product[] = [
  {
    id: "PRD-001",
    name: "Monocrystalline Solar Panel 400W",
    sku: "SP-MONO-400",
    category: "Solar Panels",
    price: "$320.00",
    stock: 148,
    status: "Active",
    sold: 892,
    icon: Sun,
  },
  {
    id: "PRD-002",
    name: "Polycrystalline Solar Panel 300W",
    sku: "SP-POLY-300",
    category: "Solar Panels",
    price: "$220.00",
    stock: 12,
    status: "Low Stock",
    sold: 1204,
    icon: Sun,
  },
  {
    id: "PRD-003",
    name: "Hybrid Inverter 5kW",
    sku: "INV-HYB-5K",
    category: "Inverters",
    price: "$1,850.00",
    stock: 56,
    status: "Active",
    sold: 438,
    icon: Zap,
  },
  {
    id: "PRD-004",
    name: "String Inverter 3kW",
    sku: "INV-STR-3K",
    category: "Inverters",
    price: "$980.00",
    stock: 0,
    status: "Out of Stock",
    sold: 321,
    icon: Zap,
  },
  {
    id: "PRD-005",
    name: "Lithium Battery 10kWh",
    sku: "BAT-LIT-10K",
    category: "Batteries",
    price: "$5,400.00",
    stock: 24,
    status: "Active",
    sold: 187,
    icon: Battery,
  },
  {
    id: "PRD-006",
    name: "EV Charger Level 2",
    sku: "EVC-LV2-22K",
    category: "EV Charging",
    price: "$1,200.00",
    stock: 38,
    status: "Active",
    sold: 256,
    icon: Zap,
  },
  {
    id: "PRD-007",
    name: "Bifacial Solar Panel 450W",
    sku: "SP-BIF-450",
    category: "Solar Panels",
    price: "$420.00",
    stock: 67,
    status: "Active",
    sold: 543,
    icon: Sun,
  },
  {
    id: "PRD-008",
    name: "Micro Inverter 300W",
    sku: "INV-MIC-300",
    category: "Inverters",
    price: "$340.00",
    stock: 0,
    status: "Discontinued",
    sold: 1092,
    icon: Zap,
  },
];

const categories = ["All", "Solar Panels", "Inverters", "Batteries", "EV Charging"];

const statusVariant: Record<ProductStatus, "success" | "warning" | "destructive" | "secondary"> = {
  Active: "success",
  "Low Stock": "warning",
  "Out of Stock": "destructive",
  Discontinued: "secondary",
};

const iconColors: Record<string, string> = {
  "Solar Panels": "#f59e0b",
  Inverters: "#3b82f6",
  Batteries: "#10b981",
  "EV Charging": "#8b5cf6",
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Products</h2>
          <p className="admin-page-header-sub">
            Manage your solar product catalog ({products.length} products)
          </p>
        </div>
        <div className="admin-page-header-actions">
          <button className="admin-btn-outline">
            <Filter size={14} />
            Filter
          </button>
          <button
            id="add-product-btn"
            className="admin-btn-primary"
          >
            <Plus size={14} />
            Add Product
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div className="admin-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(" ", "-")}`}
              className={`admin-filter-chip${activeCategory === cat ? " active" : ""}`}
              onClick={() => {
                setActiveCategory(cat);
                setPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="admin-table-search">
          <Search size={14} className="admin-table-search-icon" />
          <input
            id="product-search"
            placeholder="Search products..."
            className="admin-table-search-input"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={{
              background: "var(--admin-surface-2)",
              border: "1px solid var(--admin-border)",
              color: "var(--admin-text-primary)",
              borderRadius: 8,
              padding: "8px 12px 8px 34px",
              fontSize: 13,
              outline: "none",
              width: 240,
            }}
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="admin-table-card">
        {paginated.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <Package size={26} />
            </div>
            <p className="admin-empty-title">No products found</p>
            <p className="admin-empty-desc">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Sold</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((product) => {
                const Icon = product.icon;
                const iconColor = iconColors[product.category] ?? "#f59e0b";
                return (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-product-cell">
                        <div
                          className="admin-product-img"
                          style={{
                            background: `${iconColor}18`,
                            color: iconColor,
                            border: `1px solid ${iconColor}30`,
                          }}
                        >
                          <Icon size={17} />
                        </div>
                        <div>
                          <p className="admin-product-name">{product.name}</p>
                          <p className="admin-product-sku">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--admin-text-muted)" }}>
                      {product.sku}
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: 12,
                          padding: "3px 8px",
                          borderRadius: 100,
                          background: `${iconColor}18`,
                          color: iconColor,
                          fontWeight: 600,
                        }}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{product.price}</td>
                    <td>
                      <span
                        style={{
                          color:
                            product.stock === 0
                              ? "var(--admin-danger)"
                              : product.stock < 20
                              ? "var(--admin-warning)"
                              : "var(--admin-success)",
                          fontWeight: 600,
                        }}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td style={{ color: "var(--admin-text-secondary)" }}>{product.sold}</td>
                    <td>
                      <Badge variant={statusVariant[product.status]}>
                        {product.status}
                      </Badge>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                        <button
                          id={`view-${product.id}`}
                          className="admin-action-btn"
                          aria-label={`View ${product.name}`}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          id={`edit-${product.id}`}
                          className="admin-action-btn"
                          aria-label={`Edit ${product.name}`}
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          id={`delete-${product.id}`}
                          className="admin-action-btn danger"
                          aria-label={`Delete ${product.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderTop: "1px solid var(--admin-border)",
            }}
          >
            <span style={{ fontSize: 12, color: "var(--admin-text-muted)" }}>
              Showing {(page - 1) * perPage + 1}–
              {Math.min(page * perPage, filtered.length)} of {filtered.length} products
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                id="prev-page-btn"
                className="admin-action-btn"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                style={{ opacity: page === 1 ? 0.4 : 1 }}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  id={`page-${p}-btn`}
                  className="admin-action-btn"
                  onClick={() => setPage(p)}
                  style={{
                    background: p === page ? "var(--admin-accent-muted)" : "transparent",
                    color: p === page ? "var(--admin-accent)" : "var(--admin-text-secondary)",
                    fontWeight: p === page ? 700 : 400,
                    width: 30,
                    height: 30,
                    fontSize: 13,
                  }}
                >
                  {p}
                </button>
              ))}
              <button
                id="next-page-btn"
                className="admin-action-btn"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                style={{ opacity: page === totalPages ? 0.4 : 1 }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
