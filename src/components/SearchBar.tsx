import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-4 bg-card rounded-full shadow-[var(--shadow-card)] border max-w-2xl",
      className
    )}>
      <Input 
        placeholder="Tell us where you want to go..."
        className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
      />
      
      <Button 
        size="sm"
        className="rounded-full w-10 h-10 p-0 bg-primary hover:bg-primary/90 transition-colors"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
}