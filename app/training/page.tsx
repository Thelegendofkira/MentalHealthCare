

"use client";

import { useState, useEffect } from "react";
import { Send, Trash2 } from "lucide-react";

export default function TrainingChat() {

    const [score, setScore] = useState(45);
    const [issues, setIssues] = useState(["Academic Pressure"]);
    const [messages, setMessages] = useState([
        { role: "model", text: "Hi there. How did you do with your goals today?" }
    ]);

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);

        const savedScore = localStorage.getItem("training_score");
        const savedIssues = localStorage.getItem("training_issues");
        const savedMessages = localStorage.getItem("training_messages");

        if (savedScore) setScore(JSON.parse(savedScore));
        if (savedIssues) setIssues(JSON.parse(savedIssues));
        if (savedMessages) setMessages(JSON.parse(savedMessages));
    }, []);


    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("training_score", JSON.stringify(score));
            localStorage.setItem("training_issues", JSON.stringify(issues));
            localStorage.setItem("training_messages", JSON.stringify(messages));
        }
    }, [score, issues, messages, isMounted]);


    const clearHistory = () => {
        if (confirm("Are you sure you want to reset your progress?")) {
            setScore(45);
            setIssues(["Academic Pressure"]);
            setMessages([{ role: "model", text: "Hi there. Let's start fresh. How are you feeling today?" }]);
            localStorage.removeItem("training_score");
            localStorage.removeItem("training_issues");
            localStorage.removeItem("training_messages");
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userText = input;
        setInput("");


        const updatedMessages = [...messages, { role: "user", text: userText }];
        setMessages(updatedMessages);
        setIsLoading(true);

        try {
            const response = await fetch("/api/mentor-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: "demo-user",
                    userMessage: userText,
                    currentScore: score,
                    activeIssues: issues,

                    chatHistory: updatedMessages.slice(-5)
                }),
            });

            if (!response.ok) throw new Error("API response was not ok");

            const data = await response.json();


            setMessages(prev => [...prev, { role: "model", text: data.reply }]);
            setScore(data.newScore);
            setIssues(data.updatedIssues);

        } catch (error) {
            console.error("Chat error:", error);
            alert("Failed to connect to the AI mentor. Please check your API key and connection.");
        } finally {
            setIsLoading(false);
        }
    };


    if (!isMounted) return <div className="p-8 text-center text-slate-500">Loading your progress...</div>;

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto min-h-[calc(100vh-80px)]">


            <div className="w-full lg:w-1/3 bg-stone-50 border border-stone-200 p-6 rounded-xl flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">Your Progress</h2>
                    <button
                        onClick={clearHistory}
                        className="text-stone-400 hover:text-red-600 transition-colors"
                        title="Reset Progress"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                <div className="mb-8">
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2">Wellbeing Score</p>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-bold text-blue-600">{score}</span>
                        <span className="text-slate-400 mb-1">/ 100</span>
                    </div>

                    <div className="w-full bg-stone-200 rounded-full h-2 mt-3 overflow-hidden">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-3">Active Focus Areas</p>
                    <div className="flex flex-wrap gap-2">
                        {issues.length > 0 ? (
                            issues.map((issue, idx) => (
                                <span key={idx} className="bg-white border border-stone-300 text-stone-700 text-sm px-3 py-1.5 rounded-full shadow-sm">
                                    {issue}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-slate-400 italic">No active issues. Keep it up!</span>
                        )}
                    </div>
                </div>
            </div>


            <div className="w-full lg:w-2/3 flex flex-col bg-white border border-stone-200 rounded-xl shadow-sm h-[600px] lg:h-auto">


                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === "user"
                                ? "bg-blue-600 text-white rounded-br-sm"
                                : "bg-stone-100 text-slate-800 rounded-bl-sm"
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="max-w-[85%] p-4 rounded-2xl bg-stone-100 text-slate-500 rounded-bl-sm animate-pulse">
                                Thinking...
                            </div>
                        </div>
                    )}
                </div>


                <div className="p-4 border-t border-stone-200 bg-stone-50 rounded-b-xl flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
                        placeholder="Type your update here..."
                        disabled={isLoading}
                        className="flex-1 p-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow disabled:opacity-60"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center min-w-[50px]"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>

        </div>
    );
}