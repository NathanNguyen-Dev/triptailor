import React from "react";
import { useLocation } from "react-router-dom";
import baliAdventure from "@/assets/bali-adventure.jpg";
import parisFamilyHotel from "@/assets/paris-family-hotel.jpg";
import seatleGetaway from "@/assets/seatle-getaway.jpg";
import { sendChatMessage } from "../lib/api";

type DuffelOffer = {
  id: string;
  total_amount: string;
  total_currency: string;
  owner?: { name?: string; logo_symbol_url?: string };
  slices: Array<{
    origin?: { city_name?: string; iata_code?: string };
    destination?: { city_name?: string; iata_code?: string };
    duration?: string;
    segments: Array<{
      operating_carrier?: { name?: string; logo_symbol_url?: string };
      marketing_carrier?: { name?: string; logo_symbol_url?: string };
      departing_at?: string;
      arriving_at?: string;
      passengers: Array<{
        cabin?: { marketing_name?: string };
        cabin_class_marketing_name?: string;
      }>;
    }>;
  }>;
  conditions?: {
    refund_before_departure?: { allowed?: boolean };
  };
};

type DuffelOfferResponse = { data: { offers: DuffelOffer[] } };

function isDuffelOfferResponse(obj: unknown): obj is DuffelOfferResponse {
  if (
    typeof obj === "object" &&
    obj !== null &&
    "data" in obj
  ) {
    const data = (obj as { data?: unknown }).data;
    return (
      typeof data === "object" &&
      data !== null &&
      "offers" in data &&
      Array.isArray((data as { offers?: unknown }).offers)
    );
  }
  return false;
}

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
  const [loading, setLoading] = React.useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { from: "user", text: input }]);
      setLoading(true);
      try {
        const aiResponse = await sendChatMessage(input);
        setMessages(msgs => [...msgs, { from: "ai", text: aiResponse }]);
      } catch (e) {
        setMessages(msgs => [...msgs, { from: "ai", text: "Error: Could not get response from backend." }]);
      }
      setInput("");
      setLoading(false);
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
            {messages.map((msg, i) => {
              // Check if this is a Duffel offers response
              const isDuffelOffers = isDuffelOfferResponse(msg.text);
              if (isDuffelOffers) {
                const offers = (msg.text as unknown as DuffelOfferResponse).data.offers;
                return (
                  <div key={i} className="self-start bg-muted text-muted-foreground px-4 py-2 rounded-xl max-w-lg">
                    <div className="font-bold mb-2 text-lg">Best flight itineraries</div>
                    <ul className="space-y-6">
                      {offers.map((offer, idx) => {
                        let logoUrl = offer.owner?.logo_symbol_url;
                        if (!logoUrl && offer.slices?.[0]?.segments?.[0]?.marketing_carrier?.logo_symbol_url) {
                          logoUrl = offer.slices[0].segments[0].marketing_carrier.logo_symbol_url;
                        }
                        const slice = offer.slices?.[0];
                        const segment = slice?.segments?.[0];
                        const airlineName = offer.owner?.name || segment?.marketing_carrier?.name || "Airline";
                        const origin = slice?.origin;
                        const destination = slice?.destination;
                        const dep = segment?.departing_at ? new Date(segment.departing_at) : null;
                        const arr = segment?.arriving_at ? new Date(segment.arriving_at) : null;
                        const duration = slice?.duration?.replace('PT', '').toLowerCase();
                        const price = offer.total_amount;
                        const currency = offer.total_currency;
                        const cancellable = offer.conditions?.refund_before_departure?.allowed;
                        const cancelText = cancellable === true ? "Free cancellation within 23 hours of booking" : cancellable === false ? "Not cancellable" : null;
                        return (
                          <li key={offer.id || idx} className="rounded-2xl border bg-white/80 shadow-sm px-6 py-5 flex flex-col gap-3">
                            <div className="flex items-center gap-4 mb-2">
                              {logoUrl && (
                                <img src={logoUrl} alt="Airline logo" className="w-10 h-10 object-contain rounded bg-white border" />
                              )}
                              <div className="flex-1">
                                <div className="font-semibold text-lg">{airlineName}</div>
                                <div className="text-muted-foreground text-sm">{origin?.city_name} ({origin?.iata_code}) → {destination?.city_name} ({destination?.iata_code})</div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-xl text-primary">{price} {currency}</div>
                                <div className="text-xs text-muted-foreground">per person</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-6 text-base font-medium">
                              <div>
                                {dep ? dep.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : ''}
                                <span className="ml-2">{dep ? dep.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : ''} - {arr ? arr.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                              </div>
                              <div className="text-muted-foreground">{duration}</div>
                              <div className="text-muted-foreground">Nonstop</div>
                            </div>
                            {cancelText && (
                              <div className={`flex items-center gap-2 text-sm mt-1 ${cancellable ? 'text-green-600' : 'text-red-500'}`}>
                                {cancellable ? (
                                  <span>✓</span>
                                ) : (
                                  <span>✗</span>
                                )}
                                <span>{cancelText}</span>
                              </div>
                            )}
                            <div className="flex justify-end mt-2">
                              <button className="bg-black text-white rounded-full px-6 py-2 font-semibold text-base shadow hover:bg-gray-800 transition">Book</button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  className={
                    msg.from === "user"
                      ? "self-end bg-primary/10 text-primary px-4 py-2 rounded-xl max-w-lg"
                      : "self-start bg-muted text-muted-foreground px-4 py-2 rounded-xl max-w-lg"
                  }
                >
                  {typeof msg.text === "object" ? JSON.stringify(msg.text) : msg.text}
                </div>
              );
            })}
          </div>
          {/* Chat input */}
          <div className="border-t px-8 py-4 bg-background flex gap-2">
            <input
              className="flex-1 rounded-xl border px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ask anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              className="rounded-xl bg-primary text-primary-foreground px-6 py-2 font-medium hover:bg-primary/90 transition-colors"
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              {loading ? "Sending..." : "Send"}
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