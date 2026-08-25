"use client";

import React, { useState, useEffect } from "react";
import {
  healthApi,
  brandsApi,
  categoriesApi,
  productsApi,
  countryApi,
  usersApi,
} from "@/lib/api";
import { Badge } from "../components/Badge";

interface EndpointDiagnostic {
  name: string;
  endpoint: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  status: "idle" | "testing" | "success" | "error";
  statusCode?: number;
  latencyMs?: number;
  error?: string;
  sampleData?: unknown;
}

export default function AdminApiStatusPage() {
  const [endpoints, setEndpoints] = useState<EndpointDiagnostic[]>([
    {
      name: "Root Health Check",
      endpoint: "/",
      method: "GET",
      status: "idle",
    },
    {
      name: "List Brands",
      endpoint: "/api/v1/brands/?limit=1",
      method: "GET",
      status: "idle",
    },
    {
      name: "List Categories",
      endpoint: "/api/v1/categories/?limit=1",
      method: "GET",
      status: "idle",
    },
    {
      name: "List Products",
      endpoint: "/api/v1/products/?limit=1",
      method: "GET",
      status: "idle",
    },
    {
      name: "List Countries",
      endpoint: "/api/v1/country/?limit=1",
      method: "GET",
      status: "idle",
    },
    {
      name: "List Users",
      endpoint: "/api/v1/users/",
      method: "GET",
      status: "idle",
    },
    {
      name: "Brand Hello World",
      endpoint: "/api/v1/brands/hello",
      method: "GET",
      status: "idle",
    },
  ]);

  const [testingAll, setTestingAll] = useState(false);
  const [activeJson, setActiveJson] = useState<{
    name: string;
    data: unknown;
  } | null>(null);

  const testEndpoint = async (index: number) => {
    setEndpoints((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], status: "testing", error: undefined };
      return copy;
    });

    const start = performance.now();
    try {
      let data: unknown;
      if (index === 0) data = await healthApi.check();
      else if (index === 1) data = await brandsApi.list({ limit: 1 });
      else if (index === 2) data = await categoriesApi.list({ limit: 1 });
      else if (index === 3) data = await productsApi.list({ limit: 1 });
      else if (index === 4) data = await countryApi.list({ limit: 1 });
      else if (index === 5) data = await usersApi.list();
      else if (index === 6) data = await brandsApi.hello();

      const duration = Math.round(performance.now() - start);

      setEndpoints((prev) => {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          status: "success",
          statusCode: 200,
          latencyMs: duration,
          sampleData: data,
        };
        return copy;
      });
    } catch (err: unknown) {
      const duration = Math.round(performance.now() - start);
      setEndpoints((prev) => {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          status: "error",
          statusCode: 500,
          latencyMs: duration,
          error: err instanceof Error ? err.message : "Request failed",
        };
        return copy;
      });
    }
  };

  const runAllTests = async () => {
    setTestingAll(true);
    for (let i = 0; i < endpoints.length; i++) {
      await testEndpoint(i);
    }
    setTestingAll(false);
  };

  useEffect(() => {
    runAllTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalSuccess = endpoints.filter((e) => e.status === "success").length;
  const avgLatency = Math.round(
    endpoints
      .filter((e) => e.latencyMs !== undefined)
      .reduce((sum, e) => sum + (e.latencyMs || 0), 0) / (endpoints.length || 1)
  );

  return (
    <div className="space-y-6">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <i className="fas fa-network-wired text-sky-400 text-xl" />
            <span>API Diagnostics &amp; Health Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time endpoint connectivity validation, latency benchmarking &amp; payload inspection
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="http://127.0.0.1:8080/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs transition-colors"
          >
            <i className="fas fa-file-code" />
            <span>Open Swagger Docs</span>
            <i className="fas fa-external-link-alt text-[10px]" />
          </a>

          <button
            type="button"
            onClick={runAllTests}
            disabled={testingAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 text-white font-bold text-xs shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all disabled:opacity-50"
          >
            <i className={`fas fa-sync-alt ${testingAll ? "fa-spin" : ""}`} />
            <span>Run All Health Tests</span>
          </button>
        </div>
      </div>

      {/* ── Summary Stats ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg">
            <i className="fas fa-check-circle" />
          </div>
          <div>
            <div className="text-xl font-black text-white">
              {totalSuccess} / {endpoints.length}
            </div>
            <p className="text-xs text-slate-400">Operational Endpoints</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-lg">
            <i className="fas fa-tachometer-alt" />
          </div>
          <div>
            <div className="text-xl font-black text-white">
              {isNaN(avgLatency) ? "—" : `${avgLatency} ms`}
            </div>
            <p className="text-xs text-slate-400">Average Response Time</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg">
            <i className="fas fa-server" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-slate-200">
              http://127.0.0.1:8080
            </div>
            <p className="text-xs text-slate-400">FastAPI Base URL</p>
          </div>
        </div>
      </div>

      {/* ── Endpoint Test Cards ────────────────────────────────── */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">API Test Suite</h3>
          <span className="text-xs text-slate-400">FastAPI v1.0.0</span>
        </div>

        <div className="divide-y divide-slate-800">
          {endpoints.map((ep, idx) => (
            <div
              key={ep.endpoint}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3">
                <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold text-[10px] uppercase">
                  {ep.method}
                </span>

                <div>
                  <div className="font-bold text-slate-100 text-xs">
                    {ep.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {ep.endpoint}
                  </div>
                  {ep.error && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {ep.error}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                {ep.latencyMs !== undefined && (
                  <span className="text-xs font-mono text-slate-400">
                    {ep.latencyMs}ms
                  </span>
                )}

                {ep.status === "testing" ? (
                  <Badge variant="warning" dot>
                    Pinging...
                  </Badge>
                ) : ep.status === "success" ? (
                  <Badge variant="success" dot>
                    200 OK
                  </Badge>
                ) : ep.status === "error" ? (
                  <Badge variant="danger" dot>
                    Failed
                  </Badge>
                ) : (
                  <Badge variant="neutral">Idle</Badge>
                )}

                {ep.sampleData !== undefined && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveJson({ name: ep.name, data: ep.sampleData })
                    }
                    className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors text-xs font-mono"
                    title="Inspect Response JSON"
                  >
                    <i className="fas fa-code" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => testEndpoint(idx)}
                  disabled={ep.status === "testing"}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── JSON Inspection Modal ──────────────────────────────── */}
      {activeJson && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setActiveJson(null)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 text-left shadow-2xl relative z-10 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-bold text-sm text-white">
                  Payload: {activeJson.name}
                </h4>
                <button
                  type="button"
                  onClick={() => setActiveJson(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs max-h-96 overflow-y-auto custom-scrollbar">
                {JSON.stringify(activeJson.data, null, 2)}
              </pre>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveJson(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
