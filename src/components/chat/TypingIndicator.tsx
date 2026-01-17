import { Zap } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 px-4 py-4 bg-chat-ai">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand">
        <Zap className="h-4 w-4 text-brand-foreground" fill="currentColor" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Faraday</span>
        <div className="flex items-center gap-1 py-2">
          <span
            className="h-2 w-2 rounded-full bg-muted-foreground animate-typing-dot"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="h-2 w-2 rounded-full bg-muted-foreground animate-typing-dot"
            style={{ animationDelay: "200ms" }}
          />
          <span
            className="h-2 w-2 rounded-full bg-muted-foreground animate-typing-dot"
            style={{ animationDelay: "400ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
