import { Zap, Code, Lightbulb, FileText, Palette } from "lucide-react";

interface WelcomeScreenProps {
  onSuggestionClick: (message: string) => void;
}

const suggestions = [
  {
    icon: Code,
    title: "Build something",
    description: "Create apps and features",
    prompt: "Help me build a new feature",
  },
  {
    icon: Lightbulb,
    title: "Brainstorm ideas",
    description: "Generate creative solutions",
    prompt: "Help me brainstorm ideas for a new project",
  },
  {
    icon: FileText,
    title: "Write content",
    description: "Create docs and copy",
    prompt: "Help me write documentation",
  },
  {
    icon: Palette,
    title: "Design UI",
    description: "Create beautiful interfaces",
    prompt: "Help me design a user interface",
  },
];

const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
      <div className="flex items-center justify-center mb-8">
        <div className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-purple-400 p-4 shadow-lg shadow-brand/20">
          <Zap className="h-10 w-10 text-brand-foreground" fill="currentColor" />
        </div>
      </div>
      
      <h1 className="text-2xl font-semibold mb-2 text-foreground">What can I help you build?</h1>
      <p className="text-muted-foreground text-center mb-10 max-w-md text-sm">
        Faraday is your AI assistant that's better than the rest. Start a conversation below.
      </p>

      <div className="grid grid-cols-2 gap-2 w-full max-w-md">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.prompt)}
            className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:border-accent transition-all text-left group"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary group-hover:bg-brand/10 transition-colors">
              <suggestion.icon className="h-4 w-4 text-muted-foreground group-hover:text-brand transition-colors" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-sm text-foreground">{suggestion.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {suggestion.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
