"use client";

import React, { useEffect, useState, useRef } from 'react';

interface SpeechControllerProps {
    language: string;
    onTranscript: (text: string) => void;
    onListeningChange: (isListening: boolean) => void;
    speakText?: string; // Text to speak
    voiceName?: string; // Specific voice name to use
}

const SpeechController: React.FC<SpeechControllerProps> = ({
    language,
    onTranscript,
    onListeningChange,
    speakText,
    voiceName
}) => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            synthesisRef.current = window.speechSynthesis;

            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = language; // 'en-US', 'es-ES', etc.

                recognition.onstart = () => {
                    setIsListening(true);
                    onListeningChange(true);
                };

                recognition.onend = () => {
                    setIsListening(false);
                    onListeningChange(false);
                };

                recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    onTranscript(transcript);
                };

                recognitionRef.current = recognition;
            }
        }
    }, [language, onListeningChange, onTranscript]);

    // Handle Speaking
    useEffect(() => {
        if (speakText && synthesisRef.current) {
            const utterance = new SpeechSynthesisUtterance(speakText);
            // Default mapping if full locale not provided
            utterance.lang = language;

            // Try to find the requested voice
            const voices = synthesisRef.current.getVoices();
            if (voiceName) {
                const selectedVoice = voices.find(v => v.name.includes(voiceName));
                if (selectedVoice) utterance.voice = selectedVoice;
            }

            synthesisRef.current.speak(utterance);
        }
    }, [speakText, language, voiceName]);

    const toggleListening = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    return (
        <button
            onClick={toggleListening}
            className={`p-4 rounded-full transition-all duration-300 shadow-lg ${isListening
                    ? 'bg-rose-500 hover:bg-rose-600 animate-pulse-slow'
                    : 'bg-pastel-sky hover:bg-sky-400'
                }`}
            title="Toggle Voice Input"
        >
            {isListening ? (
                // Mic Off / Active Icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 1.5a3 3 0 013 3v4.5a3 3 0 11-6 0V4.5a3 3 0 013-3z" />
                </svg>
            ) : (
                // Mic On Icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 1.5a3 3 0 013 3v4.5a3 3 0 013-3z" />
                </svg>
            )}
        </button>
    );
};

export default SpeechController;
