
"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { ExperienceFlow } from "@/components/ExperienceFlow";
import { LocationSection } from "@/components/LocationSection";
import { GenAIPromptTool } from "@/components/GenAIPromptTool";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  // Simple scroll reveal observer
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom-5', 'duration-1000', 'fill-mode-forwards');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <div className="reveal-on-scroll">
          <Hero />
        </div>
        
        <div className="reveal-on-scroll">
          <ProblemSection />
        </div>
        
        <div className="reveal-on-scroll">
          <SolutionSection />
        </div>

        <div className="reveal-on-scroll">
          <ExperienceFlow />
        </div>

        <div className="reveal-on-scroll">
          <GenAIPromptTool />
        </div>

        <div className="reveal-on-scroll">
          <LocationSection />
        </div>

        <div className="reveal-on-scroll">
          <Testimonials />
        </div>

        <section id="booking" className="py-24 md:py-40 bg-white text-center">
          <div className="max-w-4xl mx-auto px-6 reveal-on-scroll">
            <h2 className="text-4xl md:text-7xl mb-10 italic font-headline leading-tight">
              This Might Be The Pause You Need
            </h2>
            <p className="text-lg md:text-xl text-primary/60 mb-14 max-w-2xl mx-auto leading-relaxed">
              Mungkin ini bukan tentang Anda butuh istirahat panjang. Mungkin Anda hanya butuh berhenti sejenak... untuk melihat segalanya dengan lebih jelas.
            </p>
            <div className="flex flex-col items-center gap-8">
              <button 
                onClick={() => setModalOpen(true)}
                className="btn-premium px-12 py-6 text-sm"
              >
                Book Your Clarity Journey
              </button>
              <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] text-primary/30">
                <span>📍 Bogor</span>
                <span className="w-1 h-1 bg-gold rounded-full" />
                <span>Limited Seats</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
