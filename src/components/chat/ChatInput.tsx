import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Send, Paperclip, Image, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const ChatInput = ({ onSendMessage, isLoading = false, placeholder = "Ask Faraday anything..." }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border bg-chat-input px-4 py-4">
      <div className="relative flex items-end gap-2 rounded-xl border border-border bg-secondary/50 p-2 focus-within:ring-1 focus-within:ring-brand/30 focus-within:border-brand/40 transition-all">
        <div className="flex items-center gap-0.5 pl-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent">
                <Paperclip className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Attach file</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent">
                <Image className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add image</TooltipContent>
          </Tooltip>
        </div>
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          className="flex-1 resize-none bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
        />
        
        <div className="flex items-center gap-0.5 pr-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent">
                <Sparkles className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Enhance prompt</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleSubmit}
                disabled={!message.trim() || isLoading}
                size="icon"
                className="h-8 w-8 bg-brand hover:bg-brand/90 text-brand-foreground disabled:opacity-40 disabled:bg-muted"
              >
                <Send className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Faraday can make mistakes. Consider checking important information.
      </p>
    </div>
  );
};

export default ChatInput;
