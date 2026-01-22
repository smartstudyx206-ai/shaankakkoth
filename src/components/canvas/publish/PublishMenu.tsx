import { ChevronDown, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export default function PublishMenu({
  isArduino,
  getArduinoCode,
}: {
  isArduino: boolean;
  getArduinoCode: () => string;
}) {
  const { toast } = useToast();

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: label });
    } catch {
      toast({ title: "Copy failed", description: "Your browser blocked clipboard access." });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="h-7 gap-1.5 bg-success hover:bg-success/90 text-primary-foreground font-medium">
          Publish
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem disabled>Publish web app</DropdownMenuItem>
        <DropdownMenuSeparator />
        {isArduino && (
          <DropdownMenuItem onClick={() => copy(getArduinoCode(), "Arduino sketch copied")}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy Arduino code
          </DropdownMenuItem>
        )}
        {!isArduino && <DropdownMenuItem disabled>Copy Arduino code</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
