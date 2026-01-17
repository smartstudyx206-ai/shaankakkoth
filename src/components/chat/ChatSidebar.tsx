import { useState } from "react";
import { Plus, MessageSquare, Search, MoreHorizontal, Trash2, Edit2 } from "lucide-react";
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
    <div className="flex h-full w-64 flex-col border-r bg-sidebar">
      <div className="flex items-center justify-between p-4 border-b">
        <FaradayLogo size="sm" />
      </div>

      <div className="p-3">
        <Button
          onClick={onNewConversation}
          className="w-full justify-start gap-2 bg-brand hover:bg-brand/90 text-brand-foreground"
        >
          <Plus className="h-4 w-4" />
          New chat
        </Button>
      </div>

      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="pl-8 h-9 bg-sidebar-accent"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-2">
        {Object.entries(groupedConversations).map(([group, convs]) => (
          <div key={group} className="mb-4">
            <h3 className="mb-1 px-2 text-xs font-medium text-muted-foreground">
              {group}
            </h3>
            {convs.map((conv) => (
              <div
                key={conv.id}
                className={cn(
                  "group flex items-center gap-2 rounded-lg px-2 py-2 cursor-pointer transition-colors",
                  activeConversationId === conv.id
                    ? "bg-sidebar-accent"
                    : "hover:bg-sidebar-accent/50"
                )}
                onClick={() => onSelectConversation(conv.id)}
              >
                <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate text-sm">{conv.title}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conv.id);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
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
