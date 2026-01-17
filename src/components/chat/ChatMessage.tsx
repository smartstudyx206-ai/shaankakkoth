import { Message } from "@/types/chat";
import { User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3 px-4 py-5", isUser ? "bg-transparent" : "bg-chat-ai/50")}>
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
          isUser ? "bg-muted" : "bg-gradient-to-br from-brand to-purple-400"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Zap className="h-3.5 w-3.5 text-brand-foreground" fill="currentColor" />
        )}
      </div>
      <div className="flex flex-col gap-1.5 min-w-0 flex-1 pt-0.5">
        <span className="text-sm font-medium text-foreground">
          {isUser ? "You" : "Faraday"}
        </span>
        <div className="text-sm leading-relaxed text-foreground/85 whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
