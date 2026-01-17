import { Zap } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 px-4 py-5 bg-chat-ai/50">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-brand to-purple-400">
        <Zap className="h-3.5 w-3.5 text-brand-foreground" fill="currentColor" />
      </div>
      <div className="flex flex-col gap-1.5 pt-0.5">
        <span className="text-sm font-medium text-foreground">Faraday</span>
        <div className="flex items-center gap-1 py-1">
          <span
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-typing-dot"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-typing-dot"
            style={{ animationDelay: "200ms" }}
          />
          <span
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-typing-dot"
            style={{ animationDelay: "400ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
