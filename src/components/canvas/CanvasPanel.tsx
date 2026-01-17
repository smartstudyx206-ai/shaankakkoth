import { useState } from "react";
import { Monitor, Tablet, Smartphone, ExternalLink, RotateCcw, Code, Eye } from "lucide-react";
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
      <div className="flex items-center justify-between border-b px-4 py-2">
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
          <TabsList className="h-8">
            <TabsTrigger value="preview" className="h-7 gap-1.5 px-3 text-xs">
              <Eye className="h-3.5 w-3.5" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="h-7 gap-1.5 px-3 text-xs">
              <Code className="h-3.5 w-3.5" />
              Code
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-1">
          <div className="flex items-center rounded-lg border p-0.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-7 w-7", deviceMode === "desktop" && "bg-accent")}
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
                  className={cn("h-7 w-7", deviceMode === "tablet" && "bg-accent")}
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
                  className={cn("h-7 w-7", deviceMode === "mobile" && "bg-accent")}
                  onClick={() => setDeviceMode("mobile")}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mobile</TooltipContent>
            </Tooltip>
          </div>

          <div className="w-px h-6 bg-border mx-1" />

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
        </div>
      </div>

      {/* Canvas Content */}
      <div className="flex-1 overflow-auto p-4">
        <div
          className="mx-auto h-full rounded-lg border bg-background shadow-sm transition-all duration-300"
          style={{ maxWidth: deviceWidths[deviceMode] }}
        >
          {viewMode === "preview" ? (
            <div className="flex h-full items-center justify-center p-8">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Eye className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Preview Area</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  This is where your generated content will appear. Connect your Python backend to render live previews.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full p-4 font-mono text-sm">
              <div className="rounded-lg bg-muted/50 p-4">
                <pre className="text-muted-foreground">
{`// Your generated code will appear here
// Connect your Python backend to display live code

def hello_world():
    print("Hello from Faraday!")
    return "Ready to build amazing things"`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CanvasPanel;
