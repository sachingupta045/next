"use client";

import React from "react";
import { Modal } from "./Modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDangerous = true,
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="md">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isDangerous
                ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400"
                : "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
            }`}
          >
            <i
              className={`fas ${
                isDangerous ? "fa-trash-alt" : "fa-exclamation-triangle"
              } text-lg`}
            />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl text-white shadow-sm transition-all disabled:opacity-50 ${
              isDangerous
                ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/20"
                : "bg-red-600 hover:bg-red-700 shadow-red-600/20"
            }`}
          >
            {isLoading && <i className="fas fa-circle-notch fa-spin text-xs" />}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
