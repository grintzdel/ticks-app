"use client";

import { Card } from "@/components/ui/card/card";
import { useModel } from "@/hooks/useModel";
import { decrypt } from "@/utils/model/aes";
import { Loader2, ArrowUp } from "lucide-react";
import { use, useState, useRef, useEffect } from "react";

import GradientBackgroundChatbot from "@/components/SVG/background/GradientBackgroundChatbot";
import StarsIcon from "@/components/SVG/icons/StarsIcon";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  metadata?: {
    questionNumber?: number;
    category?: string;
    priority?: string;
  };
}

export default function ChatbotPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const resolvedParams = use(params);
  const [input, setInput] = useState("");
  
  console.log("Hash reçu:", resolvedParams.hash);
  const ticketId = decrypt(resolvedParams.hash);
  console.log("TicketId déchiffré:", ticketId);
  
  const { sendTicketQuestion, isLoading, error, isLoadingData, conversationHistory } =
    useModel(ticketId);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory, isLoading]);

  console.log("État actuel:", {
    isLoadingData,
    conversationHistoryLength: conversationHistory.length,
    conversationHistory,
    error
  });

  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setInput("");
    await sendTicketQuestion(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <>
      <GradientBackgroundChatbot />

      <div className="flex flex-col h-screen max-w-5xl mx-auto p-6 pt-[3%] pb-[3%]">
        <div className="flex flex-col justify-center items-center pb-12 md:gap-6">
          <StarsIcon />
          <h1 className="text-sm md:text-2xl">
            Avez-vous rencontré un problème ?{" "}
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {conversationHistory.map((message, index) => (
            <Card key={index} className="p-4">
              <div className="font-medium mb-1 flex justify-between">
                <span>{message.role === "user" ? "Vous" : "Assistant"}</span>
              </div>
              <pre className="whitespace-pre-wrap font-sans">
                {message.content}
              </pre>
            </Card>
          ))}
          {isLoading && (
             <Card className="p-4 flex items-center space-x-2">
               <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
               <span className="text-gray-500 italic">Assistant réfléchit...</span>
             </Card>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="pt-4 mt-auto">
          <form
            onSubmit={handleSubmit}
            className="flex items-center space-x-3 bg-white border border-gray-200 rounded-xl p-2 shadow-sm"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Votre message..."
              className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none resize-none overflow-y-auto max-h-48 text-sm py-2 px-2 field-sizing-content"
              rows={1}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 text-white self-end
                        rounded-full bg-[#8768EA] hover:bg-[#6f55c8] hover:cursor-pointer
                        disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
                        transition-colors duration-150 ease-in-out"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowUp className="w-5 h-5" />
              )}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </>
  );
}
