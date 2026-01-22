import { useMemo, useState } from "react";
import { Monitor, Tablet, Smartphone, ExternalLink, RotateCcw, Code, Eye, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ProjectFile } from "@/hooks/useLocalProjectFiles";
import FileTree from "@/components/canvas/code/FileTree";
import MonacoCodeEditor from "@/components/canvas/code/MonacoCodeEditor";
import PublishMenu from "@/components/canvas/publish/PublishMenu";

type ViewMode = "preview" | "code" | "cloud";
type DeviceMode = "desktop" | "tablet" | "mobile";

const CanvasPanel = ({
  files,
  activePath,
  activeFile,
  onSelectFile,
  onChangeActiveContent,
}: {
  files: ProjectFile[];
  activePath: string;
  activeFile: ProjectFile;
  onSelectFile: (path: string) => void;
  onChangeActiveContent: (next: string) => void;
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  const isArduinoActive = useMemo(() => {
    return activeFile.language === "arduino" || activeFile.path.toLowerCase().endsWith(".ino");
  }, [activeFile.language, activeFile.path]);

  return (
    <div className="flex h-full flex-col bg-canvas-bg">
      {/* Top Tabs Bar - Like Lovable's Preview/Code/Cloud tabs */}
      <div className="flex items-center justify-between border-b border-border px-1 bg-background">
        <div className="flex items-center">
          <button
            onClick={() => setViewMode("preview")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              viewMode === "preview"
                ? "border-brand text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button
            onClick={() => setViewMode("code")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              viewMode === "code"
                ? "border-brand text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Code className="h-4 w-4" />
            Code
          </button>
          <button
            onClick={() => setViewMode("cloud")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              viewMode === "cloud"
                ? "border-brand text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Database className="h-4 w-4" />
            Cloud
          </button>
        </div>

        <div className="flex items-center gap-1 pr-2">
          <PublishMenu isArduino={isArduinoActive} getArduinoCode={() => activeFile.content} />
        </div>
      </div>

      {/* Secondary Toolbar - Device switcher & actions (only for Preview mode) */}
      {viewMode === "preview" && (
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 bg-background/50">
          <div className="flex items-center gap-1">
            <div className="flex items-center rounded-md border border-border p-0.5 bg-secondary">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-6 w-6", deviceMode === "desktop" && "bg-accent")}
                    onClick={() => setDeviceMode("desktop")}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Desktop</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-6 w-6", deviceMode === "tablet" && "bg-accent")}
                    onClick={() => setDeviceMode("tablet")}
                  >
                    <Tablet className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Tablet</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-6 w-6", deviceMode === "mobile" && "bg-accent")}
                    onClick={() => setDeviceMode("mobile")}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Mobile</TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open in new tab</TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}

      {/* Canvas Content */}
      <div className="flex-1 overflow-auto bg-canvas-bg">
        {viewMode === "preview" && (
          <div className="h-full p-4">
            <div
              className="mx-auto h-full rounded-lg border border-border bg-background shadow-2xl shadow-black/20 transition-all duration-300 overflow-hidden"
              style={{ maxWidth: deviceWidths[deviceMode] }}
            >
              <div className="flex h-full items-center justify-center p-8">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/20 to-purple-500/20 border border-brand/20">
                    <Eye className="h-8 w-8 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Preview Area</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Connect your Python backend to render live previews of your generated content here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === "code" && (
          <div className="h-full flex">
            {/* File tree */}
            <aside className="w-[260px] shrink-0 border-r border-code-border bg-code-panel">
              <div className="h-10 flex items-center px-3 border-b border-code-border">
                <span className="text-xs font-medium text-muted-foreground">Files</span>
              </div>
              <FileTree files={files} activePath={activePath} onSelect={onSelectFile} />
            </aside>

            {/* Editor */}
            <div className="flex-1 min-w-0 flex flex-col bg-code-bg">
              <div className="h-10 flex items-center justify-between px-3 border-b border-code-border bg-code-panel">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs text-muted-foreground truncate">{activeFile.path}</span>
                  {isArduinoActive && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground border border-border">
                      Arduino
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground hover:text-foreground" disabled>
                    Run
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <MonacoCodeEditor
                  value={activeFile.content}
                  language={activeFile.language}
                  onChange={onChangeActiveContent}
                />
              </div>
            </div>
          </div>
        )}

        {viewMode === "cloud" && (
          <div className="h-full flex flex-col">
            {/* Cloud Sidebar Tabs */}
            <div className="flex border-b border-border bg-background">
              <button className="px-4 py-2.5 text-sm font-medium text-foreground border-b-2 border-brand -mb-px">
                Database
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent -mb-px">
                Auth
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent -mb-px">
                Storage
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent -mb-px">
                Functions
              </button>
            </div>
            {/* Cloud Content */}
            <div className="flex-1 flex items-center justify-center p-8 bg-canvas-bg">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20">
                  <Database className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Cloud Connected</h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-4">
                  Database, authentication, storage, and functions are ready to use.
                </p>
                <Button variant="outline" size="sm" className="gap-2">
                  <Database className="h-4 w-4" />
                  View Tables
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasPanel;
