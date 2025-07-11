export async function sendChatMessage(message: string): Promise<string> {
  const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error('Failed to get response from backend');
  const data = await res.json();
  return data.response;
} 