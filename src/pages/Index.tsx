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
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Hero Image */}
          <div className="relative">
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

          {/* Hero Content */}
          <div className="space-y-8">
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
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">
            Ready for your next adventure?
          </h2>
          <p className="text-muted-foreground text-lg">
            Get personalized travel recommendations and insider tips delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
