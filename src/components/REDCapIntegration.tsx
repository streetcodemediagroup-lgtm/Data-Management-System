import { useState } from "react";
import {
  RefreshCw,
  Download,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Play,
  Settings,
  ChevronDown,
  Database,
  FileJson,
  FileSpreadsheet,
  Key,
  Link,
  History,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const importHistory = [
  { date: "2026-03-20 14:32", survey: "Baseline Assessment", records: 245, status: "success", duration: "2.3s" },
  { date: "2026-03-20 10:15", survey: "Follow-up Visit 1", records: 189, status: "success", duration: "1.8s" },
  { date: "2026-03-19 16:45", survey: "Medication Log", records: 312, status: "success", duration: "3.1s" },
  { date: "2026-03-19 09:00", survey: "Quality of Life", records: 0, status: "error", duration: "0.5s" },
  { date: "2026-03-18 22:10", survey: "Adverse Events", records: 56, status: "success", duration: "1.2s" },
  { date: "2026-03-18 14:00", survey: "Lab Results Entry", records: 423, status: "success", duration: "4.0s" },
];

const surveyBreakdown = [
  { name: "Baseline", value: 2450 },
  { name: "Follow-up 1", value: 1820 },
  { name: "Medication Log", value: 3100 },
  { name: "QoL Survey", value: 1560 },
  { name: "Adverse Events", value: 890 },
];

const COLORS = ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#10b981"];

const apiConfigs = [
  { name: "Production REDCap", url: "https://redcap.health.org/api/", status: "connected", lastChecked: "1 min ago" },
  { name: "Staging REDCap", url: "https://redcap-staging.health.org/api/", status: "connected", lastChecked: "5 min ago" },
  { name: "External Registry", url: "https://registry.partner.org/api/", status: "error", lastChecked: "30 min ago" },
];

export default function REDCapIntegration() {
  const [selectedFormat, setSelectedFormat] = useState("json");
  const [selectedSurvey, setSelectedSurvey] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">REDCap Integration</h1>
          <p className="text-slate-500 mt-1">Secure per-survey data import via REST API</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors">
            <Settings className="h-4 w-4" />
            API Settings
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition-colors">
            <RefreshCw className="h-4 w-4" />
            Sync Now
          </button>
        </div>
      </div>

      {/* API Connection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {apiConfigs.map((api, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${api.status === "connected" ? "bg-emerald-400" : "bg-red-400"}`} />
                <span className="text-sm font-medium text-slate-900">{api.name}</span>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  api.status === "connected" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                }`}
              >
                {api.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono truncate">{api.url}</p>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Checked: {api.lastChecked}
            </p>
          </div>
        ))}
      </div>

      {/* Import Configuration */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Download className="h-4 w-4 text-violet-500" />
          Import Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase">Survey/Instrument</label>
            <div className="relative mt-1">
              <select
                value={selectedSurvey}
                onChange={(e) => setSelectedSurvey(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="all">All Surveys</option>
                <option value="baseline">Baseline Assessment</option>
                <option value="followup1">Follow-up Visit 1</option>
                <option value="medication">Medication Log</option>
                <option value="qol">Quality of Life</option>
                <option value="adverse">Adverse Events</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase">Export Format</label>
            <div className="flex items-center gap-2 mt-1">
              {["json", "csv", "xml"].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    selectedFormat === fmt
                      ? "bg-violet-50 border-violet-300 text-violet-700"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {fmt === "json" && <FileJson className="h-3 w-3 inline mr-1" />}
                  {fmt === "csv" && <FileSpreadsheet className="h-3 w-3 inline mr-1" />}
                  {fmt === "xml" && <FileJson className="h-3 w-3 inline mr-1" />}
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase">Sync Mode</label>
            <div className="relative mt-1">
              <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option>Incremental (date filter)</option>
                <option>Full refresh</option>
                <option>New records only</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition-colors">
              <Play className="h-4 w-4" />
              Run Import
            </button>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Records by Survey</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={surveyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" angle={-20} textAnchor="end" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Records" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Distribution Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={surveyBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {surveyBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Import History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <History className="h-4 w-4 text-violet-500" />
            Import History
          </h3>
          <span className="text-xs text-slate-400">Last 24 hours</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Date/Time</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Survey</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Records</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Duration</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {importHistory.map((entry, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-5 py-3 text-sm text-slate-600">{entry.date}</td>
                  <td className="px-5 py-3 text-sm font-medium text-slate-900">{entry.survey}</td>
                  <td className="px-5 py-3 text-sm text-slate-600">{entry.records}</td>
                  <td className="px-5 py-3 text-sm text-slate-600">{entry.duration}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                        entry.status === "success"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {entry.status === "success" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <AlertTriangle className="h-3 w-3" />
                      )}
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Authentication & Security Note */}
      <div className="bg-slate-900 rounded-xl p-5 text-slate-300">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-slate-700">
            <Key className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <h4 className="font-medium text-white">API Authentication</h4>
            <p className="text-sm text-slate-400 mt-1">
              API tokens are securely stored in environment variables and vault. All API interactions are
              logged for auditability. Connections use TLS 1.3 with certificate validation.
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Link className="h-3 w-3" /> TLS 1.3</span>
              <span className="flex items-center gap-1"><Database className="h-3 w-3" /> Encrypted at Rest</span>
              <span className="flex items-center gap-1"><History className="h-3 w-3" /> Full Audit Log</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
