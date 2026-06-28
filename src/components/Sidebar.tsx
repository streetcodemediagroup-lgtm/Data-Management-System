import {
  LayoutDashboard,
  Database,
  BarChart3,
  Workflow,
  MessageSquare,
  Shield,
  Plug,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type Page =
  | "dashboard"
  | "data-cleaning"
  | "analysis"
  | "reporting"
  | "redcap"
  | "connectors"
  | "ai-chat"
  | "compliance";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "data-cleaning", label: "Data Cleaning & Monitoring", icon: Database },
  { id: "analysis", label: "Analysis Pipelines", icon: Workflow },
  { id: "reporting", label: "Trending & Reporting", icon: TrendingUp },
  { id: "redcap", label: "REDCap Integration", icon: BarChart3 },
  { id: "connectors", label: "Tool Connectors", icon: Plug },
  { id: "ai-chat", label: "AI Chat Analytics", icon: MessageSquare },
  { id: "compliance", label: "Security & Compliance", icon: Shield },
];

export default function Sidebar({
  currentPage,
  onNavigate,
  collapsed,
  onToggle,
}: SidebarProps) {
  return (
    <aside
      className={`flex flex-col bg-slate-900 text-slate-300 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Database className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-white text-sm">RDMS</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Database className="h-4 w-4 text-white" />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-slate-700/50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={onToggle}
          className="mx-auto mt-3 p-1 rounded-md hover:bg-slate-700/50 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              currentPage === item.id
                ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
            } ${collapsed ? "justify-center" : ""}`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="h-4.5 w-4.5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-700/50">
        <button
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Settings className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}
