
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ContactModal } from "./ContactModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center",
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4 text-primary" : "text-white"
        )}
      >
        <div 
          className="serif text-xl md:text-2xl font-bold tracking-tighter cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          SOUL RECHARGE
        </div>

        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.2em] font-bold">
          <a href="#problem" className="hover:text-gold transition-colors">The Need</a>
          <a href="#solution" className="hover:text-gold transition-colors">The Escape</a>
          <a href="#experience" className="hover:text-gold transition-colors">The Journey</a>
          <button 
            onClick={() => setModalOpen(true)}
            className={cn(
              "border px-6 py-2 rounded-sm transition-all",
              isScrolled ? "border-gold text-gold hover:bg-gold hover:text-white" : "border-white/30 text-gold hover:border-gold hover:bg-gold hover:text-white"
            )}
          >
            Reserve Spot
          </button>
        </div>

        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 z-[60] bg-primary text-background flex flex-col items-center justify-center gap-10 transition-transform duration-500",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button 
          className="absolute top-8 right-8"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>
        <div className="flex flex-col items-center gap-8 text-2xl serif italic">
          <a href="#problem" onClick={() => setMobileMenuOpen(false)}>The Need</a>
          <a href="#solution" onClick={() => setMobileMenuOpen(false)}>The Escape</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)}>The Journey</a>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              setModalOpen(true);
            }}
            className="text-gold mt-4 font-bold tracking-widest uppercase text-xs"
          >
            Reserve Spot
          </button>
        </div>
      </div>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
