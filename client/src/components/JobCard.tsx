import { useState, useEffect } from "react";
import { type Job, type JobStatus, JOB_STATUSES } from "../types/job";
import { useUpdateJobStatus } from "../hooks/useUpdateJobStatus";
import { useDeleteJob } from "../hooks/useDeleteJob";

export function JobCard({ job, refetch }: { job: Job; refetch: () => void }) {
  const [selectedStatus, setSelectedStatus] = useState<JobStatus>(job.status);

  useEffect(() => {
    setSelectedStatus(job.status);
  }, [job.status]);

  const {
    loading: updating,
    error: updateError,
    updateJobStatus,
  } = useUpdateJobStatus(refetch);

  const {
    loading: deleting,
    error: deleteError,
    deleteJob,
  } = useDeleteJob(refetch);

  const handleStatusUpdate = () => {
    if (selectedStatus !== job.status) {
      updateJobStatus(job.id, selectedStatus);
    }
  };

  const handleDelete = () => {
    deleteJob(job.id);
  };

  const statusBadges: Record<JobStatus, string> = {
    pending: "bg-neutral-800 text-neutral-300 border-neutral-700",
    running: "bg-amber-950/50 text-amber-300 border-amber-800/60",
    completed: "bg-emerald-950/50 text-emerald-300 border-emerald-800/60",
    failed: "bg-rose-950/50 text-rose-300 border-rose-800/60",
  };

  return (
    <article className="bg-[#141517] rounded-xl border border-neutral-800 p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h2 className="font-semibold text-base text-neutral-100 leading-snug tracking-tight">
            {job.title}
          </h2>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border shrink-0 capitalize ${
              statusBadges[job.status] || "bg-neutral-800 text-neutral-300 border-neutral-700"
            }`}
          >
            {job.status}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400 mb-5">
          <span className="inline-flex items-center gap-1">
            <span className="text-neutral-500">Type:</span>
            <span className="font-medium text-neutral-300">{job.type}</span>
          </span>
          <span className="text-neutral-600">•</span>
          <span className="inline-flex items-center gap-1">
            <span className="text-neutral-500">Created:</span>
            <time dateTime={job.createdAt} className="text-neutral-300">
              {new Date(job.createdAt).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          </span>
        </div>
      </div>

      <div className="pt-3.5 border-t border-neutral-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 sm:flex-initial">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as JobStatus)}
            disabled={updating}
            className="text-xs font-medium text-neutral-200 bg-[#0c0d0e] border border-neutral-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-neutral-600 focus:border-neutral-600 disabled:opacity-50 cursor-pointer"
          >
            {JOB_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleStatusUpdate}
            disabled={updating || selectedStatus === job.status}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-900 hover:bg-white active:bg-neutral-200 disabled:opacity-40 disabled:hover:bg-neutral-100 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {updating ? "Saving..." : "Ok"}
          </button>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs font-medium text-neutral-400 hover:text-rose-400 hover:bg-rose-950/30 border border-neutral-800 hover:border-rose-900/50 px-2.5 py-1.5 rounded-lg disabled:opacity-40 transition-colors cursor-pointer"
          title="Delete Job"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {(updateError || deleteError) && (
        <div className="mt-3 pt-2.5 border-t border-neutral-800 text-xs text-rose-400">
          {updateError || deleteError}
        </div>
      )}
    </article>
  );
}
