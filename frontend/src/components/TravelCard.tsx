import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface TravelCardProps {
  image: string;
  title: string;
  location: string;
  places: number;
  author: string;
  authorAvatar?: string;
  isFeatured?: boolean;
  className?: string;
}

export function TravelCard({
  image,
  title,
  location,
  places,
  author,
  authorAvatar,
  isFeatured = false,
  className
}: TravelCardProps) {
  return (
    <Card className={cn(
      "group overflow-hidden border-0 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-card to-muted/20",
      className
    )}>
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-xs font-medium">
            {places} places
          </Badge>
          {isFeatured && (
            <Badge className="bg-accent text-accent-foreground text-xs font-medium">
              Featured
            </Badge>
          )}
        </div>
        <button className="absolute top-3 right-3 p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors">
          <Heart className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3 h-3" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-primary" />
          </div>
          <span className="text-sm text-muted-foreground">{author}</span>
        </div>
      </div>
    </Card>
  );
}