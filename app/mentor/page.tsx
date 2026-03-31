"use client";

import { useState } from "react";
import { ClipboardList, Send, AlertTriangle, ChevronDown } from "lucide-react";
import type { MentorLog, IssueCategory } from "@/types/index";

const CATEGORIES: IssueCategory[] = [
  "Private/Parent",
  "Self",
  "Community",
  "Environment",
];

const MOCK_LOGS: MentorLog[] = [
  {
    id: "log-001",
    studentAlias: "Star-A",
    age: 15,
    location: "Delhi, Sector 14",
    category: "Self",
    observation:
      "Student expressed persistent sadness and withdrawal from group activities for the past two weeks.",
    isUrgent: true,
    dateLogged: "2025-11-12",
    mentorId: "mentor-01",
  },
  {
    id: "log-002",
    studentAlias: "River-B",
    age: 17,
    location: "Mumbai, Dharavi",
    category: "Community",
    observation:
      "Peer pressure from local group leading to irregular attendance. No immediate crisis.",
    isUrgent: false,
    dateLogged: "2025-11-10",
    mentorId: "mentor-01",
  },
  {
    id: "log-003",
    studentAlias: "Sky-C",
    age: 13,
    location: "Bengaluru, Koramangala",
    category: "Private/Parent",
    observation:
      "Reported conflict at home; parent unemployment creating significant household stress.",
    isUrgent: false,
    dateLogged: "2025-11-08",
    mentorId: "mentor-02",
  },
  {
    id: "log-004",
    studentAlias: "Moon-D",
    age: 16,
    location: "Chennai, T Nagar",
    category: "Environment",
    observation:
      "Student mentioned feeling unsafe near school premises after hours. Immediate follow-up recommended.",
    isUrgent: true,
    dateLogged: "2025-11-07",
    mentorId: "mentor-02",
  },
];

type FormState = {
  studentAlias: string;
  age: string;
  location: string;
  category: IssueCategory | "";
  observation: string;
  isUrgent: boolean;
};

const INITIAL_FORM: FormState = {
  studentAlias: "",
  age: "",
  location: "",
  category: "",
  observation: "",
  isUrgent: false,
};

export default function MentorPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [logs, setLogs] = useState<MentorLog[]>(MOCK_LOGS);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category) return;

    const newLog: MentorLog = {
      id: `log-${Date.now()}`,
      studentAlias: form.studentAlias,
      age: Number(form.age),
      location: form.location,
      category: form.category as IssueCategory,
      observation: form.observation,
      isUrgent: form.isUrgent,
      dateLogged: new Date().toISOString().split("T")[0],
      mentorId: "mentor-current",
    };

    setLogs((prev) => [newLog, ...prev]);
    setForm(INITIAL_FORM);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-10">
        <span className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg text-blue-600">
          <ClipboardList size={20} />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Mentor Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Log community observations and track student wellbeing patterns.
          </p>
        </div>
      </div>

      {/* ── Submission Form ── */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8 mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Submit New Observation
        </h2>

        {submitted && (
          <div className="mb-5 bg-green-50 border border-green-200 text-green-800 text-sm rounded-lg px-4 py-3 font-medium">
            ✓ Observation logged successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Student Alias */}
            <div>
              <label
                htmlFor="studentAlias"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Student Alias <span className="text-red-500">*</span>
              </label>
              <input
                id="studentAlias"
                name="studentAlias"
                type="text"
                required
                value={form.studentAlias}
                onChange={handleChange}
                placeholder="e.g. Star-A"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>

            {/* Age */}
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Age <span className="text-red-500">*</span>
              </label>
              <input
                id="age"
                name="age"
                type="number"
                required
                min={5}
                max={25}
                value={form.age}
                onChange={handleChange}
                placeholder="e.g. 15"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Location <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Delhi, Sector 14"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  required
                  value={form.category}
                  onChange={handleChange}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow pr-9"
                >
                  <option value="" disabled>
                    Select a category…
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Observation */}
          <div>
            <label
              htmlFor="observation"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Observation <span className="text-red-500">*</span>
            </label>
            <textarea
              id="observation"
              name="observation"
              required
              rows={4}
              value={form.observation}
              onChange={handleChange}
              placeholder="Describe what you observed in a factual, non-identifying manner…"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow resize-none"
            />
          </div>

          {/* Is Urgent */}
          <div className="flex items-start gap-3">
            <input
              id="isUrgent"
              name="isUrgent"
              type="checkbox"
              checked={form.isUrgent}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor="isUrgent"
              className="text-sm text-slate-700 cursor-pointer leading-relaxed"
            >
              <span className="font-medium text-slate-800">Mark as Urgent</span>
              <br />
              <span className="text-slate-500">
                Check this if the student appears to be in immediate distress or
                at risk. This will flag the log for priority review.
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm text-sm"
            >
              <Send size={16} />
              Submit Observation
            </button>
          </div>
        </form>
      </section>

      {/* ── Historical Log Table ── */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Observation Log
        </h2>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600 uppercase text-xs tracking-wider">
                    Alias
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600 uppercase text-xs tracking-wider">
                    Age
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600 uppercase text-xs tracking-wider">
                    Location
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600 uppercase text-xs tracking-wider">
                    Category
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600 uppercase text-xs tracking-wider">
                    Observation
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600 uppercase text-xs tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600 uppercase text-xs tracking-wider text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className={`hover:bg-slate-50 transition-colors ${log.isUrgent
                      ? "border-l-4 border-l-red-400"
                      : "border-l-4 border-l-transparent"
                      }`}
                  >
                    <td className="px-5 py-4 font-medium text-slate-800 whitespace-nowrap">
                      {log.studentAlias}
                    </td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                      {log.age}
                    </td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                      {log.location}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-100">
                        {log.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 max-w-xs">
                      <p className="truncate" title={log.observation}>
                        {log.observation}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                      {log.dateLogged}
                    </td>
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      {log.isUrgent ? (
                        <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                          <AlertTriangle size={11} />
                          Urgent
                        </span>
                      ) : (
                        <span className="inline-block bg-slate-100 text-slate-500 text-xs px-2.5 py-1 rounded-full border border-slate-200">
                          Routine
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {logs.length === 0 && (
            <div className="py-16 text-center text-slate-400 text-sm">
              No logs yet. Submit an observation to get started.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
