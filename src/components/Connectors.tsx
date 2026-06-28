import { useState } from "react";
import {
  Plug,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Settings,
  Download,
  Upload,
} from "lucide-react";

const tools = [
  {
    id: "stata",
    name: "STATA",
    icon: "📊",
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    status: "connected",
    methods: [
      { name: "Automation Object", type: "Windows COM", status: "active" },
      { name: "PyStata Integration", type: "Python Bridge", status: "active" },
      { name: "Command-line Scripting", type: "CLI", status: "active" },
    ],
    formats: [".dta", ".csv", ".xlsx"],
    description: "Advanced statistical analysis with automation and Python bridge support",
  },
  {
    id: "spss",
    name: "SPSS",
    icon: "📈",
    color: "from-teal-500 to-teal-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    status: "connected",
    methods: [
      { name: "Syntax Scripts", type: "SPSS Syntax", status: "active" },
      { name: "Python Programmability", type: "Python Extension", status: "active" },
      { name: "Jython Scripting", type: "Java Bridge", status: "inactive" },
    ],
    formats: [".sav", ".csv", ".zsav"],
    description: "Statistical analysis via syntax scripts and Python/R programmability",
  },
  {
    id: "tableau",
    name: "Tableau",
    icon: "📉",
    color: "from-cyan-500 to-cyan-700",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    status: "connected",
    methods: [
      { name: "REST API", type: "HTTP", status: "active" },
      { name: "Web Data Connector", type: "WDC", status: "active" },
      { name: "Connector SDK", type: "Custom", status: "active" },
    ],
    formats: [".csv", ".hyper", ".tde"],
    description: "Interactive dashboards with REST API automation and embedded analytics",
  },
  {
    id: "powerbi",
    name: "Power BI",
    icon: "📊",
    color: "from-amber-500 to-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    status: "connected",
    methods: [
      { name: "REST API", type: "HTTP", status: "active" },
      { name: "DirectQuery", type: "SQL Bridge", status: "active" },
      { name: "Dataflows", type: "ETL", status: "active" },
    ],
    formats: [".csv", ".pbix", ".xlsx"],
    description: "Business intelligence with DirectQuery, Dataflows, and embedded reports",
  },
];

const recentTransfers = [
  { tool: "STATA", file: "analysis_results.dta", direction: "export", size: "2.4 MB", time: "5 min ago", status: "success" },
  { tool: "Tableau", file: "dashboard_data.hyper", direction: "export", size: "8.1 MB", time: "12 min ago", status: "success" },
  { tool: "SPSS", file: "survey_responses.sav", direction: "import", size: "1.7 MB", time: "28 min ago", status: "success" },
  { tool: "Power BI", file: "metrics_export.csv", direction: "export", size: "0.5 MB", time: "45 min ago", status: "error" },
];

export default function Connectors() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tool Connectors</h1>
          <p className="text-slate-500 mt-1">STATA, SPSS, Tableau & Power BI integration</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors">
          <Settings className="h-4 w-4" />
          Configure
        </button>
      </div>

      {/* Tool Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`bg-white rounded-xl border shadow-sm transition-all cursor-pointer ${
              selectedTool === tool.id
                ? "border-violet-400 ring-2 ring-violet-100"
                : "border-slate-200 hover:border-slate-300"
            }`}
            onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl shadow-lg`}>
                    <span role="img">{tool.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{tool.name}</h3>
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                      <CheckCircle2 className="h-3 w-3" /> {tool.status}
                    </span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${tool.bgColor} border ${tool.borderColor} text-slate-700`}>
                  <Plug className="h-3 w-3 inline mr-1" />
                  Active
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-4">{tool.description}</p>

              {/* Supported Formats */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-slate-400">Formats:</span>
                {tool.formats.map((fmt) => (
                  <span key={fmt} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-mono">
                    {fmt}
                  </span>
                ))}
              </div>

              {/* Methods */}
              {selectedTool === tool.id && (
                <div className="border-t border-slate-100 pt-4 mt-2 space-y-2">
                  <span className="text-xs font-medium text-slate-500 uppercase">Integration Methods</span>
                  {tool.methods.map((method, j) => (
                    <div key={j} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-slate-700">{method.name}</span>
                        <span className="text-xs text-slate-400 ml-2">({method.type})</span>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          method.status === "active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {method.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* File Transfer History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-violet-500" />
            Recent Data Transfers
          </h3>
          <button className="text-xs text-violet-600 hover:text-violet-700 flex items-center gap-1">
            View All <ExternalLink className="h-3 w-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Tool</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">File</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Direction</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Size</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Time</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransfers.map((transfer, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-5 py-3 text-sm font-medium text-slate-900">{transfer.tool}</td>
                  <td className="px-5 py-3 text-sm text-slate-600 font-mono">{transfer.file}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                        transfer.direction === "export"
                          ? "bg-violet-50 text-violet-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {transfer.direction === "export" ? (
                        <Upload className="h-3 w-3" />
                      ) : (
                        <Download className="h-3 w-3" />
                      )}
                      {transfer.direction}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">{transfer.size}</td>
                  <td className="px-5 py-3 text-sm text-slate-500">{transfer.time}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        transfer.status === "success"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {transfer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
