"use client";

import ThreeDLetterG from "@/components/ThreeDLetterG";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-row bg-gray-50 dark:bg-gray-900 overflow-hidden">
            {/* Sidebar / Hero Section (Desktop) */}
            <section className="hidden lg:flex w-1/3 relative flex-col items-center justify-center bg-white/10 backdrop-blur-lg text-gray-800 overflow-hidden border-r border-white/20">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] rounded-full bg-pastel-teal/30 blur-[100px] animate-float"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-pastel-lavender/30 blur-[80px] animate-pulse-slow"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-8 p-10 text-center">
                    <ThreeDLetterG />
                    <div className="space-y-4 max-w-md">
                        <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pastel-teal to-pastel-lavender">
                            Experience<br />The Future
                        </h2>
                        <p className="text-gray-600 text-lg font-light leading-relaxed">
                            Engage with the next generation of AI in a beautifully designed, immersive environment.
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-8 text-sm text-gray-400 font-medium tracking-widest uppercase text-center">
                    Ligma AI v2.0<br />
                    <span className="text-xs normal-case opacity-70">Created by LKG and GEM</span>
                </div>
            </section>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-0 md:p-8 relative h-[100dvh] md:h-screen w-full">
                <ChatInterface />
            </div>
        </main>
    );
}
