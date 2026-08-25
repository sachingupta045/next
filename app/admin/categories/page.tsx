"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  categoriesApi,
  CategoryResponse,
  CategoryCreate,
  CategoryUpdate,
  ApiError,
} from "@/lib/api";
import { Modal } from "../components/Modal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Badge } from "../components/Badge";
import { JsonFieldEditor } from "../components/JsonFieldEditor";
import { Pagination } from "../components/Pagination";
import { useToast } from "../components/ToastContext";
import { slugify, formatDate } from "@/lib/utils/formatters";

export default function AdminCategoriesPage() {
  const { showToast } = useToast();

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [parentFilter, setParentFilter] = useState<string>("all");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoryResponse | null>(null);
  const [deletingCategory, setDeletingCategory] =
    useState<CategoryResponse | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Form state
  const initialFormState: CategoryCreate = {
    name: "",
    slug: "",
    parent_id: null,
    description: "",
    icon_url: "",
    attributes_schema: null,
  };

  const [formData, setFormData] = useState<CategoryCreate>(initialFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await categoriesApi.list({ skip, limit });
      setCategories(data);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to load categories";
      showToast(errorMsg, "error", "Data Error");
    } finally {
      setLoading(false);
    }
  }, [skip, limit, showToast]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Root categories for parent dropdown
  const rootCategories = categories.filter((c) => c.parent_id === null);

  // Filtering
  const filteredCategories = categories.filter((cat) => {
    if (parentFilter === "root" && cat.parent_id !== null) return false;
    if (parentFilter === "sub" && cat.parent_id === null) return false;
    if (
      parentFilter !== "all" &&
      parentFilter !== "root" &&
      parentFilter !== "sub" &&
      cat.parent_id !== Number(parentFilter)
    ) {
      return false;
    }

    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    const parentName =
      categories.find((c) => c.id === cat.parent_id)?.name || "";
    return (
      cat.name.toLowerCase().includes(query) ||
      cat.slug.toLowerCase().includes(query) ||
      (cat.description && cat.description.toLowerCase().includes(query)) ||
      parentName.toLowerCase().includes(query)
    );
  });

  const handleOpenCreate = () => {
    setFormData(initialFormState);
    setFormErrors({});
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (category: CategoryResponse) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      parent_id: category.parent_id ?? null,
      description: category.description || "",
      icon_url: category.icon_url || "",
      attributes_schema: category.attributes_schema || null,
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
    if (!formData.name.trim()) errors.name = "Category name is required.";
    if (!formData.slug.trim()) errors.slug = "Category slug is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setActionLoading(true);
    try {
      await categoriesApi.create({
        ...formData,
        parent_id: formData.parent_id
          ? Number(formData.parent_id)
          : null,
      });
      showToast(
        `Category "${formData.name}" created!`,
        "success",
        "Created"
      );
      setIsCreateModalOpen(false);
      fetchCategories();
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to create category";
      showToast(errorMsg, "error", "Create Error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !validateForm()) return;

    setActionLoading(true);
    try {
      const payload: CategoryUpdate = {
        name: formData.name,
        slug: formData.slug,
        parent_id: formData.parent_id
          ? Number(formData.parent_id)
          : null,
        description: formData.description || null,
        icon_url: formData.icon_url || null,
        attributes_schema: formData.attributes_schema,
      };

      await categoriesApi.update(editingCategory.id, payload);
      showToast(
        `Category "${formData.name}" updated!`,
        "success",
        "Updated"
      );
      setEditingCategory(null);
      fetchCategories();
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to update category";
      showToast(errorMsg, "error", "Update Error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCategory) return;

    setActionLoading(true);
    try {
      await categoriesApi.delete(deletingCategory.id);
      showToast(
        `Category "${deletingCategory.name}" deleted.`,
        "success",
        "Deleted"
      );
      setDeletingCategory(null);
      fetchCategories();
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to delete category";
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
            <i className="fas fa-tags text-emerald-500 text-xl" />
            <span>Drink Categories</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage spirit families, sub-varieties, hierarchical taxonomy &amp; attribute schemas
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchCategories}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs font-semibold"
            title="Refresh list"
          >
            <i className={`fas fa-sync-alt ${loading ? "fa-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
          >
            <i className="fas fa-plus text-xs" />
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* ── Search & Filter Bar ────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <i className="fas fa-search absolute left-3.5 top-3 text-slate-500 text-xs" />
            <input
              type="text"
              placeholder="Search categories by name, slug, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <select
              value={parentFilter}
              onChange={(e) => {
                setParentFilter(e.target.value);
                setSkip(0);
              }}
              className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Categories ({categories.length})</option>
              <option value="root">
                Root Spirit Types Only ({rootCategories.length})
              </option>
              <option value="sub">
                Sub-Categories Only (
                {categories.length - rootCategories.length})
              </option>
              <optgroup label="Filter by Specific Parent:">
                {rootCategories.map((rc) => (
                  <option key={rc.id} value={rc.id}>
                    Sub-types of {rc.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* ── Categories Table ───────────────────────────────────── */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-800/50 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Category Name</th>
                <th className="py-3.5 px-4">Hierarchy Type</th>
                <th className="py-3.5 px-4">Parent Category</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-400">
                    <i className="fas fa-circle-notch fa-spin text-emerald-500 text-xl mb-2" />
                    <p>Loading categories...</p>
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-500">
                    <i className="fas fa-inbox text-3xl mb-2 opacity-50" />
                    <p className="font-semibold text-sm text-slate-400">
                      No categories found
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => {
                  const parentCat = categories.find(
                    (c) => c.id === cat.parent_id
                  );
                  const isRoot = cat.parent_id === null;

                  return (
                    <tr
                      key={cat.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Name & Icon */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                            {cat.icon_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={cat.icon_url}
                                alt={cat.name}
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                  (e.currentTarget as HTMLElement).style.display = "none";
                                }}
                              />
                            ) : (
                              <i
                                className={`fas ${
                                  isRoot ? "fa-glass-martini" : "fa-tag"
                                } text-emerald-400 text-xs`}
                              />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                              {cat.name}
                            </span>
                            <div className="text-[10px] text-slate-400 font-mono">
                              /{cat.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Hierarchy Type */}
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={isRoot ? "brand" : "info"}
                          dot
                        >
                          {isRoot ? "Root Spirit" : "Sub-Category"}
                        </Badge>
                      </td>

                      {/* Parent Category */}
                      <td className="py-3.5 px-4">
                        {parentCat ? (
                          <span className="font-medium text-slate-300 flex items-center gap-1.5">
                            <i className="fas fa-level-up-alt rotate-90 text-slate-500 text-[10px]" />
                            <span>{parentCat.name}</span>
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">
                            None (Top Level)
                          </span>
                        )}
                      </td>

                      {/* Description */}
                      <td className="py-3.5 px-4 text-slate-400 text-[11px] max-w-xs">
                        <p className="line-clamp-2">
                          {cat.description || "No description"}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(cat)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                            title="Edit category"
                          >
                            <i className="fas fa-edit text-xs" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingCategory(cat)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                            title="Delete category"
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
          currentCount={categories.length}
          onPageChange={(newSkip) => setSkip(newSkip)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setSkip(0);
          }}
        />
      </div>

      {/* ── Create / Edit Category Modal ───────────────────────── */}
      <Modal
        isOpen={isCreateModalOpen || editingCategory !== null}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingCategory(null);
        }}
        title={editingCategory ? "Edit Category" : "Create New Category"}
        subtitle={
          editingCategory
            ? `Update properties for ${editingCategory.name}`
            : "Define a new spirit category or sub-variety in WJunction"
        }
        maxWidth="2xl"
      >
        <form
          onSubmit={editingCategory ? handleEditSubmit : handleCreateSubmit}
          className="space-y-4"
        >
          {/* Name & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Single Malt Scotch"
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-800 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                  formErrors.name
                    ? "border-rose-500 focus:ring-rose-500"
                    : "border-slate-700 focus:ring-emerald-500"
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
                placeholder="e.g. single-malt-scotch"
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-800 border text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                  formErrors.slug
                    ? "border-rose-500 focus:ring-rose-500"
                    : "border-slate-700 focus:ring-emerald-500"
                }`}
              />
              {formErrors.slug && (
                <p className="text-[11px] text-rose-500">{formErrors.slug}</p>
              )}
            </div>
          </div>

          {/* Parent Category & Icon URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Parent Category (Optional)
              </label>
              <select
                value={formData.parent_id ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    parent_id: e.target.value ? Number(e.target.value) : null,
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">None (Top-Level Root Category)</option>
                {rootCategories
                  .filter((rc) => !editingCategory || rc.id !== editingCategory.id)
                  .map((rc) => (
                    <option key={rc.id} value={rc.id}>
                      {rc.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Icon Image URL
              </label>
              <input
                type="text"
                value={formData.icon_url || ""}
                onChange={(e) =>
                  setFormData({ ...formData, icon_url: e.target.value })
                }
                placeholder="https://cdn-icons-png.flaticon.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Overview of this spirit class, distillation characteristics..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Attributes Schema (JSON) */}
          <JsonFieldEditor
            label="Attributes Schema (Key-Value / JSON)"
            value={formData.attributes_schema}
            onChange={(val) =>
              setFormData({ ...formData, attributes_schema: val })
            }
            helperText="Define custom category attribute rules (e.g. cask_type: string, peat_level: number)"
          />

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsCreateModalOpen(false);
                setEditingCategory(null);
              }}
              disabled={actionLoading}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all disabled:opacity-50"
            >
              {actionLoading && (
                <i className="fas fa-circle-notch fa-spin text-xs" />
              )}
              <span>
                {editingCategory ? "Save Category" : "Create Category"}
              </span>
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Delete Confirmation Dialog ─────────────────────────── */}
      <ConfirmDialog
        isOpen={deletingCategory !== null}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete category "${deletingCategory?.name}"? Warning: Linked products and subcategories may be affected.`}
        confirmText="Delete Category"
        isDangerous={true}
        isLoading={actionLoading}
      />
    </div>
  );
}
