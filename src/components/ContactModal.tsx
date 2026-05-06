
"use client";

import { X, MessageCircle, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-background w-full max-w-lg rounded-sm shadow-2xl relative p-10 md:p-14 animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-primary/30 hover:text-primary transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h3 className="serif text-3xl md:text-4xl mb-6 italic">Hubungi Kami</h3>
          <p className="text-primary/60 text-sm mb-10 leading-relaxed">
            Pilih saluran komunikasi yang paling nyaman bagi Anda untuk konsultasi retret privat ini. Tim kami akan segera merespons Anda.
          </p>
          
          <div className="flex flex-col gap-4">
            <a 
              href="https://wa.me/6282111594146?text=Halo%20Tim%20Kembang%20Jiwa%20Organizer%2C%20saya%20tertarik%20untuk%20mengetahui%20lebih%20lanjut%20mengenai%20Titik%20Temu%20Jiwa%20Berkembang." 
              target="_blank" 
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 font-bold uppercase text-[10px] tracking-[0.2em] rounded-sm hover:brightness-110 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Konsultasi
            </a>
            
            <a 
              href="mailto:kembangjiwaorganizer@gmail.com?subject=Tanya%20Mengenai%20Kembang%20Jiwa%20Organizer"
              className="flex items-center justify-center gap-3 border border-primary/20 text-primary py-4 font-bold uppercase text-[10px] tracking-[0.2em] rounded-sm hover:bg-primary/5 transition-all"
            >
              <Mail className="w-4 h-4" />
              Kirim Email
            </a>

            <a 
              href="https://instagram.com/kembangjiwaorganizer" 
              target="_blank"
              className="flex items-center justify-center gap-3 text-primary/40 text-[10px] uppercase font-bold tracking-widest mt-4 hover:text-primary transition-colors"
            >
              <Instagram className="w-3 h-3" />
              @kembangjiwaorganizer
            </a>
          </div>

          <p className="text-[9px] mt-12 opacity-30 uppercase tracking-[0.3em]">
            Kembang Jiwa Organizer &mdash; Bogor, Indonesia
          </p>
        </div>
      </div>
    </div>
  );
}
