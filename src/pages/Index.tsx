import { TravelCard } from "@/components/TravelCard";
import { SearchBar } from "@/components/SearchBar";
import utahParks from "@/assets/utah-parks.jpg";
import seattleSkyline from "@/assets/seattle-skyline.jpg";
import portlandMaine from "@/assets/portland-maine.jpg";
import vietnamStreet from "@/assets/vietnam-street.jpg";

const featuredGuides = [
  {
    id: 1,
    image: utahParks,
    title: "Utah's Big 5 National Parks (and some) with Kids",
    location: "Moab, Utah",
    places: 13,
    author: "chasityraybuck-bonilla",
    isFeatured: true
  },
  {
    id: 2,
    image: seattleSkyline,
    title: "Family Fun in Seattle",
    location: "Seattle, Washington",
    places: 117,
    author: "anajaya"
  },
  {
    id: 3,
    image: portlandMaine,
    title: "Idyllic Portland, Maine Weekend Getaway",
    location: "Portland, Maine",
    places: 13,
    author: "michellesandmann"
  },
  {
    id: 4,
    image: vietnamStreet,
    title: "7 Days in Vietnam: From South to Central as a First-Timer",
    location: "Vietnam",
    places: 17,
    author: "brandtheweats"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">triptailor</span>
            </span>
            <nav className="hidden md:flex gap-6 ml-8">
              <a href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium">
                {/* Compass Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <polygon points="12,7 15,17 12,15 9,17" fill="currentColor" />
                </svg>
                Explore
              </a>
              <a href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium">
                {/* Lightbulb Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18h6m-3 0v2m-4-2a4 4 0 118 0c0 1.5-1 2.5-2 2.5h-4c-1 0-2-1-2-2.5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="12" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                Inspiration
              </a>
              <a href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium">
                {/* Heart Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11 3 12 4 12 4C12 4 13 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                Saved
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 rounded-lg font-medium text-primary hover:bg-primary/10 transition-colors">Login</button>
            <button className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground shadow hover:opacity-90 transition-opacity">Sign Up</button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Travel should be{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  effortless
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
              </p>
            </div>
            <SearchBar />
          </div>
          {/* Hero Video */}
          <div className="relative order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)]">
              <video
                src="/video_asset.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[600px] object-cover"
                poster="/placeholder.svg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </section>

      {/* Featured Guides Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Featured guides</h2>
            <p className="text-muted-foreground">Discover amazing destinations curated by travel experts</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGuides.map((guide) => (
              <TravelCard
                key={guide.id}
                image={guide.image}
                title={guide.title}
                location={guide.location}
                places={guide.places}
                author={guide.author}
                isFeatured={guide.isFeatured}
                className="hover:cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* Removed newsletter section as requested */}
    </div>
  );
};

export default Index;
