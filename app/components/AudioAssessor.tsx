"use client";

import { useState, useRef } from "react";
import { Mic, Square, Loader2, AlertCircle, ArrowRight } from "lucide-react";

export default function AudioAssessor() {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<{ serious: boolean } | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<BlobPart[]>([]);

    const startRecording = async () => {
        try {
            setResult(null);
            audioChunksRef.current = [];

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = handleAudioStop;
            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Microphone access denied or failed:", error);
            alert("Please allow microphone access to use this feature.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const handleAudioStop = async () => {
        setIsProcessing(true);

        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.webm");

        try {
            const response = await fetch("/api/analyze-audio", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Server error");

            const data = await response.json();
            setResult(data);

        } catch (error) {
            console.error("Failed to analyze audio:", error);
            alert("Something went wrong while processing. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-stone-50 rounded-xl shadow-sm border border-stone-200 max-w-md mx-auto">
            <h3 className="text-xl font-medium text-slate-800 mb-6">How are you feeling today?</h3>

            <div className="flex gap-4 mb-8">
                {!isRecording ? (
                    <button
                        onClick={startRecording}
                        disabled={isProcessing}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {isProcessing ? <Loader2 className="animate-spin" /> : <Mic />}
                        {isProcessing ? "Processing..." : "Record Issue"}
                    </button>
                ) : (
                    <button
                        onClick={stopRecording}
                        className="flex items-center gap-2 bg-stone-800 hover:bg-stone-900 text-white px-6 py-3 rounded-lg font-medium transition-colors animate-pulse"
                    >
                        <Square size={18} fill="currentColor" />
                        Stop Recording
                    </button>
                )}
            </div>

            {result && (
                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {result.serious ? (
                        <div className="bg-red-50 border border-red-200 p-5 rounded-lg text-center">
                            <AlertCircle className="mx-auto text-red-600 mb-2" size={32} />
                            <h4 className="text-lg font-bold text-red-800 mb-2">You are not alone.</h4>
                            <p className="text-red-700 mb-4 text-sm">
                                It sounds like you might be going through a crisis. Please reach out to someone who can help immediately.
                            </p>
                            <a href="tel:988" className="inline-block bg-red-600 text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 transition-colors">
                                Call Emergency Helpline
                            </a>
                        </div>
                    ) : (
                        <div className="bg-white border border-stone-200 p-5 rounded-lg text-center">
                            <h4 className="text-lg font-medium text-slate-800 mb-2">Thank you for sharing.</h4>
                            <p className="text-slate-600 mb-4 text-sm">
                                Taking the first step to talk about it is huge. Let's explore some resources that might help you navigate what you're feeling.
                            </p>
                            <a href="/dashboard" className="inline-flex items-center gap-2 bg-stone-100 text-stone-800 border border-stone-300 px-6 py-2 rounded-md font-medium hover:bg-stone-200 transition-colors">
                                Go to Resources <ArrowRight size={16} />
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}