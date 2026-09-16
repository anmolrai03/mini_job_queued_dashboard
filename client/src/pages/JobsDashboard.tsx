import { useState } from "react";
import StatusCounts from "../components/StatusCounts";
import JobFilter from "../components/JobFilter";
import { useGetJobs } from "../hooks/useGetJobs";
import { type JobStatus } from "../types/job";
import JobForm from "../components/JobForm";
import { JobCard } from "../components/JobCard";

function JobsDashboard() {
  const { loading, data, error, refetch } = useGetJobs();
  const [filterParam, setFilterParam] = useState<JobStatus | "all">("all");

  const filteredData =
    filterParam === "all" ? data : data.filter((job) => job.status === filterParam);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0d0e] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-6 h-6 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-medium text-neutral-400 tracking-wide">
            Loading queue dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0c0d0e] flex items-center justify-center p-6">
        <div className="bg-[#141517] border border-neutral-800 rounded-xl p-6 max-w-md w-full text-center space-y-3">
          <h2 className="text-sm font-semibold text-neutral-100">Failed to load jobs</h2>
          <p className="text-xs text-rose-400">{error}</p>
          <button
            onClick={() => refetch()}
            className="text-xs font-medium px-4 py-2 rounded-lg bg-neutral-100 text-neutral-900 hover:bg-white transition-colors cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-neutral-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <header className="pb-3 border-b border-neutral-800">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-100">
            Jobs Dashboard
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Monitor job execution, manage lifecycle transitions, and enqueue background tasks.
          </p>
        </header>

        {/* Status Metrics on Top (no dots) */}
        <StatusCounts data={data} />

        {/* Job Creation Form */}
        <JobForm onJobCreated={refetch} />

        {/* Jobs Listing Section */}
        <section className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-neutral-100 tracking-tight">
                Queued Jobs
              </h2>
              <p className="text-xs text-neutral-400">
                Showing {filteredData.length} of {data.length} jobs
              </p>
            </div>
            <JobFilter
              filterParam={filterParam}
              setFilterParam={setFilterParam}
              count={filteredData.length}
            />
          </div>

          {filteredData.length === 0 ? (
            <div className="bg-[#141517] rounded-xl border border-dashed border-neutral-800 p-12 text-center">
              <p className="text-sm font-medium text-neutral-300">No jobs found</p>
              <p className="text-xs text-neutral-500 mt-1">
                {filterParam !== "all"
                  ? `No jobs currently in "${filterParam}" status.`
                  : "Create your first job using the form above."}
              </p>
            </div>
          ) : (
            <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredData.map((job) => (
                <JobCard key={job.id} job={job} refetch={refetch} />
              ))}
            </main>
          )}
        </section>
      </div>
    </div>
  );
}

export default JobsDashboard;
