import { useState } from "react";
import {
  TrendingUp,
  Download,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart,
  Eye,
  Share2,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

const monthlyTrends = [
  { month: "Oct", patients: 1200, outcomes: 85, surveys: 3400 },
  { month: "Nov", patients: 1350, outcomes: 88, surveys: 3800 },
  { month: "Dec", patients: 1480, outcomes: 87, surveys: 4100 },
  { month: "Jan", patients: 1520, outcomes: 90, surveys: 4300 },
  { month: "Feb", patients: 1650, outcomes: 91, surveys: 4600 },
  { month: "Mar", patients: 1800, outcomes: 93, surveys: 5200 },
];

const outcomesByGroup = [
  { name: "Control", favorable: 62, unfavorable: 38 },
  { name: "Treatment A", favorable: 74, unfavorable: 26 },
  { name: "Treatment B", favorable: 81, unfavorable: 19 },
  { name: "Combined", favorable: 88, unfavorable: 12 },
];

const weeklyMetrics = [
  { week: "W1", quality: 94, completeness: 98, timeliness: 92 },
  { week: "W2", quality: 96, completeness: 99, timeliness: 94 },
  { week: "W3", quality: 93, completeness: 97, timeliness: 91 },
  { week: "W4", quality: 97, completeness: 99, timeliness: 95 },
  { week: "W5", quality: 95, completeness: 98, timeliness: 93 },
  { week: "W6", quality: 98, completeness: 100, timeliness: 96 },
];

const reports = [
  { name: "Monthly Clinical Summary", type: "Scheduled", lastGenerated: "Mar 20, 2026", format: "PDF", status: "ready" },
  { name: "Data Quality Dashboard", type: "Real-time", lastGenerated: "Continuous", format: "Interactive", status: "live" },
  { name: "REDCap Import Report", type: "On-demand", lastGenerated: "Mar 19, 2026", format: "PDF/Excel", status: "ready" },
  { name: "Adverse Events Summary", type: "Triggered", lastGenerated: "Mar 20, 2026", format: "PDF", status: "ready" },
];

export default function Reporting() {
  const [dateRange, setDateRange] = useState("6m");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Trending & Reporting</h1>
          <p className="text-slate-500 mt-1">Interactive dashboards and automated report generation</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            {["1m", "3m", "6m", "1y", "all"].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  dateRange === range
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {range === "all" ? "All" : range.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Patients", value: "12,847", change: "+8.2%", color: "from-violet-500 to-purple-600", icon: TrendingUp },
          { label: "Favorable Outcomes", value: "93.1%", change: "+2.4%", color: "from-emerald-500 to-teal-600", icon: BarChart3 },
          { label: "Surveys Collected", value: "28,400", change: "+15.7%", color: "from-blue-500 to-cyan-600", icon: PieChart },
          { label: "Data Completeness", value: "99.2%", change: "+1.1%", color: "from-amber-500 to-orange-600", icon: TrendingUp },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${kpi.color}`}>
                <kpi.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs font-medium text-emerald-600">{kpi.change}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-3">{kpi.value}</p>
            <p className="text-sm text-slate-500">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <LineChartIcon className="h-4 w-4 text-violet-500" />
            Monthly Trends
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="patients"
                  stroke="#8b5cf6"
                  fill="url(#patientsGrad)"
                  strokeWidth={2}
                  name="Patients"
                />
                <Area
                  type="monotone"
                  dataKey="surveys"
                  stroke="#3b82f6"
                  fill="url(#surveysGrad)"
                  strokeWidth={2}
                  name="Surveys"
                />
                <defs>
                  <linearGradient id="patientsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="surveysGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Outcomes by Group */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-violet-500" />
            Clinical Outcomes by Treatment Group
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={outcomesByGroup} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94a3b8" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="#94a3b8" width={90} />
                <Tooltip />
                <Bar dataKey="favorable" fill="#10b981" stackId="a" name="Favorable" radius={[0, 0, 0, 0]} />
                <Bar dataKey="unfavorable" fill="#f43f5e" stackId="a" name="Unfavorable" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Quality Metrics */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Weekly Data Quality Metrics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis domain={[85, 100]} tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="quality" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} name="Quality" />
                <Line type="monotone" dataKey="completeness" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Completeness" />
                <Line type="monotone" dataKey="timeliness" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Timeliness" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reports */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <FileText className="h-4 w-4 text-violet-500" />
              Generated Reports
            </h3>
            <button className="text-xs text-violet-600 hover:text-violet-700 flex items-center gap-1">
              + New Report
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {reports.map((report, i) => (
              <div key={i} className="px-5 py-3.5 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{report.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-400">{report.lastGenerated}</span>
                      <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-600">{report.format}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        report.status === "live"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {report.status}
                    </span>
                    <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-violet-600" title="View">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-blue-600" title="Share">
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-emerald-600" title="Download">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded Dashboard Preview */}
      <div className="bg-slate-900 rounded-xl p-5 text-slate-300">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-slate-700">
            <Eye className="h-5 w-5 text-violet-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white">Embedded BI Integration</h4>
            <p className="text-sm text-slate-400 mt-1">
              Dashboards can be embedded in the RDMS UI or exported to Tableau Server, Power BI Service, or
              shared via secure links. Real-time data refreshes keep reports current.
            </p>
            <div className="flex items-center gap-3 mt-3">
              <button className="px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs hover:bg-violet-700 transition-colors flex items-center gap-1">
                <Eye className="h-3 w-3" /> Embed in Tableau
              </button>
              <button className="px-3 py-1.5 bg-slate-700 text-slate-300 rounded-lg text-xs hover:bg-slate-600 transition-colors flex items-center gap-1">
                <Eye className="h-3 w-3" /> Embed in Power BI
              </button>
              <button className="px-3 py-1.5 bg-slate-700 text-slate-300 rounded-lg text-xs hover:bg-slate-600 transition-colors flex items-center gap-1">
                <Share2 className="h-3 w-3" /> Share Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
