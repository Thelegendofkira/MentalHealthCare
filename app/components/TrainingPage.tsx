"use client";
import { useState } from "react";
import { Send } from "lucide-react";

export default function TrainingChat() {
    // Initialize with data fetched from your DB on page load
    const [score, setScore] = useState(45);
    const [issues, setIssues] = useState(["Academic Pressure"]);
    const [messages, setMessages] = useState([{ role: "model", text: "Hi there. How did you do with your goals today?" }]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userText = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", text: userText }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/mentor-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: "dummy-user-123", // Replace with actual logged-in user ID
                    userMessage: userText,
                    currentScore: score,
                    activeIssues: issues,
                }),
            });

            const data = await response.json();

            // Update the UI with the AI's new state
            setMessages(prev => [...prev, { role: "model", text: data.reply }]);
            setScore(data.newScore);
            setIssues(data.updatedIssues);

        } catch (error) {
            console.error("Chat error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex gap-6 p-6 max-w-6xl mx-auto training-page">
            {/* Sidebar: Persistent State Display */}
            <div className="w-1/3 bg-stone-50 border border-stone-200 p-6 rounded-xl h-[600px]">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Your Progress</h2>

                <div className="mb-6">
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2">Wellbeing Score</p>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-bold text-blue-600">{score}</span>
                        <span className="text-slate-400 mb-1">/ 100</span>
                    </div>
                    {/* Simple Progress Bar */}
                    <div className="w-full bg-stone-200 rounded-full h-2 mt-3">
                        <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${score}%` }}></div>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2">Active Focus Areas</p>
                    <div className="flex flex-wrap gap-2">
                        {issues.map((issue, idx) => (
                            <span key={idx} className="bg-white border border-stone-300 text-stone-700 text-xs px-3 py-1 rounded-full">
                                {issue}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat Interface */}
            <div className="w-2/3 flex flex-col bg-white border border-stone-200 rounded-xl h-[600px] training-chat-box">
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] p-4 rounded-xl ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-stone-100 text-slate-800"}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && <div className="text-slate-400 text-sm animate-pulse ml-2">Mentor is thinking...</div>}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-stone-200 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type your update here..."
                        className="flex-1 p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 training-input-field"
                    />
                    <button onClick={sendMessage} disabled={isLoading} className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}