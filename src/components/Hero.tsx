
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ContactModal } from "./ContactModal";

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <header className="relative h-screen min-h-[700px] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage?.imageUrl || "https://picsum.photos/seed/soul-hero/1920/1080"}
          alt="Retreat Background"
          fill
          priority
          className="object-cover"
          data-ai-hint="serene mountains"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-fade-in-up">
        <p className="uppercase tracking-[0.5em] text-[10px] md:text-xs mb-8 font-bold opacity-80">
          Find Direction. Restore Clarity.
        </p>
        <h1 className="text-4xl md:text-7xl mb-8 leading-tight italic font-headline">
          Temukan Kembali Arah Hidup Anda.
        </h1>
        <p className="text-base md:text-xl font-light mb-12 opacity-90 leading-relaxed max-w-2xl mx-auto">
          A private retreat experience for professionals & business owners seeking clarity, purpose, and inner alignment.
        </p>
        
        <div className="flex flex-col items-center gap-8">
          <button 
            onClick={() => setModalOpen(true)}
            className="btn-premium"
          >
            Reserve Your Spot
          </button>
          <p className="serif italic text-lg md:text-xl text-background/80">
            &ldquo;Bukan sekadar recharge. Ini tentang menemukan arah hidupmu.&rdquo;
          </p>
        </div>
      </div>

      <a 
        href="#problem" 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hover:opacity-100 transition-opacity"
      >
        <ChevronDown className="w-8 h-8" />
      </a>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
}
