import { useState } from "react";
import {
  Workflow,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  AlertTriangle,
  GitBranch,
  RotateCcw,
  FileText,
  Code2,
  Plus,
  Trash2,
  Copy,
  Download,
  History,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const pipelineRuns = [
  { date: "Mar 14", success: 8, failed: 1, duration: 42 },
  { date: "Mar 15", success: 12, failed: 2, duration: 51 },
  { date: "Mar 16", success: 10, failed: 0, duration: 38 },
  { date: "Mar 17", success: 15, failed: 1, duration: 45 },
  { date: "Mar 18", success: 11, failed: 1, duration: 40 },
  { date: "Mar 19", success: 14, failed: 0, duration: 48 },
  { date: "Mar 20", success: 9, failed: 0, duration: 36 },
];

const pipelines = [
  {
    id: 1,
    name: "Patient Demographics ETL",
    description: "Extract, clean, and load patient demographic data",
    status: "running",
    tool: "Python/Pandas",
    lastRun: "2 min ago",
    version: "v2.4.1",
    steps: 5,
  },
  {
    id: 2,
    name: "Lab Results Processing",
    description: "Normalize and validate laboratory test results",
    status: "completed",
    tool: "R/dplyr",
    lastRun: "15 min ago",
    version: "v1.8.3",
    steps: 4,
  },
  {
    id: 3,
    name: "Clinical Outcomes Analysis",
    description: "Statistical analysis of clinical outcomes data",
    status: "failed",
    tool: "STATA",
    lastRun: "1 hour ago",
    version: "v3.2.0",
    steps: 7,
  },
  {
    id: 4,
    name: "REDCap Data Sync",
    description: "Automated REDCap survey data import and transformation",
    status: "scheduled",
    tool: "Python/PyCap",
    lastRun: "4 hours ago",
    version: "v2.1.0",
    steps: 3,
  },
  {
    id: 5,
    name: "Quality Metrics Dashboard",
    description: "Generate data quality metrics for reporting",
    status: "completed",
    tool: "Python/Plotly",
    lastRun: "30 min ago",
    version: "v1.5.2",
    steps: 6,
  },
];

const versionHistory = [
  { version: "v2.4.1", date: "2026-03-20", author: "j.smith", changes: "Updated outlier thresholds" },
  { version: "v2.4.0", date: "2026-03-15", author: "a.jones", changes: "Added new validation rules" },
  { version: "v2.3.2", date: "2026-03-10", author: "j.smith", changes: "Fixed date parsing bug" },
  { version: "v2.3.1", date: "2026-03-05", author: "m.wilson", changes: "Performance optimization" },
];

export default function AnalysisPipelines() {
  const [activeTab, setActiveTab] = useState<"pipelines" | "history">("pipelines");

  const statusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Play className="h-4 w-4 text-emerald-500" />;
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "scheduled":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      running: "bg-emerald-50 text-emerald-700 border-emerald-200",
      completed: "bg-blue-50 text-blue-700 border-blue-200",
      failed: "bg-red-50 text-red-700 border-red-200",
      scheduled: "bg-amber-50 text-amber-700 border-amber-200",
    };
    return `text-xs px-2 py-0.5 rounded-full border ${colors[status] || ""}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analysis Pipelines</h1>
          <p className="text-slate-500 mt-1">Reproducible, version-controlled data workflows</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition-colors">
          <Plus className="h-4 w-4" />
          New Pipeline
        </button>
      </div>

      {/* Pipeline Run Stats */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-violet-500" />
          Pipeline Execution History
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pipelineRuns}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="success"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 4 }}
                name="Successful"
              />
              <Line
                type="monotone"
                dataKey="failed"
                stroke="#f43f5e"
                strokeWidth={2}
                dot={{ fill: "#f43f5e", r: 4 }}
                name="Failed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab("pipelines")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "pipelines" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Active Pipelines
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "history" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Version History
        </button>
      </div>

      {activeTab === "pipelines" ? (
        <div className="space-y-4">
          {pipelines.map((pipeline) => (
            <div
              key={pipeline.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-violet-200 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-violet-50">
                    <Workflow className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-slate-900">{pipeline.name}</h3>
                      <span className={statusBadge(pipeline.status)}>
                        <span className="flex items-center gap-1">
                          {statusIcon(pipeline.status)}
                          {pipeline.status}
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{pipeline.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Code2 className="h-3 w-3" /> {pipeline.tool}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitBranch className="h-3 w-3" /> {pipeline.version}
                      </span>
                      <span>{pipeline.steps} steps</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {pipeline.lastRun}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors" title="Run">
                    <Play className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-amber-600 transition-colors" title="Pause">
                    <Pause className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors" title="Copy">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-600 transition-colors" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {/* Pipeline steps visualization */}
              <div className="mt-4 flex items-center gap-2">
                {Array.from({ length: pipeline.steps }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        pipeline.status === "failed" && i === pipeline.steps - 1
                          ? "bg-red-400"
                          : pipeline.status === "running"
                          ? "bg-emerald-400 animate-pulse"
                          : "bg-violet-300"
                      }`}
                    />
                    {i < pipeline.steps - 1 && <div className="h-px w-6 bg-slate-200" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <History className="h-4 w-4 text-violet-500" />
              Pipeline Version History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Version</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Author</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Changes</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {versionHistory.map((v, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-5 py-3 text-sm font-mono text-violet-600">{v.version}</td>
                    <td className="px-5 py-3 text-sm text-slate-600">{v.date}</td>
                    <td className="px-5 py-3 text-sm text-slate-600">{v.author}</td>
                    <td className="px-5 py-3 text-sm text-slate-600">{v.changes}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-violet-600" title="View">
                          <FileText className="h-3.5 w-3.5" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-emerald-600" title="Rollback">
                          <RotateCcw className="h-3.5 w-3.5" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-blue-600" title="Download">
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
