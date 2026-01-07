"use client";

import React, { useState, useRef, useEffect } from "react";
import SpeechController from "./SpeechController";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const LANGUAGES = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
];

const VOICES = ["Male", "Female"];

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello! I am Ligma AI, created by LKG and GEM. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [language, setLanguage] = useState("en");
    const [voice, setVoice] = useState("Female");
    const [isTyping, setIsTyping] = useState(false);
    const [bgGradient, setBgGradient] = useState("from-pastel-teal/20 via-pastel-lavender/20 to-pastel-sky/20");

    const chatEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logic
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = { role: "user", content: text };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            const res = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, language, voice }),
            });

            if (!res.body) throw new Error("No response body");

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let assistantMsg: Message = { role: "assistant", content: "" };

            setMessages((prev) => [...prev, assistantMsg]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);

                setMessages((prev) => {
                    const newHistory = [...prev];
                    const lastMsg = newHistory[newHistory.length - 1];
                    lastMsg.content += chunk;
                    return newHistory;
                });
            }
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={`flex flex-col h-full md:h-[85vh] w-full md:max-w-5xl mx-auto rounded-none md:rounded-3xl overflow-hidden glass-panel shadow-none md:shadow-2xl relative`}>
            {/* Header / Top Bar */}
            <div className="flex items-center justify-between p-4 border-b border-glass-border bg-white/40 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-pastel-coral animate-pulse-slow"></div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pastel-teal to-pastel-lavender">
                        Ligma AI
                    </h1>
                </div>

                <div className="flex gap-2">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-white/50 border border-white/60 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pastel-sky transition-all cursor-pointer"
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
                        ))}
                    </select>
                    <select
                        value={voice}
                        onChange={(e) => setVoice(e.target.value)}
                        className="bg-white/50 border border-white/60 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pastel-sky transition-all cursor-pointer"
                    >
                        {VOICES.map(v => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-br ${bgGradient}`}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-float`}>
                        <div
                            className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-sm backdrop-blur-sm 
                        ${msg.role === "user"
                                    ? "bg-pastel-sky/90 text-white rounded-br-none"
                                    : "bg-white/80 text-gray-800 rounded-bl-none border border-white/40"
                                }`}
                            style={{ animationDuration: '0.5s' }}
                        >
                            <p className="text-lg leading-relaxed font-sans">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white/60 rounded-2xl px-6 py-4 rounded-bl-none flex items-center gap-2">
                            <div className="w-2 h-2 bg-pastel-teal rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-pastel-lavender rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-pastel-coral rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/40 border-t border-glass-border backdrop-blur-md">
                <div className="relative flex items-center gap-2">
                    <SpeechController
                        language={language === 'zh' ? 'zh-CN' : language} // Simple mapping
                        onTranscript={(text) => setInputValue(text)}
                        onListeningChange={(listening) => { /* Optional visual cue */ }}
                        speakText={messages[messages.length - 1]?.role === "assistant" ? messages[messages.length - 1].content : ""}
                        voiceName={voice}
                    />

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                        placeholder="Type a message or use voice..."
                        className="flex-1 bg-white/70 border-none rounded-full px-6 py-4 text-gray-700 shadow-inner focus:ring-2 focus:ring-pastel-lavender focus:outline-none transition-all placeholder:text-gray-400"
                    />

                    <button
                        onClick={() => handleSendMessage(inputValue)}
                        className="p-4 rounded-full bg-gradient-to-r from-pastel-teal to-pastel-sky text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
                <div className="text-center mt-2 text-xs text-slate-500">
                    AI can make mistakes. Please verify important information.
                </div>
            </div>
        </div>
    );
}
