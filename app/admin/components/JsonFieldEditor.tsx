"use client";

import React, { useState, useEffect } from "react";

interface JsonFieldEditorProps {
  label: string;
  value?: Record<string, unknown> | null;
  onChange: (value: Record<string, unknown> | null) => void;
  helperText?: string;
  placeholder?: string;
}

export function JsonFieldEditor({
  label,
  value,
  onChange,
  helperText,
}: JsonFieldEditorProps) {
  const [mode, setMode] = useState<"key-value" | "raw">("key-value");
  const [rawText, setRawText] = useState("");
  const [rawError, setRawError] = useState<string | null>(null);

  // Key-value pairs representation
  const [entries, setEntries] = useState<Array<{ key: string; val: string }>>(
    []
  );

  // Initialize from value prop
  useEffect(() => {
    if (value && typeof value === "object" && Object.keys(value).length > 0) {
      setRawText(JSON.stringify(value, null, 2));
      const pairs = Object.entries(value).map(([k, v]) => ({
        key: k,
        val: typeof v === "object" ? JSON.stringify(v) : String(v ?? ""),
      }));
      setEntries(pairs);
    } else {
      setRawText("{}");
      setEntries([]);
    }
  }, [value]);

  const handleRawChange = (text: string) => {
    setRawText(text);
    if (!text.trim() || text.trim() === "{}") {
      setRawError(null);
      onChange(null);
      setEntries([]);
      return;
    }

    try {
      const parsed = JSON.parse(text);
      if (typeof parsed !== "object" || Array.isArray(parsed) || parsed === null) {
        setRawError("JSON must be an object (e.g. { \"key\": \"value\" })");
        return;
      }
      setRawError(null);
      onChange(parsed);

      const pairs = Object.entries(parsed).map(([k, v]) => ({
        key: k,
        val: typeof v === "object" ? JSON.stringify(v) : String(v ?? ""),
      }));
      setEntries(pairs);
    } catch (e: unknown) {
      setRawError(e instanceof Error ? e.message : "Invalid JSON syntax");
    }
  };

  const handleEntryChange = (
    index: number,
    field: "key" | "val",
    val: string
  ) => {
    const updated = [...entries];
    updated[index][field] = val;
    setEntries(updated);

    const obj: Record<string, unknown> = {};
    updated.forEach(({ key, val: itemVal }) => {
      const trimmedKey = key.trim();
      if (trimmedKey) {
        // Try parsing numbers/booleans/JSON if possible
        try {
          if (itemVal === "true") obj[trimmedKey] = true;
          else if (itemVal === "false") obj[trimmedKey] = false;
          else if (!isNaN(Number(itemVal)) && itemVal.trim() !== "")
            obj[trimmedKey] = Number(itemVal);
          else if (itemVal.startsWith("{") || itemVal.startsWith("["))
            obj[trimmedKey] = JSON.parse(itemVal);
          else obj[trimmedKey] = itemVal;
        } catch {
          obj[trimmedKey] = itemVal;
        }
      }
    });

    setRawText(JSON.stringify(obj, null, 2));
    onChange(Object.keys(obj).length > 0 ? obj : null);
  };

  const addEntry = () => {
    const next = [...entries, { key: "", val: "" }];
    setEntries(next);
  };

  const removeEntry = (index: number) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);

    const obj: Record<string, unknown> = {};
    updated.forEach(({ key, val }) => {
      if (key.trim()) obj[key.trim()] = val;
    });

    setRawText(JSON.stringify(obj, null, 2));
    onChange(Object.keys(obj).length > 0 ? obj : null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setMode("key-value")}
            className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
              mode === "key-value"
                ? "bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <i className="fas fa-list-ul mr-1" /> Key-Value
          </button>
          <button
            type="button"
            onClick={() => setMode("raw")}
            className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
              mode === "raw"
                ? "bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <i className="fas fa-code mr-1" /> Raw JSON
          </button>
        </div>
      </div>

      {helperText && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      )}

      {mode === "key-value" ? (
        <div className="space-y-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-3">
          {entries.length === 0 ? (
            <div className="text-center py-4 text-xs text-slate-400">
              No custom fields added yet.
            </div>
          ) : (
            entries.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Key (e.g. origin, flavor)"
                  value={item.key}
                  onChange={(e) =>
                    handleEntryChange(idx, "key", e.target.value)
                  }
                  className="w-1/3 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={item.val}
                  onChange={(e) =>
                    handleEntryChange(idx, "val", e.target.value)
                  }
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <button
                  type="button"
                  onClick={() => removeEntry(idx)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <i className="fas fa-trash-alt text-xs" />
                </button>
              </div>
            ))
          )}

          <button
            type="button"
            onClick={addEntry}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline pt-1"
          >
            <i className="fas fa-plus text-[10px]" /> Add Field
          </button>
        </div>
      ) : (
        <div className="space-y-1.5">
          <textarea
            rows={5}
            value={rawText}
            onChange={(e) => handleRawChange(e.target.value)}
            placeholder='{ "key": "value" }'
            className={`w-full font-mono text-xs p-3 rounded-xl border bg-slate-900 text-emerald-400 focus:outline-none focus:ring-2 ${
              rawError
                ? "border-rose-500 focus:ring-rose-500/30"
                : "border-slate-700 focus:ring-red-500/30"
            }`}
          />
          {rawError && (
            <p className="text-xs text-rose-500 flex items-center gap-1">
              <i className="fas fa-exclamation-triangle" /> {rawError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
