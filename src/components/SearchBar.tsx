import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface SearchBarProps {
  className?: string;
  onSubmit?: (query: string) => void;
}

export function SearchBar({ className, onSubmit }: SearchBarProps) {
  const [value, setValue] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit(value);
    }
  };

  const handleButtonClick = () => {
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-3 p-2 bg-card rounded-xl shadow-[var(--shadow-card)] border max-w-2xl",
      className
    )}>
      <Input 
        placeholder="Tell us where you want to go..."
        className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-lg h-10"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      
      <Button 
        size="sm"
        className="rounded-xl w-9 h-9 p-0 bg-primary hover:bg-primary/90 transition-colors"
        onClick={handleButtonClick}
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
}