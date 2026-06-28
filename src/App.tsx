import { useState } from "react";
import Sidebar, { type Page } from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import DataCleaning from "./components/DataCleaning";
import AnalysisPipelines from "./components/AnalysisPipelines";
import Reporting from "./components/Reporting";
import REDCapIntegration from "./components/REDCapIntegration";
import Connectors from "./components/Connectors";
import AIChat from "./components/AIChat";
import Compliance from "./components/Compliance";

function PageRenderer({ page }: { page: Page }) {
  switch (page) {
    case "dashboard":
      return <Dashboard />;
    case "data-cleaning":
      return <DataCleaning />;
    case "analysis":
      return <AnalysisPipelines />;
    case "reporting":
      return <Reporting />;
    case "redcap":
      return <REDCapIntegration />;
    case "connectors":
      return <Connectors />;
    case "ai-chat":
      return <AIChat />;
    case "compliance":
      return <Compliance />;
    default:
      return <Dashboard />;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 overflow-y-auto p-6">
        <PageRenderer page={currentPage} />
      </main>
    </div>
  );
}
