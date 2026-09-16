import { JOB_STATUSES, type JobStatus } from "../types/job";

interface JobFilterProps {
  filterParam: JobStatus | "all";
  setFilterParam: (value: JobStatus | "all") => void;
  count?: number;
}

function JobFilter({ filterParam, setFilterParam, count }: JobFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="statusFilter" className="text-xs font-medium text-neutral-400 shrink-0">
        Filter:
      </label>
      <select
        id="statusFilter"
        value={filterParam}
        onChange={(e) => setFilterParam(e.target.value as JobStatus | "all")}
        className="text-xs font-medium text-neutral-200 bg-[#0c0d0e] border border-neutral-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-neutral-600 focus:border-neutral-600 transition-colors cursor-pointer"
      >
        <option value="all">All Statuses</option>
        {JOB_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
      {count !== undefined && (
        <span className="text-xs text-neutral-500 font-mono">({count})</span>
      )}
    </div>
  );
}

export default JobFilter;
