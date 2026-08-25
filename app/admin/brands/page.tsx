"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  brandsApi,
  countryApi,
  BrandResponse,
  BrandCreate,
  BrandUpdate,
  CountryResponse,
  ApiError,
} from "@/lib/api";
import { Modal } from "../components/Modal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Badge } from "../components/Badge";
import { JsonFieldEditor } from "../components/JsonFieldEditor";
import { Pagination } from "../components/Pagination";
import { useToast } from "../components/ToastContext";
import { slugify, formatDate } from "@/lib/utils/formatters";

export default function AdminBrandsPage() {
  const { showToast } = useToast();

  const [brands, setBrands] = useState<BrandResponse[]>([]);
  const [countries, setCountries] = useState<CountryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(25);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandResponse | null>(null);
  const [viewingBrand, setViewingBrand] = useState<BrandResponse | null>(null);
  const [deletingBrand, setDeletingBrand] = useState<BrandResponse | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Form state
  const initialFormState: BrandCreate = {
    name: "",
    slug: "",
    country_id: null,
    logo_url: "",
    founded_year: null,
    short_story: "",
    website_url: "",
    history_story: null,
    is_active: true,
  };

  const [formData, setFormData] = useState<BrandCreate>(initialFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load countries for country select
  useEffect(() => {
    async function loadCountries() {
      try {
        const cData = await countryApi.list({ limit: 200 });
        setCountries(cData);
      } catch (err) {
        console.error("Failed to load countries:", err);
      }
    }
    loadCountries();
  }, []);

  // Fetch brands
  const fetchBrands = useCallback(async () => {
    setLoading(true);
    try {
      const data = await brandsApi.list({ skip, limit });
      setBrands(data);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to load brands";
      showToast(errorMsg, "error", "Data Error");
    } finally {
      setLoading(false);
    }
  }, [skip, limit, showToast]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Client-side filtering
  const filteredBrands = brands.filter((b) => {
    if (selectedCountry !== "all" && b.country_id !== Number(selectedCountry)) {
      return false;
    }
    if (selectedStatus === "active" && !b.is_active) return false;
    if (selectedStatus === "inactive" && b.is_active) return false;

    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    const countryName =
      countries.find((c) => c.id === b.country_id)?.name || "";
    return (
      b.name.toLowerCase().includes(query) ||
      b.slug.toLowerCase().includes(query) ||
      countryName.toLowerCase().includes(query) ||
      (b.short_story && b.short_story.toLowerCase().includes(query))
    );
  });

  const handleOpenCreate = () => {
    setFormData({
      ...initialFormState,
      country_id: countries[0]?.id || null,
    });
    setFormErrors({});
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (brand: BrandResponse) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      slug: brand.slug,
      country_id: brand.country_id ?? null,
      logo_url: brand.logo_url || "",
      founded_year: brand.founded_year ?? null,
      short_story: brand.short_story || "",
      website_url: brand.website_url || "",
      history_story: brand.history_story || null,
      is_active: brand.is_active ?? true,
    });
    setFormErrors({});
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: slugify(name),
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Brand name is required.";
    if (!formData.slug.trim()) errors.slug = "Brand slug is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setActionLoading(true);
    try {
      await brandsApi.create({
        ...formData,
        founded_year: formData.founded_year
          ? Number(formData.founded_year)
          : null,
        country_id: formData.country_id
          ? Number(formData.country_id)
          : null,
      });
      showToast(`Brand "${formData.name}" created!`, "success", "Created");
      setIsCreateModalOpen(false);
      fetchBrands();
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to create brand";
      showToast(errorMsg, "error", "Create Error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrand || !validateForm()) return;

    setActionLoading(true);
    try {
      const payload: BrandUpdate = {
        name: formData.name,
        slug: formData.slug,
        country_id: formData.country_id
          ? Number(formData.country_id)
          : null,
        logo_url: formData.logo_url || null,
        founded_year: formData.founded_year
          ? Number(formData.founded_year)
          : null,
        short_story: formData.short_story || null,
        website_url: formData.website_url || null,
        history_story: formData.history_story,
        is_active: formData.is_active,
      };

      await brandsApi.update(editingBrand.id, payload);
      showToast(`Brand "${formData.name}" updated!`, "success", "Updated");
      setEditingBrand(null);
      fetchBrands();
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to update brand";
      showToast(errorMsg, "error", "Update Error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingBrand) return;

    setActionLoading(true);
    try {
      await brandsApi.delete(deletingBrand.id);
      showToast(
        `Brand "${deletingBrand.name}" deleted.`,
        "success",
        "Deleted"
      );
      setDeletingBrand(null);
      fetchBrands();
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to delete brand";
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
            <i className="fas fa-award text-amber-500 text-xl" />
            <span>Brands &amp; Distilleries</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage beverage labels, historical chronicles, origins &amp; official websites
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchBrands}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs font-semibold"
            title="Refresh list"
          >
            <i className={`fas fa-sync-alt ${loading ? "fa-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold text-xs shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all"
          >
            <i className="fas fa-plus text-xs" />
            <span>Add New Brand</span>
          </button>
        </div>
      </div>

      {/* ── Search & Filter Bar ────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <i className="fas fa-search absolute left-3.5 top-3 text-slate-500 text-xs" />
            <input
              type="text"
              placeholder="Search brands by name, slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSkip(0);
              }}
              className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Countries ({countries.length})</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.iso_code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setSkip(0);
              }}
              className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Brands Table ───────────────────────────────────────── */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-800/50 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Brand / Logo</th>
                <th className="py-3.5 px-4">Country Origin</th>
                <th className="py-3.5 px-4">Founded Year</th>
                <th className="py-3.5 px-4">Website</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <i className="fas fa-circle-notch fa-spin text-amber-500 text-xl mb-2" />
                    <p>Loading brands from backend...</p>
                  </td>
                </tr>
              ) : filteredBrands.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    <i className="fas fa-inbox text-3xl mb-2 opacity-50" />
                    <p className="font-semibold text-sm text-slate-400">
                      No brands found
                    </p>
                  </td>
                </tr>
              ) : (
                filteredBrands.map((b) => {
                  const country = countries.find((c) => c.id === b.country_id);

                  return (
                    <tr
                      key={b.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Logo & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center overflow-hidden shrink-0">
                            {b.logo_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={b.logo_url}
                                alt={b.name}
                                className="w-full h-full object-contain p-1"
                                onError={(e) => {
                                  (e.currentTarget as HTMLElement).style.display = "none";
                                }}
                              />
                            ) : (
                              <i className="fas fa-award text-amber-500 text-sm" />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                              {b.name}
                            </span>
                            <div className="text-[10px] text-slate-400 font-mono">
                              /{b.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Country */}
                      <td className="py-3.5 px-4">
                        {country ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                            <i className="fas fa-globe text-sky-400 text-[10px]" />
                            <span>{country.name}</span>
                            <span className="text-[9px] text-slate-400 font-mono font-bold">
                              ({country.iso_code})
                            </span>
                          </span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>

                      {/* Founded */}
                      <td className="py-3.5 px-4 text-slate-300 font-semibold">
                        {b.founded_year || "—"}
                      </td>

                      {/* Website */}
                      <td className="py-3.5 px-4">
                        {b.website_url ? (
                          <a
                            href={b.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 hover:underline max-w-[150px] truncate"
                          >
                            <span>Visit site</span>
                            <i className="fas fa-external-link-alt text-[9px]" />
                          </a>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={b.is_active ? "success" : "neutral"}
                          dot
                        >
                          {b.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewingBrand(b)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors"
                            title="View brand story"
                          >
                            <i className="fas fa-eye text-xs" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(b)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                            title="Edit brand"
                          >
                            <i className="fas fa-edit text-xs" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingBrand(b)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                            title="Delete brand"
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
          currentCount={brands.length}
          onPageChange={(newSkip) => setSkip(newSkip)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setSkip(0);
          }}
        />
      </div>

      {/* ── Create / Edit Brand Modal ──────────────────────────── */}
      <Modal
        isOpen={isCreateModalOpen || editingBrand !== null}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingBrand(null);
        }}
        title={editingBrand ? "Edit Brand" : "Create New Brand"}
        subtitle={
          editingBrand
            ? `Update distillery details for ${editingBrand.name}`
            : "Register a new brand or distillery in WJunction backend"
        }
        maxWidth="3xl"
      >
        <form
          onSubmit={editingBrand ? handleEditSubmit : handleCreateSubmit}
          className="space-y-4"
        >
          {/* Name & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Brand Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Johnnie Walker"
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-800 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                  formErrors.name
                    ? "border-rose-500 focus:ring-rose-500"
                    : "border-slate-700 focus:ring-amber-500"
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
                placeholder="e.g. johnnie-walker"
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-800 border text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                  formErrors.slug
                    ? "border-rose-500 focus:ring-rose-500"
                    : "border-slate-700 focus:ring-amber-500"
                }`}
              />
              {formErrors.slug && (
                <p className="text-[11px] text-rose-500">{formErrors.slug}</p>
              )}
            </div>
          </div>

          {/* Country & Founded Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Origin Country
              </label>
              <select
                value={formData.country_id ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    country_id: e.target.value ? Number(e.target.value) : null,
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="">-- Select Country --</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.iso_code})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Founded Year
              </label>
              <input
                type="number"
                min="1000"
                max="2100"
                value={formData.founded_year ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    founded_year: e.target.value
                      ? Number(e.target.value)
                      : null,
                  })
                }
                placeholder="e.g. 1820"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Logo URL & Website URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Logo Image URL
              </label>
              <input
                type="text"
                value={formData.logo_url || ""}
                onChange={(e) =>
                  setFormData({ ...formData, logo_url: e.target.value })
                }
                placeholder="https://... or http://127.0.0.1:8080/static/brands/..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Official Website URL
              </label>
              <input
                type="url"
                value={formData.website_url || ""}
                onChange={(e) =>
                  setFormData({ ...formData, website_url: e.target.value })
                }
                placeholder="https://www.brand.com"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Short Story */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Short Summary / Story
            </label>
            <textarea
              rows={2}
              value={formData.short_story || ""}
              onChange={(e) =>
                setFormData({ ...formData, short_story: e.target.value })
              }
              placeholder="Short brand overview for spotlight carousels..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* History Story (JSON) */}
          <JsonFieldEditor
            label="History Story &amp; Milestones (Key-Value / JSON)"
            value={formData.history_story}
            onChange={(val) =>
              setFormData({ ...formData, history_story: val })
            }
            helperText="Add origins, founder details, historical achievements, blend secrets, etc."
          />

          {/* Active Status */}
          <div className="flex items-center gap-3 pt-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active ?? true}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
            <span className="text-xs font-semibold text-slate-300">
              Active Brand (visible in brand spotlight &amp; filter lists)
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsCreateModalOpen(false);
                setEditingBrand(null);
              }}
              disabled={actionLoading}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold text-xs shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 transition-all disabled:opacity-50"
            >
              {actionLoading && (
                <i className="fas fa-circle-notch fa-spin text-xs" />
              )}
              <span>{editingBrand ? "Save Brand" : "Create Brand"}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* ── View Brand Story Modal ─────────────────────────────── */}
      {viewingBrand && (
        <Modal
          isOpen={true}
          onClose={() => setViewingBrand(null)}
          title={`Brand: ${viewingBrand.name}`}
          subtitle={`ID #${viewingBrand.id} • Founded: ${viewingBrand.founded_year || "Unknown"}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            {viewingBrand.short_story && (
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Brand Summary
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {viewingBrand.short_story}
                </p>
              </div>
            )}

            {viewingBrand.history_story && (
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  History Story &amp; Chronicle
                </span>
                <div className="space-y-2">
                  {Object.entries(viewingBrand.history_story).map(
                    ([key, val]) => (
                      <div
                        key={key}
                        className="p-3 rounded-lg bg-slate-900/80 border border-slate-800"
                      >
                        <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block mb-1">
                          {key.replace(/_/g, " ")}
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {typeof val === "object"
                            ? JSON.stringify(val, null, 2)
                            : String(val)}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-slate-500 text-[11px]">
                Updated: {formatDate(viewingBrand.updated_at)}
              </span>
              <button
                type="button"
                onClick={() => setViewingBrand(null)}
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
        isOpen={deletingBrand !== null}
        onClose={() => setDeletingBrand(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Brand"
        message={`Are you sure you want to delete "${deletingBrand?.name}"? Warning: Deleting a brand might impact linked products in the catalog.`}
        confirmText="Delete Brand"
        isDangerous={true}
        isLoading={actionLoading}
      />
    </div>
  );
}
