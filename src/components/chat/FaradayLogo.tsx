import { Zap } from "lucide-react";

interface FaradayLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const FaradayLogo = ({ size = "md", showText = true }: FaradayLogoProps) => {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const containerClasses = {
    sm: "p-1",
    md: "p-1.5",
    lg: "p-2",
  };

  const textSizeClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`relative flex items-center justify-center rounded-lg bg-gradient-to-br from-brand to-purple-400 ${containerClasses[size]}`}>
        <Zap className={`${sizeClasses[size]} text-brand-foreground`} fill="currentColor" />
      </div>
      {showText && (
        <span className={`font-semibold tracking-tight text-foreground ${textSizeClasses[size]}`}>
          Faraday
        </span>
      )}
    </div>
  );
};

export default FaradayLogo;
