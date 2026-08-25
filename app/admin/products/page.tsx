"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  productsApi,
  brandsApi,
  categoriesApi,
  ProductResponse,
  ProductCreate,
  ProductUpdate,
  BrandResponse,
  CategoryResponse,
  ApiError,
} from "@/lib/api";
import { Modal } from "../components/Modal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Badge } from "../components/Badge";
import { JsonFieldEditor } from "../components/JsonFieldEditor";
import { Pagination } from "../components/Pagination";
import { useToast } from "../components/ToastContext";
import { slugify, formatDate, formatAbv } from "@/lib/utils/formatters";

export default function AdminProductsPage() {
  const { showToast } = useToast();

  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [brands, setBrands] = useState<BrandResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(25);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductResponse | null>(
    null
  );
  const [viewingProduct, setViewingProduct] = useState<ProductResponse | null>(
    null
  );
  const [deletingProduct, setDeletingProduct] =
    useState<ProductResponse | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Form State
  const initialFormState: ProductCreate = {
    name: "",
    slug: "",
    brand_id: 0,
    category_id: 0,
    abv: 40.0,
    short_description: "",
    description: "",
    age_years: null,
    alcohol_type: "",
    region: "",
    production_details: null,
    status: true,
  };

  const [formData, setFormData] = useState<ProductCreate>(initialFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load dropdown data
  useEffect(() => {
    async function loadMeta() {
      try {
        const [brandsData, categoriesData] = await Promise.all([
          brandsApi.list({ limit: 200 }),
          categoriesApi.list({ limit: 200 }),
        ]);
        setBrands(brandsData);
        setCategories(categoriesData);

        if (brandsData.length > 0) {
          setFormData((prev) => ({
            ...prev,
            brand_id: prev.brand_id || brandsData[0].id,
          }));
        }
        if (categoriesData.length > 0) {
          setFormData((prev) => ({
            ...prev,
            category_id: prev.category_id || categoriesData[0].id,
          }));
        }
      } catch (err) {
        console.error("Failed to load metadata:", err);
      }
    }
    loadMeta();
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productsApi.list({
        skip,
        limit,
        brand_id: selectedBrand !== "all" ? Number(selectedBrand) : undefined,
        category_id:
          selectedCategory !== "all" ? Number(selectedCategory) : undefined,
        status:
          selectedStatus === "active"
            ? true
            : selectedStatus === "inactive"
            ? false
            : undefined,
      });
      setProducts(data);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to load products";
      showToast(errorMsg, "error", "Data Fetch Error");
    } finally {
      setLoading(false);
    }
  }, [skip, limit, selectedBrand, selectedCategory, selectedStatus, showToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Client-side search filtering
  const filteredProducts = products.filter((p) => {
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    const brandName = brands.find((b) => b.id === p.brand_id)?.name || "";
    const catName = categories.find((c) => c.id === p.category_id)?.name || "";
    return (
      p.name.toLowerCase().includes(query) ||
      p.slug.toLowerCase().includes(query) ||
      (p.alcohol_type && p.alcohol_type.toLowerCase().includes(query)) ||
      (p.region && p.region.toLowerCase().includes(query)) ||
      brandName.toLowerCase().includes(query) ||
      catName.toLowerCase().includes(query)
    );
  });

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormData({
      ...initialFormState,
      brand_id: brands[0]?.id || 1,
      category_id: categories[0]?.id || 1,
    });
    setFormErrors({});
    setIsCreateModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (product: ProductResponse) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      brand_id: product.brand_id,
      category_id: product.category_id,
      abv: product.abv,
      short_description: product.short_description || "",
      description: product.description || "",
      age_years: product.age_years,
      alcohol_type: product.alcohol_type || "",
      region: product.region || "",
      production_details: product.production_details || null,
      status: product.status ?? true,
    });
    setFormErrors({});
  };

  // Auto slugify name helper
  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: slugify(name),
    }));
  };

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Product name is required.";
    if (!formData.slug.trim()) errors.slug = "Slug identifier is required.";
    if (!formData.brand_id) errors.brand_id = "Please select a brand.";
    if (!formData.category_id)
      errors.category_id = "Please select a category.";
    if (formData.abv === "" || isNaN(Number(formData.abv))) {
      errors.abv = "Please provide a valid ABV percentage (0-100).";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Create Product
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setActionLoading(true);
    try {
      await productsApi.create({
        ...formData,
        abv: Number(formData.abv),
        age_years: formData.age_years ? Number(formData.age_years) : null,
      });
      showToast(
        `Product "${formData.name}" created successfully!`,
        "success",
        "Created"
      );
      setIsCreateModalOpen(false);
      fetchProducts();
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to create product";
      showToast(errorMsg, "error", "Create Error");
    } finally {
      setActionLoading(false);
    }
  };

  // Submit Edit Product
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !validateForm()) return;

    setActionLoading(true);
    try {
      const updatePayload: ProductUpdate = {
        name: formData.name,
        slug: formData.slug,
        brand_id: formData.brand_id,
        category_id: formData.category_id,
        abv: Number(formData.abv),
        short_description: formData.short_description || null,
        description: formData.description || null,
        age_years: formData.age_years ? Number(formData.age_years) : null,
        alcohol_type: formData.alcohol_type || null,
        region: formData.region || null,
        production_details: formData.production_details,
        status: formData.status,
      };

      await productsApi.update(editingProduct.id, updatePayload);
      showToast(
        `Product "${formData.name}" updated successfully!`,
        "success",
        "Updated"
      );
      setEditingProduct(null);
      fetchProducts();
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to update product";
      showToast(errorMsg, "error", "Update Error");
    } finally {
      setActionLoading(false);
    }
  };

  // Submit Delete Product
  const handleDeleteConfirm = async () => {
    if (!deletingProduct) return;

    setActionLoading(true);
    try {
      await productsApi.delete(deletingProduct.id);
      showToast(
        `Product "${deletingProduct.name}" was deleted successfully.`,
        "success",
        "Deleted"
      );
      setDeletingProduct(null);
      fetchProducts();
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to delete product";
      showToast(errorMsg, "error", "Delete Error");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <i className="fas fa-wine-bottle text-red-500 text-xl" />
            <span>Product Catalog</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage beverage listings, ABV percentages, brand &amp; category associations
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchProducts}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs font-semibold"
            title="Refresh list"
          >
            <i className={`fas fa-sync-alt ${loading ? "fa-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 text-white font-bold text-xs shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all"
          >
            <i className="fas fa-plus text-xs" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* ── Search & Filters Bar ───────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search input */}
          <div className="relative">
            <i className="fas fa-search absolute left-3.5 top-3 text-slate-500 text-xs" />
            <input
              type="text"
              placeholder="Search products by name, slug, region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Brand filter */}
          <div>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSkip(0);
              }}
              className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="all">All Brands ({brands.length})</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSkip(0);
              }}
              className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setSkip(0);
              }}
              className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Products Table ─────────────────────────────────────── */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-800/50 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Product Info</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">ABV</th>
                <th className="py-3.5 px-4">Alcohol Type / Region</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <i className="fas fa-circle-notch fa-spin text-red-500 text-xl mb-2" />
                    <p>Loading products from backend...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500">
                    <i className="fas fa-inbox text-3xl mb-2 opacity-50" />
                    <p className="font-semibold text-sm text-slate-400">
                      No products matched your criteria
                    </p>
                    <p className="text-xs mt-1 text-slate-500">
                      Try clearing filters or add a new product.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const brand = brands.find((b) => b.id === p.brand_id);
                  const category = categories.find(
                    (c) => c.id === p.category_id
                  );

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Name & Slug */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                            <i className="fas fa-glass-whiskey text-xs" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-100 group-hover:text-red-400 transition-colors">
                              {p.name}
                            </span>
                            <div className="text-[10px] text-slate-400 font-mono">
                              /{p.slug}
                            </div>
                            {p.short_description && (
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 max-w-xs">
                                {p.short_description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Brand */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-300">
                          {brand ? brand.name : `Brand #${p.brand_id}`}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] border border-slate-700">
                          {category ? category.name : `Cat #${p.category_id}`}
                        </span>
                      </td>

                      {/* ABV */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-amber-400">
                          {formatAbv(p.abv)}
                        </span>
                      </td>

                      {/* Type & Region */}
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        <div>{p.alcohol_type || "—"}</div>
                        {p.region && (
                          <div className="text-slate-500">{p.region}</div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={p.status ? "success" : "neutral"}
                          dot
                        >
                          {p.status ? "Active" : "Inactive"}
                        </Badge>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewingProduct(p)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors"
                            title="View full details"
                          >
                            <i className="fas fa-eye text-xs" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                            title="Edit product"
                          >
                            <i className="fas fa-edit text-xs" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingProduct(p)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                            title="Delete product"
                          >
                            <i className="fas fa-trash-alt text-xs" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          skip={skip}
          limit={limit}
          currentCount={products.length}
          onPageChange={(newSkip) => setSkip(newSkip)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setSkip(0);
          }}
        />
      </div>

      {/* ── Create / Edit Product Modal ────────────────────────── */}
      <Modal
        isOpen={isCreateModalOpen || editingProduct !== null}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? "Edit Product" : "Create New Product"}
        subtitle={
          editingProduct
            ? `Update details for ID #${editingProduct.id} (${editingProduct.name})`
            : "Add a new beverage to the WJunction backend catalog"
        }
        maxWidth="3xl"
      >
        <form
          onSubmit={editingProduct ? handleEditSubmit : handleCreateSubmit}
          className="space-y-4"
        >
          {/* Name & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Glenfiddich 15 Year Old"
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-800 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                  formErrors.name
                    ? "border-rose-500 focus:ring-rose-500"
                    : "border-slate-700 focus:ring-red-500"
                }`}
              />
              {formErrors.name && (
                <p className="text-[11px] text-rose-500">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="e.g. glenfiddich-15-year-old"
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-800 border text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                  formErrors.slug
                    ? "border-rose-500 focus:ring-rose-500"
                    : "border-slate-700 focus:ring-red-500"
                }`}
              />
              {formErrors.slug && (
                <p className="text-[11px] text-rose-500">{formErrors.slug}</p>
              )}
            </div>
          </div>

          {/* Brand & Category Select */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Brand / Distillery <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.brand_id}
                onChange={(e) =>
                  setFormData({ ...formData, brand_id: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} (ID: {b.id})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category_id: Number(e.target.value),
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (ID: {c.id})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ABV, Age Years, Alcohol Type, Region */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                ABV (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.abv}
                onChange={(e) =>
                  setFormData({ ...formData, abv: e.target.value })
                }
                placeholder="40.0"
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-800 border text-xs text-white focus:outline-none focus:ring-1 ${
                  formErrors.abv
                    ? "border-rose-500 focus:ring-rose-500"
                    : "border-slate-700 focus:ring-red-500"
                }`}
              />
              {formErrors.abv && (
                <p className="text-[11px] text-rose-500">{formErrors.abv}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Age (Years)
              </label>
              <input
                type="number"
                min="0"
                value={formData.age_years ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    age_years: e.target.value ? Number(e.target.value) : null,
                  })
                }
                placeholder="e.g. 12"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Alcohol Type
              </label>
              <input
                type="text"
                value={formData.alcohol_type || ""}
                onChange={(e) =>
                  setFormData({ ...formData, alcohol_type: e.target.value })
                }
                placeholder="e.g. Single Malt Scotch Whisky"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Region */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Region / Origin
            </label>
            <input
              type="text"
              value={formData.region || ""}
              onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })
              }
              placeholder="e.g. Speyside, Scotland"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Short Description
            </label>
            <textarea
              rows={2}
              value={formData.short_description || ""}
              onChange={(e) =>
                setFormData({ ...formData, short_description: e.target.value })
              }
              placeholder="Brief summary for drink cards..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Full Description &amp; Tasting Notes
            </label>
            <textarea
              rows={3}
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Detailed profile, aroma, finish..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* Production Details (JSON) */}
          <JsonFieldEditor
            label="Production Details (Key-Value / JSON)"
            value={formData.production_details}
            onChange={(val) =>
              setFormData({ ...formData, production_details: val })
            }
            helperText="Add cask types, maturation details, aroma profiles, etc."
          />

          {/* Active Status Checkbox */}
          <div className="flex items-center gap-3 pt-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.status ?? true}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
            <span className="text-xs font-semibold text-slate-300">
              Active Status (visible in storefront catalog)
            </span>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsCreateModalOpen(false);
                setEditingProduct(null);
              }}
              disabled={actionLoading}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 text-white font-bold text-xs shadow-md shadow-red-600/25 hover:shadow-red-600/40 transition-all disabled:opacity-50"
            >
              {actionLoading && (
                <i className="fas fa-circle-notch fa-spin text-xs" />
              )}
              <span>{editingProduct ? "Save Changes" : "Create Product"}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* ── View Details Modal ─────────────────────────────────── */}
      {viewingProduct && (
        <Modal
          isOpen={true}
          onClose={() => setViewingProduct(null)}
          title={`Product: ${viewingProduct.name}`}
          subtitle={`ID #${viewingProduct.id} • Slug: ${viewingProduct.slug}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  ABV
                </span>
                <p className="text-base font-black text-amber-400 mt-0.5">
                  {formatAbv(viewingProduct.abv)}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  Age
                </span>
                <p className="text-sm font-bold text-slate-200 mt-0.5">
                  {viewingProduct.age_years
                    ? `${viewingProduct.age_years} Years`
                    : "No Age Statement"}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  Status
                </span>
                <div className="mt-1">
                  <Badge
                    variant={viewingProduct.status ? "success" : "neutral"}
                    dot
                  >
                    {viewingProduct.status ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  Created
                </span>
                <p className="text-slate-300 mt-0.5">
                  {formatDate(viewingProduct.created_at)}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2">
              <div className="font-bold text-slate-200">Descriptions</div>
              <p className="text-slate-300 leading-relaxed">
                {viewingProduct.description ||
                  viewingProduct.short_description ||
                  "No description provided."}
              </p>
            </div>

            {viewingProduct.production_details && (
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2">
                <div className="font-bold text-slate-200">
                  Production Details &amp; Attributes
                </div>
                <pre className="p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                  {JSON.stringify(viewingProduct.production_details, null, 2)}
                </pre>
              </div>
            )}

            <div className="flex justify-end pt-3">
              <button
                type="button"
                onClick={() => setViewingProduct(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Delete Confirmation Dialog ─────────────────────────── */}
      <ConfirmDialog
        isOpen={deletingProduct !== null}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to permanently delete "${deletingProduct?.name}" (ID: ${deletingProduct?.id})? This action cannot be undone.`}
        confirmText="Delete Product"
        isDangerous={true}
        isLoading={actionLoading}
      />
    </div>
  );
}
