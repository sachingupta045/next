"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  countryApi,
  CountryResponse,
  CountryCreate,
  ApiError,
} from "@/lib/api";
import { Modal } from "../components/Modal";
import { Pagination } from "../components/Pagination";
import { useToast } from "../components/ToastContext";
import { formatDate } from "@/lib/utils/formatters";

export default function AdminCountriesPage() {
  const { showToast } = useToast();

  const [countries, setCountries] = useState<CountryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingCountry, setViewingCountry] = useState<CountryResponse | null>(
    null
  );
  const [actionLoading, setActionLoading] = useState(false);

  // Form State
  const initialFormState: CountryCreate = {
    name: "",
    iso_code: "",
    flag_url: "",
    currency_code: "",
    description: "",
  };

  const [formData, setFormData] = useState<CountryCreate>(initialFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch countries
  const fetchCountries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await countryApi.list({ skip, limit });
      setCountries(data);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to load countries";
      showToast(errorMsg, "error", "Data Error");
    } finally {
      setLoading(false);
    }
  }, [skip, limit, showToast]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  // Client-side search
  const filteredCountries = countries.filter((c) => {
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.iso_code.toLowerCase().includes(query) ||
      (c.currency_code && c.currency_code.toLowerCase().includes(query)) ||
      (c.description && c.description.toLowerCase().includes(query))
    );
  });

  const handleOpenCreate = () => {
    setFormData(initialFormState);
    setFormErrors({});
    setIsCreateModalOpen(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Country name is required.";
    if (!formData.iso_code.trim()) errors.iso_code = "ISO Code is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setActionLoading(true);
    try {
      await countryApi.create({
        name: formData.name.trim(),
        iso_code: formData.iso_code.trim().toUpperCase(),
        flag_url: formData.flag_url?.trim() || null,
        currency_code: formData.currency_code?.trim().toUpperCase() || null,
        description: formData.description?.trim() || null,
      });
      showToast(
        `Country "${formData.name}" added successfully!`,
        "success",
        "Created"
      );
      setIsCreateModalOpen(false);
      fetchCountries();
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to create country";
      showToast(errorMsg, "error", "Create Error");
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
            <i className="fas fa-globe-americas text-sky-500 text-xl" />
            <span>Country Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage ISO origin codes, flags, national currencies, and regional distilleries
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchCountries}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs font-semibold"
            title="Refresh list"
          >
            <i className={`fas fa-sync-alt ${loading ? "fa-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all"
          >
            <i className="fas fa-plus text-xs" />
            <span>Add New Country</span>
          </button>
        </div>
      </div>

      {/* ── Search Bar ─────────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
        <div className="relative">
          <i className="fas fa-search absolute left-3.5 top-3 text-slate-500 text-xs" />
          <input
            type="text"
            placeholder="Search countries by name, ISO code (e.g. GB, US, IN, JP), currency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
      </div>

      {/* ── Countries Table ────────────────────────────────────── */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-800/50 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Country &amp; Flag</th>
                <th className="py-3.5 px-4">ISO Code</th>
                <th className="py-3.5 px-4">Currency</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Created Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <i className="fas fa-circle-notch fa-spin text-sky-500 text-xl mb-2" />
                    <p>Loading countries from backend...</p>
                  </td>
                </tr>
              ) : filteredCountries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    <i className="fas fa-inbox text-3xl mb-2 opacity-50" />
                    <p className="font-semibold text-sm text-slate-400">
                      No countries found
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCountries.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Name & Flag */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                          {c.flag_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={c.flag_url}
                              alt={c.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <i className="fas fa-flag text-sky-400 text-xs" />
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                            {c.name}
                          </span>
                          <div className="text-[10px] text-slate-400 font-mono">
                            ID: #{c.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* ISO Code */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono font-bold text-[11px]">
                        {c.iso_code}
                      </span>
                    </td>

                    {/* Currency */}
                    <td className="py-3.5 px-4">
                      {c.currency_code ? (
                        <span className="font-semibold text-slate-300 font-mono">
                          {c.currency_code}
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>

                    {/* Description */}
                    <td className="py-3.5 px-4 text-slate-400 text-[11px] max-w-xs truncate">
                      {c.description || "—"}
                    </td>

                    {/* Created */}
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {formatDate(c.created_at)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setViewingCountry(c)}
                        className="w-7 h-7 rounded-lg inline-flex items-center justify-center text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors"
                        title="View details"
                      >
                        <i className="fas fa-eye text-xs" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          skip={skip}
          limit={limit}
          currentCount={countries.length}
          onPageChange={(newSkip) => setSkip(newSkip)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setSkip(0);
          }}
        />
      </div>

      {/* ── Create Country Modal ───────────────────────────────── */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Country"
        subtitle="Register a country for brand origin mapping and international curation"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Country Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Scotland, Japan, India, United States"
              className={`w-full px-3.5 py-2 rounded-xl bg-slate-800 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                formErrors.name
                  ? "border-rose-500 focus:ring-rose-500"
                  : "border-slate-700 focus:ring-sky-500"
              }`}
            />
            {formErrors.name && (
              <p className="text-[11px] text-rose-500">{formErrors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                ISO Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={6}
                value={formData.iso_code}
                onChange={(e) =>
                  setFormData({ ...formData, iso_code: e.target.value })
                }
                placeholder="e.g. GB, US, IN, JP"
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-800 border text-xs font-mono uppercase text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                  formErrors.iso_code
                    ? "border-rose-500 focus:ring-rose-500"
                    : "border-slate-700 focus:ring-sky-500"
                }`}
              />
              {formErrors.iso_code && (
                <p className="text-[11px] text-rose-500">
                  {formErrors.iso_code}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Currency Code
              </label>
              <input
                type="text"
                maxLength={5}
                value={formData.currency_code || ""}
                onChange={(e) =>
                  setFormData({ ...formData, currency_code: e.target.value })
                }
                placeholder="e.g. GBP, USD, INR, EUR"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono uppercase text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Flag Icon URL
            </label>
            <input
              type="text"
              value={formData.flag_url || ""}
              onChange={(e) =>
                setFormData({ ...formData, flag_url: e.target.value })
              }
              placeholder="https://flagcdn.com/w80/gb.png"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Description / Beverage Heritage
            </label>
            <textarea
              rows={3}
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Notable distilling traditions, regions, terroir..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              disabled={actionLoading}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 transition-all disabled:opacity-50"
            >
              {actionLoading && (
                <i className="fas fa-circle-notch fa-spin text-xs" />
              )}
              <span>Create Country</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* ── View Details Modal ─────────────────────────────────── */}
      {viewingCountry && (
        <Modal
          isOpen={true}
          onClose={() => setViewingCountry(null)}
          title={`Country: ${viewingCountry.name}`}
          subtitle={`ISO Code: ${viewingCountry.iso_code} • ID #${viewingCountry.id}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden shrink-0 border border-slate-700">
                {viewingCountry.flag_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={viewingCountry.flag_url}
                    alt={viewingCountry.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <i className="fas fa-flag text-sky-400 text-base" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm">
                  {viewingCountry.name}
                </h4>
                <p className="text-slate-400 text-[11px] font-mono">
                  ISO: {viewingCountry.iso_code} | Currency:{" "}
                  {viewingCountry.currency_code || "N/A"}
                </p>
              </div>
            </div>

            {viewingCountry.description && (
              <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                  Description
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {viewingCountry.description}
                </p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setViewingCountry(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
