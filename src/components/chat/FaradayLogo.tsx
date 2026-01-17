import { Zap } from "lucide-react";

interface FaradayLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const FaradayLogo = ({ size = "md", showText = true }: FaradayLogoProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center rounded-lg bg-brand p-1.5">
        <Zap className={`${sizeClasses[size]} text-brand-foreground`} fill="currentColor" />
      </div>
      {showText && (
        <span className={`font-semibold tracking-tight ${textSizeClasses[size]}`}>
          Faraday
        </span>
      )}
    </div>
  );
};

export default FaradayLogo;
