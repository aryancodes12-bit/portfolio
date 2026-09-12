/**
 * chatbotService.ts
 * ---------------------------------------------------------------------------
 * Client-side service that calls the /api/chat Next.js API route.
 * The actual Groq API call (and the system prompt with knowledge base)
 * lives server-side in /api/chat/route.ts — the API key never reaches the client.
 * ---------------------------------------------------------------------------
 */

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

/**
 * Send a message to the chatbot API and get a response.
 * @param userMessage - The user's latest message
 * @param history - Previous messages for context (limited to last 10 for performance)
 */
export async function sendChatMessage(
  userMessage: string,
  history: ChatMessage[]
): Promise<ChatResponse> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMessage: userMessage.trim(),
        history: history.slice(-10), // Keep last 10 messages for context window
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[ChatbotService] API error:", response.status, errorData);
      return {
        message:
          "Hmm, I had a little hiccup connecting. Try again in a moment?",
        error: `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return { message: data.message };
  } catch (error) {
    console.error("[ChatbotService] Network error:", error);
    return {
      message:
        "Looks like there's a connection issue. Give it another shot!",
      error: String(error),
    };
  }
}
