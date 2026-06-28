import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Bot,
  Sparkles,
  FileUp,
  Code2,
  BarChart3,
  Download,
  Copy,
  RotateCcw,
  User,
  Paperclip,
  Zap,
  Terminal,
  Table2,
} from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  type?: "text" | "code" | "chart" | "table";
  code?: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I'm your AI research data analyst. I can help you with data cleaning, statistical analysis, visualization, and generating code. You can upload files (CSV, DTA, SAV) and ask me questions in natural language. What would you like to analyze today?",
    type: "text",
    timestamp: new Date(),
  },
];

const examplePrompts = [
  "Summarize the patient demographics dataset and identify outliers",
  "Run a logistic regression on clinical outcomes by treatment group",
  "Generate a box plot of lab results by visit type",
  "Clean missing values in the medication records using MICE imputation",
  "Create a STATA do-file for survival analysis",
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      type: "text",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Message[] = [];

      if (input.toLowerCase().includes("summarize") || input.toLowerCase().includes("describe")) {
        responses.push({
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Here's a summary of the dataset. The data contains 142,847 records across 7 variables. I've detected the following key findings:",
          type: "text",
          timestamp: new Date(),
        });
        responses.push({
          id: Date.now() + 2,
          role: "assistant",
          content: "```python\n# Generated Python Code\nimport pandas as pd\n\ndf = pd.read_csv('clinical_outcomes.csv')\nprint(df.describe())\nprint(f\"\\nMissing values:\\n{df.isnull().sum()}\")\nprint(f\"\\nData types:\\n{df.dtypes}\")\n\n# Outlier detection using IQR\nQ1 = df['bmi'].quantile(0.25)\nQ3 = df['bmi'].quantile(0.75)\nIQR = Q3 - Q1\noutliers = df[(df['bmi'] < Q1 - 1.5*IQR) | (df['bmi'] > Q3 + 1.5*IQR)]\nprint(f\"\\nBMI Outliers detected: {len(outliers)}\")\n```",
          type: "code",
          code: `import pandas as pd\n\ndf = pd.read_csv('clinical_outcomes.csv')\nprint(df.describe())\nprint(f"\\nMissing values:\\n{df.isnull().sum()}")\nprint(f"\\nData types:\\n{df.dtypes}")\n\n# Outlier detection using IQR\nQ1 = df['bmi'].quantile(0.25)\nQ3 = df['bmi'].quantile(0.75)\nIQR = Q3 - Q1\noutliers = df[(df['bmi'] < Q1 - 1.5*IQR) | (df['bmi'] > Q3 + 1.5*IQR)]\nprint(f"\\nBMI Outliers detected: {len(outliers)}")`,
          timestamp: new Date(),
        });
        responses.push({
          id: Date.now() + 3,
          role: "assistant",
          content: "📊 **Summary Statistics Table**",
          type: "table",
          timestamp: new Date(),
        });
      } else if (
        input.toLowerCase().includes("regression") ||
        input.toLowerCase().includes("stata")
      ) {
        responses.push({
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Here's a STATA do-file for logistic regression analysis. This will model clinical outcomes by treatment group, controlling for age and BMI.",
          type: "text",
          timestamp: new Date(),
        });
        responses.push({
          id: Date.now() + 2,
          role: "assistant",
          content: "```stata\n* STATA Do-File: Logistic Regression Analysis\nclear all\nset more off\n\n* Load data\nimport delimited \"clinical_outcomes.csv\", clear\n\n* Data preparation\nencode treatment_group, gen(treatment_num)\nlabel variable treatment_num \"Treatment Group\"\n\n* Descriptive statistics\nsummarize age bmi outcome_score\ntab treatment_group\n\n* Logistic regression\nlogit outcome_score treatment_num age bmi, or\nestimates store model1\n\n* Model diagnostics\nestat gof\nestat classification\npredict predicted_prob, pr\n\n* Marginal effects\nmargins treatment_group, atmeans\nmarginsplot\n\n* Export results\nestimates table model1, star stats(N ll chi2)\n```",
          type: "code",
          code: `* STATA Do-File: Logistic Regression Analysis\nclear all\nset more off\n\nimport delimited "clinical_outcomes.csv", clear\nencode treatment_group, gen(treatment_num)\n\nsummarize age bmi outcome_score\ntab treatment_group\n\nlogit outcome_score treatment_num age bmi, or\nestimates store model1\n\nestat gof\nestat classification\npredict predicted_prob, pr\n\nmargins treatment_group, atmeans\nmarginsplot\n\nestimates table model1, star stats(N ll chi2)`,
          timestamp: new Date(),
        });
      } else if (
        input.toLowerCase().includes("plot") ||
        input.toLowerCase().includes("visualization") ||
        input.toLowerCase().includes("chart")
      ) {
        responses.push({
          id: Date.now() + 1,
          role: "assistant",
          content: "Here's the generated visualization code and chart:",
          type: "text",
          timestamp: new Date(),
        });
        responses.push({
          id: Date.now() + 2,
          role: "assistant",
          content: "```python\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))\n\n# Box plot\nsns.boxplot(data=df, x='visit_type', y='lab_result', ax=ax1)\nax1.set_title('Lab Results by Visit Type')\nax1.set_xlabel('Visit Type')\nax1.set_ylabel('Lab Result')\n\n# Distribution\nsns.histplot(data=df, x='lab_result', hue='visit_type', kde=True, ax=ax2)\nax2.set_title('Distribution of Lab Results')\n\nplt.tight_layout()\nplt.show()\n```",
          type: "code",
          code: `import matplotlib.pyplot as plt\nimport seaborn as sns\n\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))\n\nsns.boxplot(data=df, x='visit_type', y='lab_result', ax=ax1)\nax1.set_title('Lab Results by Visit Type')\n\nsns.histplot(data=df, x='lab_result', hue='visit_type', kde=True, ax=ax2)\nax2.set_title('Distribution of Lab Results')\n\nplt.tight_layout()\nplt.show()`,
          timestamp: new Date(),
        });
        responses.push({
          id: Date.now() + 3,
          role: "assistant",
          content: "📊 **Chart Preview**: Box plot and distribution generated. You can export as PNG or SVG.",
          type: "chart",
          timestamp: new Date(),
        });
      } else if (input.toLowerCase().includes("clean") || input.toLowerCase().includes("missing")) {
        responses.push({
          id: Date.now() + 1,
          role: "assistant",
          content:
            "I've analyzed the missing data patterns and recommend using Multiple Imputation by Chained Equations (MICE). Here's the R code:",
          type: "text",
          timestamp: new Date(),
        });
        responses.push({
          id: Date.now() + 2,
          role: "assistant",
          content: "```r\n# R Code: MICE Imputation\nlibrary(mice)\nlibrary(ggplot2)\n\n# Load data\ndf <- read.csv(\"medication_records.csv\")\n\n# Missing data pattern\nmd.pattern(df)\n\n# Perform MICE imputation\nimp <- mice(df, m = 5, method = \"pmm\", seed = 42)\n\n# Check convergence\nplot(imp)\n\n# Complete the dataset\ncompleted_df <- complete(imp, 1)\n\n# Compare distributions\npar(mfrow = c(1, 2))\nhist(df$dosage, main = \"Before Imputation\")\nhist(completed_df$dosage, main = \"After MICE Imputation\")\n\n# Save cleaned data\nwrite.csv(completed_df, \"medication_records_clean.csv\", row.names = FALSE)\n```",
          type: "code",
          code: `library(mice)\nlibrary(ggplot2)\n\ndf <- read.csv("medication_records.csv")\nmd.pattern(df)\n\nimp <- mice(df, m = 5, method = "pmm", seed = 42)\nplot(imp)\n\ncompleted_df <- complete(imp, 1)\n\npar(mfrow = c(1, 2))\nhist(df$dosage, main = "Before Imputation")\nhist(completed_df$dosage, main = "After MICE Imputation")\n\nwrite.csv(completed_df, "medication_records_clean.csv", row.names = FALSE)`,
          timestamp: new Date(),
        });
      } else {
        responses.push({
          id: Date.now() + 1,
          role: "assistant",
          content:
            "I understand you'd like to analyze this data. Let me help you with that. Could you specify what kind of analysis you need? I can help with:\n\n- 📊 **Descriptive statistics** and data profiling\n- 🔬 **Regression analysis** (linear, logistic, survival)\n- 📈 **Data visualization** (box plots, histograms, scatter plots)\n- 🧹 **Data cleaning** (missing values, outliers, normalization)\n- 📝 **Code generation** (Python, R, STATA, SPSS syntax)\n\nJust describe what you need in natural language!",
          type: "text",
          timestamp: new Date(),
        });
      }

      setMessages((prev) => [...prev, ...responses]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "user",
          content: `📎 Uploaded file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
          type: "text",
          timestamp: new Date(),
        },
        {
          id: Date.now() + 1,
          role: "assistant",
          content: `I've received \`${file.name}\`. I've scanned the file and detected 142,847 rows and 7 columns. The data appears to be clinical research data with patient demographics and outcomes. What analysis would you like to perform?`,
          type: "text",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Chat Analytics</h1>
          <p className="text-slate-500 mt-1">Natural language analytics powered by LLM</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMessages(initialMessages)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white rounded-2xl rounded-tr-md"
                      : msg.type === "code"
                      ? "bg-slate-900 text-slate-100 rounded-2xl rounded-tl-md p-0 overflow-hidden"
                      : msg.type === "chart"
                      ? "bg-white border border-slate-200 rounded-2xl rounded-tl-md"
                      : "bg-slate-100 text-slate-800 rounded-2xl rounded-tl-md"
                  } px-4 py-3`}
                >
                  {msg.type === "code" ? (
                    <div>
                      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <Terminal className="h-3.5 w-3.5 text-slate-400" />
                          <span className="text-xs text-slate-400">
                            {msg.content.startsWith("```python")
                              ? "Python"
                              : msg.content.startsWith("```r")
                              ? "R"
                              : msg.content.startsWith("```stata")
                              ? "STATA"
                              : "Code"}
                          </span>
                        </div>
                        <button
                          onClick={() => copyCode(msg.code || "")}
                          className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                          title="Copy code"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <pre className="p-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {msg.code}
                      </pre>
                    </div>
                  ) : msg.type === "chart" ? (
                    <div className="p-3">
                      <div className="h-40 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="h-10 w-10 text-violet-300 mx-auto mb-2" />
                          <p className="text-sm text-slate-500">{msg.content}</p>
                          <div className="flex items-center justify-center gap-2 mt-3">
                            <button className="px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs hover:bg-violet-700 transition-colors flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              PNG
                            </button>
                            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              SVG
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : msg.type === "table" ? (
                    <div>
                      <p className="text-sm mb-2">{msg.content}</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="text-left py-1.5 pr-3 text-slate-500">Variable</th>
                              <th className="text-right py-1.5 pr-3 text-slate-500">Mean</th>
                              <th className="text-right py-1.5 pr-3 text-slate-500">Std</th>
                              <th className="text-right py-1.5 pr-3 text-slate-500">Min</th>
                              <th className="text-right py-1.5 text-slate-500">Max</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ["age", "45.2", "12.8", "18", "92"],
                              ["bmi", "27.3", "5.4", "14.2", "52.1"],
                              ["lab_result", "120.5", "23.1", "45.0", "210.0"],
                              ["outcome_score", "7.8", "3.2", "0", "15"],
                            ].map((row, i) => (
                              <tr key={i} className="border-b border-slate-100">
                                <td className="py-1.5 pr-3 font-medium text-slate-700">{row[0]}</td>
                                <td className="py-1.5 pr-3 text-right">{row[1]}</td>
                                <td className="py-1.5 pr-3 text-right">{row[2]}</td>
                                <td className="py-1.5 pr-3 text-right">{row[3]}</td>
                                <td className="py-1.5 text-right">{row[4]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="h-4 w-4 text-slate-500" />
                  </div>
                )}
              </div>
            ))}
            {isProcessing && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-slate-100 rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-4">
            {selectedFile && (
              <div className="flex items-center gap-2 mb-3 px-1">
                <Paperclip className="h-3.5 w-3.5 text-violet-500" />
                <span className="text-xs text-slate-600">{selectedFile}</span>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-xs text-slate-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="flex items-end gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-lg border border-slate-200 text-slate-400 hover:text-violet-600 hover:border-violet-300 transition-colors flex-shrink-0"
                title="Upload file"
              >
                <FileUp className="h-5 w-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".csv,.dta,.sav,.xlsx,.json"
              />
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask anything about your data... (e.g., 'Summarize the clinical outcomes dataset')"
                  rows={2}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isProcessing}
                className="p-2.5 rounded-lg bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Example prompts */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sticky top-4">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-violet-500" />
              <h3 className="font-semibold text-slate-900 text-sm">Example Prompts</h3>
            </div>
            <div className="space-y-2">
              {examplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(prompt);
                  }}
                  className="w-full text-left text-xs text-slate-600 hover:text-violet-700 hover:bg-violet-50 p-2.5 rounded-lg transition-colors leading-relaxed"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-medium text-slate-500 uppercase mb-3">Capabilities</h4>
              <div className="space-y-2">
                {[
                  { icon: MessageSquare, label: "Natural language queries", color: "text-blue-500" },
                  { icon: Code2, label: "Code generation (Py/R/STATA/SPSS)", color: "text-violet-500" },
                  { icon: BarChart3, label: "Visualization creation", color: "text-emerald-500" },
                  { icon: Table2, label: "Data cleaning automation", color: "text-amber-500" },
                  { icon: Zap, label: "Statistical analysis", color: "text-red-500" },
                ].map((cap, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <cap.icon className={`h-3.5 w-3.5 ${cap.color}`} />
                    {cap.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
