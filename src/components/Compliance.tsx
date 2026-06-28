import {
  Lock,
  Eye,
  History,
  CheckCircle2,
  Download,
  Server,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const auditData = [
  { hour: "00:00", accesses: 12, alerts: 0 },
  { hour: "04:00", accesses: 5, alerts: 0 },
  { hour: "08:00", accesses: 45, alerts: 1 },
  { hour: "12:00", accesses: 78, alerts: 2 },
  { hour: "16:00", accesses: 62, alerts: 1 },
  { hour: "20:00", accesses: 23, alerts: 0 },
];

const complianceItems = [
  {
    standard: "HIPAA",
    status: "compliant",
    description: "Health Insurance Portability and Accountability Act",
    lastAudit: "2026-03-15",
    controls: ["Encryption at rest (AES-256)", "TLS 1.3 in transit", "Access controls", "Audit logging"],
  },
  {
    standard: "GDPR",
    status: "compliant",
    description: "General Data Protection Regulation",
    lastAudit: "2026-03-10",
    controls: ["Data minimization", "Right to erasure", "Data portability", "Consent management"],
  },
  {
    standard: "FAIR Principles",
    status: "compliant",
    description: "Findable, Accessible, Interoperable, Reusable",
    lastAudit: "2026-03-18",
    controls: ["Persistent identifiers", "Standardized metadata", "Data dictionaries", "Open formats"],
  },
  {
    standard: "21 CFR Part 11",
    status: "review",
    description: "FDA Electronic Records & Signatures",
    lastAudit: "2026-02-28",
    controls: ["Electronic signatures", "Audit trails", "System validation", "Record retention"],
  },
];

const accessLog = [
  { user: "j.smith@health.org", action: "Data export", resource: "Clinical Outcomes", time: "2 min ago", ip: "10.42.1.15" },
  { user: "a.jones@health.org", action: "Pipeline execution", resource: "Lab Results ETL", time: "8 min ago", ip: "10.42.1.22" },
  { user: "m.wilson@health.org", action: "REDCap sync", resource: "Baseline Survey", time: "15 min ago", ip: "10.42.1.8" },
  { user: "admin@health.org", action: "Permission change", resource: "User roles", time: "32 min ago", ip: "10.42.0.1" },
  { user: "j.smith@health.org", action: "File download", resource: "analysis.dta", time: "45 min ago", ip: "10.42.1.15" },
];

const backupStatus = [
  { name: "Production DB", frequency: "Hourly", lastBackup: "3 min ago", retention: "30 days", status: "success" },
  { name: "Analytics DB", frequency: "Daily", lastBackup: "4 hours ago", retention: "90 days", status: "success" },
  { name: "File Storage", frequency: "Continuous", lastBackup: "1 min ago", retention: "1 year", status: "success" },
  { name: "Configuration", frequency: "Daily", lastBackup: "12 hours ago", retention: "1 year", status: "success" },
];

export default function Compliance() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Security & Compliance</h1>
          <p className="text-slate-500 mt-1">HIPAA, GDPR, FAIR compliance with full auditability</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors">
          <Download className="h-4 w-4" />
          Export Compliance Report
        </button>
      </div>

      {/* Security Status Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-100">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-medium text-emerald-800">All Systems Compliant</h3>
          <p className="text-sm text-emerald-600">Last comprehensive audit: March 20, 2026. No critical findings.</p>
        </div>
      </div>

      {/* Compliance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceItems.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-900 text-sm">{item.standard}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  item.status === "compliant"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {item.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">{item.description}</p>
            <div className="space-y-1.5">
              {item.controls.map((control, j) => (
                <div key={j} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                  {control}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Last audit: {item.lastAudit}
            </p>
          </div>
        ))}
      </div>

      {/* Audit Log Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Eye className="h-4 w-4 text-violet-500" />
          System Access Activity (24h)
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={auditData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="accesses"
                stroke="#8b5cf6"
                fill="url(#auditGradient)"
                strokeWidth={2}
                name="Access Events"
              />
              <Area
                type="monotone"
                dataKey="alerts"
                stroke="#f43f5e"
                fill="url(#alertGradient)"
                strokeWidth={2}
                name="Security Alerts"
              />
              <defs>
                <linearGradient id="auditGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Access Log */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <History className="h-4 w-4 text-violet-500" />
              Access Audit Log
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-2">User</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-2">Action</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {accessLog.map((entry, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-2.5 text-xs text-slate-600">{entry.user}</td>
                    <td className="px-4 py-2.5">
                      <div className="text-xs">
                        <span className="font-medium text-slate-700">{entry.action}</span>
                        <span className="text-slate-400 ml-1">· {entry.resource}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-400">{entry.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Backup Status */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Server className="h-4 w-4 text-violet-500" />
              3-2-1 Backup Status
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-2">System</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-2">Frequency</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-2">Last</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {backupStatus.map((backup, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-2.5 text-xs font-medium text-slate-700">{backup.name}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">{backup.frequency}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">{backup.lastBackup}</td>
                    <td className="px-4 py-2.5">
                      <span className="text-xs text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        {backup.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Data Retention & Privacy */}
      <div className="bg-slate-900 rounded-xl p-5 text-slate-300">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-slate-700">
            <Lock className="h-5 w-5 text-violet-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white">Data Retention & Privacy</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="space-y-1">
                <p className="text-sm text-white font-medium">Encryption</p>
                <p className="text-xs text-slate-400">AES-256 at rest · TLS 1.3 in transit · Key rotation every 90 days</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white font-medium">Access Control</p>
                <p className="text-xs text-slate-400">RBAC · MFA required · IP whitelisting · Session timeout</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white font-medium">Data Rights</p>
                <p className="text-xs text-slate-400">Right to access · Right to erasure · Data portability · Consent tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
