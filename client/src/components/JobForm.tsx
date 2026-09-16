import React, { useState } from "react";
import { useCreateJob } from "../hooks/useCreateJob";

interface JobFormProps {
  onJobCreated: () => void;
}

function JobForm({ onJobCreated }: JobFormProps) {
  const { loading, error, createJob } = useCreateJob();

  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !type.trim()) return;

    const res = await createJob(title.trim(), type.trim());
    if (res) {
      onJobCreated();
      setTitle("");
      setType("");
    }
  };

  return (
    <section className="bg-[#141517] rounded-xl border border-neutral-800 p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-neutral-100 tracking-tight">Create Job</h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          Enqueue a new background task to the queue.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="title" className="block text-xs font-medium text-neutral-300 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter the title ....."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minLength={1}
              required
              disabled={loading}
              className="w-full text-xs text-neutral-100 placeholder:text-neutral-500 bg-[#0c0d0e] border border-neutral-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-600 focus:border-neutral-600 disabled:opacity-50 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-xs font-medium text-neutral-300 mb-1">
              Type
            </label>
            <input
              type="text"
              id="type"
              placeholder="Enter Type of Job....."
              value={type}
              onChange={(e) => setType(e.target.value)}
              minLength={1}
              required
              disabled={loading}
              className="w-full text-xs text-neutral-100 placeholder:text-neutral-500 bg-[#0c0d0e] border border-neutral-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-600 focus:border-neutral-600 disabled:opacity-50 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          {error ? (
            <p className="text-xs text-rose-400 font-medium">{error}</p>
          ) : (
            <span />
          )}

          <button
            type="submit"
            disabled={loading || !title.trim() || !type.trim()}
            className="text-xs font-medium px-4 py-2 rounded-lg bg-neutral-100 text-neutral-900 hover:bg-white active:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 ml-auto cursor-pointer"
          >
            {loading ? "Submitting..." : "Submit Form"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default JobForm;