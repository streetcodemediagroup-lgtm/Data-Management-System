import {
  TrendingUp,
  Database,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Users,
  ArrowUp,
  ArrowDown,
  Clock,
  Zap,
} from "lucide-react";
import {
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

const pipelineData = [
  { name: "Mon", completed: 12, failed: 2 },
  { name: "Tue", completed: 19, failed: 1 },
  { name: "Wed", completed: 15, failed: 3 },
  { name: "Thu", completed: 22, failed: 0 },
  { name: "Fri", completed: 18, failed: 1 },
  { name: "Sat", completed: 8, failed: 0 },
  { name: "Sun", completed: 5, failed: 0 },
];

const qualityData = [
  { name: "Week 1", score: 94 },
  { name: "Week 2", score: 96 },
  { name: "Week 3", score: 93 },
  { name: "Week 4", score: 97 },
  { name: "Week 5", score: 95 },
  { name: "Week 6", score: 98 },
];

const redcapImports = [
  { name: "Survey A", records: 2450 },
  { name: "Survey B", records: 1820 },
  { name: "Survey C", records: 3100 },
  { name: "Survey D", records: 890 },
  { name: "Survey E", records: 1560 },
];

const stats = [
  {
    label: "Total Records",
    value: "142,847",
    change: "+12.5%",
    up: true,
    icon: Database,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Data Quality Score",
    value: "97.2%",
    change: "+2.1%",
    up: true,
    icon: CheckCircle2,
    color: "from-emerald-500 to-teal-500",
  },
  {
    label: "Active Pipelines",
    value: "24",
    change: "+3",
    up: true,
    icon: Activity,
    color: "from-violet-500 to-purple-500",
  },
  {
    label: "Anomalies Detected",
    value: "7",
    change: "-4",
    up: false,
    icon: AlertTriangle,
    color: "from-amber-500 to-orange-500",
  },
];

const recentActivity = [
  { icon: Zap, text: "Pipeline 'Patient Demographics' completed successfully", time: "2 min ago", color: "text-emerald-400" },
  { icon: AlertTriangle, text: "Data drift detected in 'Lab Results' dataset", time: "15 min ago", color: "text-amber-400" },
  { icon: Database, text: "REDCap survey 'Baseline Assessment' imported", time: "32 min ago", color: "text-blue-400" },
  { icon: CheckCircle2, text: "Quality check passed for 'Clinical Outcomes'", time: "1 hour ago", color: "text-emerald-400" },
  { icon: TrendingUp, text: "Weekly trend report generated and shared", time: "2 hours ago", color: "text-violet-400" },
  { icon: Users, text: "3 new users added to 'Biostatistics' team", time: "3 hours ago", color: "text-cyan-400" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Research Data Management System overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-500">Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.up ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {stat.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-3">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Pipeline Activity (7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="completed" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Completed" />
                <Bar dataKey="failed" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Quality Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Data Quality Score Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={qualityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis domain={[90, 100]} tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  fill="url(#qualityGradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="qualityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* REDCap Imports */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">REDCap Survey Records</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={redcapImports} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="#94a3b8" width={80} />
                <Tooltip />
                <Bar dataKey="records" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <activity.icon className={`h-4 w-4 ${activity.color} mt-0.5 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">{activity.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
