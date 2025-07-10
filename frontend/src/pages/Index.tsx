import { TravelCard } from "@/components/TravelCard";
import { SearchBar } from "@/components/SearchBar";
import utahParks from "@/assets/utah-parks.jpg";
import seattleSkyline from "@/assets/seattle-skyline.jpg";
import portlandMaine from "@/assets/portland-maine.jpg";
import vietnamStreet from "@/assets/vietnam-street.jpg";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

const typewriterWords = ["effortless", "aspirational", "fun"];

const Typewriter = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typewriterWords[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed.length < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length + 1));
      }, 80);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length - 1));
      }, 40);
    } else if (!isDeleting && displayed.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % typewriterWords.length);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent min-w-[7ch] inline-block">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Index = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState<number | undefined>(undefined);
  const featuredRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Update height on mount, resize, and typewriter changes
  useEffect(() => {
    function updateHeight() {
      if (leftRef.current) {
        setLeftHeight(leftRef.current.offsetHeight);
      }
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Also update when typewriter changes (for dynamic headline)
  useEffect(() => {
    const interval = setInterval(() => {
      if (leftRef.current) {
        setLeftHeight(leftRef.current.offsetHeight);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToFeatured = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handler for search submit
  const handleSearchSubmit = (query: string) => {
    navigate("/chat", { state: { query } });
  };

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
      <section className="container mx-auto px-4 py-16 md:py-24 mb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch max-w-7xl mx-auto">
          {/* Hero Content */}
          <div ref={leftRef} className="space-y-8 order-2 lg:order-1 flex flex-col justify-center">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Travel should be{" "}
                <Typewriter />
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
              </p>
            </div>
            <SearchBar onSubmit={handleSearchSubmit} />
            {/* Example prompts bubble */}
            <div className="mt-3 flex flex-col gap-2">
              <div className="bg-muted text-muted-foreground rounded-xl px-4 py-2 text-sm shadow-sm inline-flex self-start">
                Book me a trip to Bali for 10–12 Aug 2024
              </div>
              <div className="bg-muted text-muted-foreground rounded-xl px-4 py-2 text-sm shadow-sm inline-flex self-start">
                Find family-friendly hotels in Paris for 15–20 Sep 2024
              </div>
              <div className="bg-muted text-muted-foreground rounded-xl px-4 py-2 text-sm shadow-sm inline-flex self-start">
                Show me weekend getaways near Seattle for next weekend
              </div>
            </div>
          </div>
          {/* Hero Video */}
          <div className="relative order-1 lg:order-2 flex" style={leftHeight ? { height: leftHeight } : {}}>
            <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)] w-full h-full min-h-[300px]">
              <video
                src="/video_asset.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-bottom"
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
      <section ref={featuredRef} className="container mx-auto px-4 py-16">
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
      {/* Feature Panel Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="rounded-3xl bg-green-50 p-8 flex flex-col items-start shadow-sm">
            {/* Placeholder image/icon */}
            <div className="mb-6 w-full flex justify-center">
              <div className="w-32 h-20 bg-green-100 rounded-xl flex items-center justify-center text-3xl">💬</div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Group Chat</h3>
            <p className="text-muted-foreground mb-6">Planning a trip with others just got easier! Start a group chat, share ideas and ask for recommendations that balance everyone’s preferences.</p>
            <div className="flex gap-4 mt-auto">
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/20 rounded-full text-sm font-medium hover:bg-green-100 transition-colors">Learn More</a>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="rounded-3xl bg-lime-50 p-8 flex flex-col items-start shadow-sm">
            <div className="mb-6 w-full flex justify-center">
              <div className="w-32 h-20 bg-lime-100 rounded-xl flex items-center justify-center text-3xl">🔗</div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Follow Your Aspirants</h3>
            <p className="text-muted-foreground mb-6">Give us a link to the YouTube video, TikTok, or Instagram Reel and we will whip you a plan for you.</p>
            <div className="flex gap-4 mt-auto">
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/20 rounded-full text-sm font-medium hover:bg-lime-100 transition-colors">Learn More</a>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="rounded-3xl bg-purple-50 p-8 flex flex-col items-start shadow-sm">
            <div className="mb-6 w-full flex justify-center">
              <div className="w-32 h-20 bg-purple-100 rounded-xl flex items-center justify-center text-3xl">💜</div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Personalize</h3>
            <p className="text-muted-foreground mb-6">TripTailor knows you based on your travel and we curate a list for you every month.</p>
            <div className="flex gap-4 mt-auto">
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/20 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* Removed newsletter section as requested */}
    </div>
  );
};

export default Index;
