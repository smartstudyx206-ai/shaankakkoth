import { Zap, Code, Lightbulb, FileText, Palette } from "lucide-react";

interface WelcomeScreenProps {
  onSuggestionClick: (message: string) => void;
}

const suggestions = [
  {
    icon: Code,
    title: "Help me write code",
    description: "Get assistance with programming tasks",
    prompt: "Help me write a Python function that processes data",
  },
  {
    icon: Lightbulb,
    title: "Brainstorm ideas",
    description: "Generate creative solutions",
    prompt: "Help me brainstorm ideas for a new project",
  },
  {
    icon: FileText,
    title: "Analyze content",
    description: "Review and improve documents",
    prompt: "Help me analyze and improve this document",
  },
  {
    icon: Palette,
    title: "Design assistance",
    description: "Get help with design decisions",
    prompt: "Help me design a user interface for my app",
  },
];

const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
      <div className="flex items-center justify-center mb-6">
        <div className="relative flex items-center justify-center rounded-2xl bg-brand p-4">
          <Zap className="h-12 w-12 text-brand-foreground" fill="currentColor" />
        </div>
      </div>
      
      <h1 className="text-3xl font-semibold mb-2">Welcome to Faraday</h1>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        Your AI assistant that's better than the rest. Ask me anything or choose a suggestion below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.prompt)}
            className="flex items-start gap-3 p-4 rounded-xl border bg-card hover:bg-accent transition-colors text-left group"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-brand/10 transition-colors">
              <suggestion.icon className="h-5 w-5 text-muted-foreground group-hover:text-brand transition-colors" />
            </div>
            <div>
              <h3 className="font-medium text-sm">{suggestion.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
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
