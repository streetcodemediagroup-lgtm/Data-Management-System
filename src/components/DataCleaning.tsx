import { useState } from "react";
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  ChevronDown,
  Play,
  RefreshCw,
  Eye,
  Download,
  ShieldAlert,
  Gauge,
  BarChart3,
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

const anomalyData = [
  { time: "00:00", anomalies: 2 },
  { time: "04:00", anomalies: 1 },
  { time: "08:00", anomalies: 5 },
  { time: "12:00", anomalies: 8 },
  { time: "16:00", anomalies: 4 },
  { time: "20:00", anomalies: 3 },
];

const profilingResults = [
  { column: "patient_id", type: "string", completeness: "100%", uniqueness: "100%", anomalies: 0, status: "clean" },
  { column: "age", type: "integer", completeness: "99.8%", uniqueness: "12%", anomalies: 3, status: "warning" },
  { column: "bmi", type: "float", completeness: "98.2%", uniqueness: "67%", anomalies: 12, status: "error" },
  { column: "diagnosis", type: "categorical", completeness: "100%", uniqueness: "8%", anomalies: 0, status: "clean" },
  { column: "lab_result", type: "float", completeness: "95.4%", uniqueness: "89%", anomalies: 7, status: "warning" },
  { column: "visit_date", type: "date", completeness: "100%", uniqueness: "45%", anomalies: 1, status: "clean" },
  { column: "medication", type: "string", completeness: "91.3%", uniqueness: "34%", anomalies: 5, status: "warning" },
];

const cleaningRules = [
  { name: "Range Check: Age", description: "0-120 years", status: "active", lastRun: "10 min ago" },
  { name: "Null Detection: Required Fields", description: "Missing value scan", status: "active", lastRun: "15 min ago" },
  { name: "Format Validation: Dates", description: "ISO 8601 compliance", status: "active", lastRun: "20 min ago" },
  { name: "Outlier Detection: BMI", description: "IQR method, 1.5x threshold", status: "paused", lastRun: "1 hour ago" },
  { name: "Cross-field: Lab vs Diagnosis", description: "Consistency check", status: "active", lastRun: "5 min ago" },
];

export default function DataCleaning() {
  const [selectedDataset, setSelectedDataset] = useState("clinical_outcomes");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Data Cleaning & Monitoring</h1>
          <p className="text-slate-500 mt-1">Automated profiling, error detection, and quality monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition-colors">
            <Play className="h-4 w-4" />
            Run Cleaning
          </button>
        </div>
      </div>

      {/* Dataset Selector & Quality Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase">Dataset</label>
              <div className="relative mt-1">
                <select
                  value={selectedDataset}
                  onChange={(e) => setSelectedDataset(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="clinical_outcomes">Clinical Outcomes (142K records)</option>
                  <option value="patient_demographics">Patient Demographics (98K records)</option>
                  <option value="lab_results">Lab Results (210K records)</option>
                  <option value="medication_records">Medication Records (67K records)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Filter className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-500">7 columns profiled</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Gauge className="absolute inset-0 w-16 h-16 text-slate-200" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-emerald-600">97%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Overall Quality</p>
            <p className="text-xs text-slate-500">Based on completeness, uniqueness, validity</p>
          </div>
        </div>
      </div>

      {/* Anomaly Monitoring Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-violet-500" />
          Real-time Anomaly Detection (24h)
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={anomalyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="anomalies"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: "#f59e0b", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Column Profiling Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <Search className="h-4 w-4 text-violet-500" />
            Column Profiling Results
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Column</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Type</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Completeness</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Uniqueness</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Anomalies</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {profilingResults.map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-slate-900">{row.column}</td>
                  <td className="px-5 py-3 text-sm text-slate-600">{row.type}</td>
                  <td className="px-5 py-3 text-sm text-slate-600">{row.completeness}</td>
                  <td className="px-5 py-3 text-sm text-slate-600">{row.uniqueness}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-sm font-medium ${
                        row.anomalies > 5
                          ? "text-red-500"
                          : row.anomalies > 0
                          ? "text-amber-500"
                          : "text-emerald-500"
                      }`}
                    >
                      {row.anomalies}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        row.status === "clean"
                          ? "bg-emerald-50 text-emerald-700"
                          : row.status === "warning"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {row.status === "clean" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : row.status === "warning" ? (
                        <AlertTriangle className="h-3 w-3" />
                      ) : (
                        <ShieldAlert className="h-3 w-3" />
                      )}
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600">
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

      {/* Cleaning Rules */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Filter className="h-4 w-4 text-violet-500" />
          Active Cleaning Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cleaningRules.map((rule, i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-lg p-4 hover:border-violet-200 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-900">{rule.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    rule.status === "active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {rule.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{rule.description}</p>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                Last run: {rule.lastRun}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
