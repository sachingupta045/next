"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usersApi, UserResponse, UserCreate, ApiError } from "@/lib/api";
import { Modal } from "../components/Modal";
import { Badge } from "../components/Badge";
import { useToast } from "../components/ToastContext";

export default function AdminUsersPage() {
  const { showToast } = useToast();

  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Create User Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const initialFormState: UserCreate = {
    username: "",
    email: "",
    password: "",
    is_active: true,
  };

  const [formData, setFormData] = useState<UserCreate>(initialFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await usersApi.list();
      setUsers(data);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to load users";
      showToast(errorMsg, "error", "Data Error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Client search
  const filteredUsers = users.filter((u) => {
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    return (
      u.username.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      String(u.id).includes(query)
    );
  });

  const handleOpenCreate = () => {
    setFormData(initialFormState);
    setFormErrors({});
    setIsCreateModalOpen(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.username.trim()) errors.username = "Username is required.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errors.email = "Valid email address is required.";
    }
    if (!formData.password || formData.password.length < 4) {
      errors.password = "Password must be at least 4 characters.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setActionLoading(true);
    try {
      await usersApi.create(formData);
      showToast(
        `User "${formData.username}" created successfully!`,
        "success",
        "Created"
      );
      setIsCreateModalOpen(false);
      fetchUsers();
    } catch (err: unknown) {
      const errorMsg =
        err instanceof ApiError ? err.message : "Failed to create user";
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
            <i className="fas fa-users-cog text-purple-500 text-xl" />
            <span>User Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage system administrators, operator accounts &amp; role permissions
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchUsers}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs font-semibold"
            title="Refresh list"
          >
            <i className={`fas fa-sync-alt ${loading ? "fa-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all"
          >
            <i className="fas fa-plus text-xs" />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {/* ── Search Bar ─────────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
        <div className="relative">
          <i className="fas fa-search absolute left-3.5 top-3 text-slate-500 text-xs" />
          <input
            type="text"
            placeholder="Search users by username, email, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* ── Users Table ────────────────────────────────────────── */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-800/50 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">User ID</th>
                <th className="py-3.5 px-4">Username</th>
                <th className="py-3.5 px-4">Email Address</th>
                <th className="py-3.5 px-4">Active Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-slate-400">
                    <i className="fas fa-circle-notch fa-spin text-purple-500 text-xl mb-2" />
                    <p>Loading users...</p>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-slate-500">
                    <i className="fas fa-user-slash text-3xl mb-2 opacity-50" />
                    <p className="font-semibold text-sm text-slate-400">
                      No users registered yet
                    </p>
                    <p className="text-xs mt-1 text-slate-500">
                      Click &quot;Add New User&quot; to create your first administrative user.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 font-mono text-slate-400 font-bold">
                      #{u.id}
                    </td>

                    {/* Username */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold text-xs uppercase">
                          {u.username.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-100 group-hover:text-purple-400 transition-colors">
                          {u.username}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 text-slate-300 font-mono">
                      {u.email}
                    </td>

                    {/* Active */}
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={u.is_active ? "success" : "neutral"}
                        dot
                      >
                        {u.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Create User Modal ──────────────────────────────────── */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New User"
        subtitle="Create an administrative or operator user account"
        maxWidth="md"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="e.g. admin_alex"
              className={`w-full px-3.5 py-2 rounded-xl bg-slate-800 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                formErrors.username
                  ? "border-rose-500 focus:ring-rose-500"
                  : "border-slate-700 focus:ring-purple-500"
              }`}
            />
            {formErrors.username && (
              <p className="text-[11px] text-rose-500">
                {formErrors.username}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="admin@whiskeyjunction.com"
              className={`w-full px-3.5 py-2 rounded-xl bg-slate-800 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                formErrors.email
                  ? "border-rose-500 focus:ring-rose-500"
                  : "border-slate-700 focus:ring-purple-500"
              }`}
            />
            {formErrors.email && (
              <p className="text-[11px] text-rose-500">{formErrors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••••••"
              className={`w-full px-3.5 py-2 rounded-xl bg-slate-800 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                formErrors.password
                  ? "border-rose-500 focus:ring-rose-500"
                  : "border-slate-700 focus:ring-purple-500"
              }`}
            />
            {formErrors.password && (
              <p className="text-[11px] text-rose-500">
                {formErrors.password}
              </p>
            )}
          </div>

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
              Active User Account
            </span>
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-50"
            >
              {actionLoading && (
                <i className="fas fa-circle-notch fa-spin text-xs" />
              )}
              <span>Create User</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
