import { useState } from "react";
import { Monitor, Tablet, Smartphone, ExternalLink, RotateCcw, Code, Eye, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type ViewMode = "preview" | "code";
type DeviceMode = "desktop" | "tablet" | "mobile";

const CanvasPanel = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <div className="flex h-full flex-col bg-canvas-bg">
      {/* Canvas Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2 bg-background">
        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
            <TabsList className="h-8 bg-secondary p-0.5">
              <TabsTrigger value="preview" className="h-7 gap-1.5 px-3 text-xs data-[state=active]:bg-accent">
                <Eye className="h-3.5 w-3.5" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="h-7 gap-1.5 px-3 text-xs data-[state=active]:bg-accent">
                <Code className="h-3.5 w-3.5" />
                Code
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

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
                  <Monitor className="h-3 w-3" />
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
                  <Tablet className="h-3 w-3" />
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
                  <Smartphone className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mobile</TooltipContent>
            </Tooltip>
          </div>

          <div className="w-px h-5 bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refresh</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open in new tab</TooltipContent>
          </Tooltip>

          <Button size="sm" className="h-7 gap-1.5 ml-2 bg-success hover:bg-success/90 text-white">
            <Play className="h-3 w-3" fill="currentColor" />
            Publish
          </Button>
        </div>
      </div>

      {/* Canvas Content */}
      <div className="flex-1 overflow-auto p-4 bg-canvas-bg">
        <div
          className="mx-auto h-full rounded-lg border border-border bg-background shadow-2xl shadow-black/20 transition-all duration-300 overflow-hidden"
          style={{ maxWidth: deviceWidths[deviceMode] }}
        >
          {viewMode === "preview" ? (
            <div className="flex h-full items-center justify-center p-8">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                  <Eye className="h-7 w-7 text-muted-foreground" />
                </div>
                <h3 className="text-base font-medium mb-2 text-foreground">Preview Area</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Connect your Python backend to render live previews of your generated content.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full p-4 font-mono text-sm bg-[#0d1117]">
              <div className="text-[#8b949e]">
                <span className="text-[#ff7b72]">def</span>{" "}
                <span className="text-[#d2a8ff]">hello_world</span>():
                <br />
                {"    "}<span className="text-[#79c0ff]">print</span>(
                <span className="text-[#a5d6ff]">"Hello from Faraday!"</span>)
                <br />
                {"    "}<span className="text-[#ff7b72]">return</span>{" "}
                <span className="text-[#a5d6ff]">"Ready to build"</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CanvasPanel;
