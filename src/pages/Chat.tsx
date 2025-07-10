import React from "react";
import { useLocation } from "react-router-dom";
import baliAdventure from "@/assets/bali-adventure.jpg";
import parisFamilyHotel from "@/assets/paris-family-hotel.jpg";
import seatleGetaway from "@/assets/seatle-getaway.jpg";

const sidebarItems = [
  { icon: "💬", label: "Chats" },
  { icon: "🧭", label: "Explore" },
  { icon: "❤️", label: "Saved" },
  { icon: "🧳", label: "Trips" },
  { icon: "🔔", label: "Updates" },
  { icon: "💡", label: "Inspiration" },
  { icon: "➕", label: "Create" },
];

export default function Chat() {
  const location = useLocation();
  const initialQuery = location.state?.query || "";
  const [messages, setMessages] = React.useState([
    { from: "bot", text: "Hey there, I’m here to assist you in planning your experience. Ask me anything travel related." },
  ]);
  const [input, setInput] = React.useState(initialQuery);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: "user", text: input }]);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-20 bg-card border-r flex flex-col items-center py-6 gap-4">
        {sidebarItems.map((item) => (
          <button key={item.label} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary focus:outline-none">
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </aside>
      {/* Main Content and Curated Panel */}
      <div className="flex-1 flex flex-col md:flex-row h-screen max-h-screen">
        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col h-full md:w-2/3">
          {/* Chat header */}
          <div className="border-b px-8 py-4 bg-background/80">
            <h1 className="text-2xl font-bold text-foreground">Where to today?</h1>
          </div>
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-4">
            {initialQuery && (
              <div className="self-end bg-primary/10 text-primary px-4 py-2 rounded-xl max-w-lg">
                {initialQuery}
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.from === "user"
                    ? "self-end bg-primary/10 text-primary px-4 py-2 rounded-xl max-w-lg"
                    : "self-start bg-muted text-muted-foreground px-4 py-2 rounded-xl max-w-lg"
                }
              >
                {msg.text}
              </div>
            ))}
          </div>
          {/* Chat input */}
          <div className="border-t px-8 py-4 bg-background flex gap-2">
            <input
              className="flex-1 rounded-xl border px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ask anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="rounded-xl bg-primary text-primary-foreground px-6 py-2 font-medium hover:bg-primary/90 transition-colors"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </main>
        {/* Curated Program Panel */}
        <aside className="w-full md:w-1/3 border-l bg-muted/40 flex flex-col p-6 gap-4 min-h-0">
          <h2 className="text-xl font-bold mb-2 text-foreground">Curated Program</h2>
          <p className="text-muted-foreground mb-4">Personalized recommendations just for you, updated every month based on your travel interests.</p>
          <ul className="flex flex-col gap-3">
            <li className="min-w-[220px] rounded-2xl bg-card shadow-sm overflow-hidden flex flex-col p-0">
              <div className="relative w-full h-40">
                <img src={baliAdventure} alt="Bali Adventure" className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                <div className="absolute left-0 bottom-0 p-4">
                  <div className="font-bold text-lg text-white flex items-center gap-2">🌴 Bali Adventure</div>
                  <div className="text-base text-white/90">10–12 Aug 2024</div>
                </div>
              </div>
            </li>
            <li className="min-w-[220px] rounded-2xl bg-card shadow-sm overflow-hidden flex flex-col p-0">
              <div className="relative w-full h-40">
                <img src={parisFamilyHotel} alt="Paris Family Hotel" className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                <div className="absolute left-0 bottom-0 p-4">
                  <div className="font-bold text-lg text-white flex items-center gap-2">🏙️ Paris Family Hotels</div>
                  <div className="text-base text-white/90">15–20 Sep 2024</div>
                </div>
              </div>
            </li>
            <li className="min-w-[220px] rounded-2xl bg-card shadow-sm overflow-hidden flex flex-col p-0">
              <div className="relative w-full h-40">
                <img src={seatleGetaway} alt="Seattle Getaway" className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                <div className="absolute left-0 bottom-0 p-4">
                  <div className="font-bold text-lg text-white flex items-center gap-2">🌲 Seattle Weekend Getaway</div>
                  <div className="text-base text-white/90">Next weekend</div>
                </div>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
} 