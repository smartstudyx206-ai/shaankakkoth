import { useState } from "react";
import { Plus, MessageSquare, Search, MoreHorizontal, Trash2, Edit2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Conversation } from "@/types/chat";
import { cn } from "@/lib/utils";
import FaradayLogo from "./FaradayLogo";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

const ChatSidebar = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedConversations = filteredConversations.reduce((acc, conv) => {
    const today = new Date();
    const convDate = new Date(conv.updatedAt);
    const diffDays = Math.floor((today.getTime() - convDate.getTime()) / (1000 * 60 * 60 * 24));

    let group = "Older";
    if (diffDays === 0) group = "Today";
    else if (diffDays === 1) group = "Yesterday";
    else if (diffDays <= 7) group = "Previous 7 Days";
    else if (diffDays <= 30) group = "Previous 30 Days";

    if (!acc[group]) acc[group] = [];
    acc[group].push(conv);
    return acc;
  }, {} as Record<string, Conversation[]>);

  return (
    <div className="flex h-full w-[260px] flex-col border-r border-sidebar-border bg-sidebar">
      {/* Header with Logo */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-sidebar-border">
        <FaradayLogo size="sm" />
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* New Chat Button */}
      <div className="p-2">
        <Button
          onClick={onNewConversation}
          variant="ghost"
          className="w-full justify-start gap-2 h-9 text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent border border-sidebar-border"
        >
          <Plus className="h-4 w-4" />
          New chat
        </Button>
      </div>

      {/* Search */}
      <div className="px-2 pb-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="pl-8 h-8 text-sm bg-sidebar-accent border-sidebar-border placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1 px-2 scrollbar-thin">
        {Object.entries(groupedConversations).map(([group, convs]) => (
          <div key={group} className="mb-3">
            <h3 className="mb-1 px-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              {group}
            </h3>
            {convs.map((conv) => (
              <div
                key={conv.id}
                className={cn(
                  "group flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer transition-colors",
                  activeConversationId === conv.id
                    ? "bg-sidebar-accent text-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                )}
                onClick={() => onSelectConversation(conv.id)}
              >
                <MessageSquare className="h-4 w-4 shrink-0 opacity-60" />
                <span className="flex-1 truncate text-sm">{conv.title}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-sidebar-accent"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem>
                      <Edit2 className="mr-2 h-3.5 w-3.5" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conv.id);
                      }}
                    >
                      <Trash2 className="mr-2 h-3.5 w-3.5" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
