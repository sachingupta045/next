import React from "react";

interface PaginationProps {
  skip: number;
  limit: number;
  totalCount?: number;
  currentCount: number;
  onPageChange: (newSkip: number) => void;
  onLimitChange?: (newLimit: number) => void;
}

export function Pagination({
  skip,
  limit,
  totalCount,
  currentCount,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const currentPage = Math.floor(skip / limit) + 1;
  const hasNextPage = totalCount !== undefined ? skip + limit < totalCount : currentCount === limit;
  const hasPrevPage = skip > 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 text-xs text-slate-500 dark:text-slate-400">
      <div className="flex items-center gap-2">
        <span>
          Showing <span className="font-semibold text-slate-900 dark:text-white">{skip + 1}</span> to{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {skip + currentCount}
          </span>
          {totalCount !== undefined && (
            <>
              {" "}of <span className="font-semibold text-slate-900 dark:text-white">{totalCount}</span>
            </>
          )}
        </span>

        {onLimitChange && (
          <div className="flex items-center gap-1.5 ml-4">
            <span>Per page:</span>
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(0, skip - limit))}
          disabled={!hasPrevPage}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <i className="fas fa-chevron-left text-[10px]" />
          <span>Previous</span>
        </button>

        <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
          Page {currentPage}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(skip + limit)}
          disabled={!hasNextPage}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <i className="fas fa-chevron-right text-[10px]" />
        </button>
      </div>
    </div>
  );
}
