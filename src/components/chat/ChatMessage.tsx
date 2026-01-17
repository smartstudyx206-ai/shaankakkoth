import { Message } from "@/types/chat";
import { User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3 px-4 py-4", isUser ? "bg-transparent" : "bg-chat-ai")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          isUser ? "bg-muted" : "bg-brand"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Zap className="h-4 w-4 text-brand-foreground" fill="currentColor" />
        )}
      </div>
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <span className="text-sm font-medium">
          {isUser ? "You" : "Faraday"}
        </span>
        <div className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
