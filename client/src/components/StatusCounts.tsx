import { JOB_STATUSES, type Job } from "../types/job";

interface StatusCountsProps {
  data: Job[];
}

function StatusCounts({ data }: StatusCountsProps) {
  const totalCount = data.length;
  const pendingCount = data.filter((job) => job.status === JOB_STATUSES[0]).length;
  const runningCount = data.filter((job) => job.status === JOB_STATUSES[1]).length;
  const completedCount = data.filter((job) => job.status === JOB_STATUSES[2]).length;
  const failedCount = data.filter((job) => job.status === JOB_STATUSES[3]).length;

  const stats = [
    { label: "Total", count: totalCount },
    { label: "Pending", count: pendingCount },
    { label: "Running", count: runningCount },
    { label: "Completed", count: completedCount },
    { label: "Failed", count: failedCount },
  ];

  return (
    <section aria-label="Job status metrics" className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#141517] rounded-xl border border-neutral-800 p-4 flex flex-col justify-between"
        >
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
            {stat.label}
          </span>
          <span className="mt-2 text-2xl font-semibold text-neutral-100 tracking-tight">
            {stat.count}
          </span>
        </div>
      ))}
    </section>
  );
}

export default StatusCounts;