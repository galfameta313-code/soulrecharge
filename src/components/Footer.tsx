
"use client";

import { useState } from "react";
import { ContactModal } from "./ContactModal";
import Link from "next/link";

export function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <footer className="bg-primary py-24 text-background">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-12 mb-20">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.jpeg" alt="Kembang Jiwa Organizer Logo" className="w-10 h-10 rounded-full object-cover" />
              <h3 className="serif text-4xl font-bold italic">Kembang Jiwa Organizer</h3>
            </div>
            <p className="text-[10px] opacity-40 uppercase tracking-[0.3em] mb-8 font-bold">
              Titik Temu Jiwa Berkembang
            </p>
            <p className="text-sm opacity-60 leading-relaxed">
              Layanan event organizer profesional untuk merancang dan mewujudkan acara bermakna yang tak terlupakan bagi Anda.
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-[10px] opacity-40 font-bold tracking-[0.3em] uppercase">Contact Channels</p>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <a href="https://wa.me/628131399366" target="_blank" className="hover:text-gold transition-colors opacity-80">+62 813-1399-366 (WhatsApp)</a>
              <a href="mailto:kembangjiwaorganizer@gmail.com" className="hover:text-gold transition-colors opacity-80">kembangjiwaorganizer@gmail.com</a>
              <a href="https://instagram.com/kembangjiwaorganizer" target="_blank" className="hover:text-gold transition-colors opacity-80">Instagram: @kembangjiwaorganizer</a>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[10px] opacity-40 font-bold tracking-[0.3em] uppercase">Quick Links</p>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <Link href="/#problem" className="hover:text-gold transition-colors opacity-80">Visi</Link>
              <Link href="/#solution" className="hover:text-gold transition-colors opacity-80">Solusi Kami</Link>
              <Link href="/#experience" className="hover:text-gold transition-colors opacity-80">Layanan</Link>
              <button onClick={() => setModalOpen(true)} className="text-gold font-bold uppercase text-left">Konsultasi Acara</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-30">
          <div>&copy; 2024 Kembang Jiwa Organizer. All Rights Reserved.</div>
          <div className="flex gap-6">
            <span>Bogor, Indonesia</span>
            <span>Est. 2024</span>
          </div>
        </div>
      </div>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </footer>
  );
}
