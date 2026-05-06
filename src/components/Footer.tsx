
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
            <h3 className="serif text-4xl mb-4 font-bold italic">Soul Recharge</h3>
            <p className="text-[10px] opacity-40 uppercase tracking-[0.3em] mb-8 font-bold">
              The Clarity Retreat Experience
            </p>
            <p className="text-sm opacity-60 leading-relaxed">
              Sebuah perjalanan spiritual yang dirancang khusus untuk memulihkan kejernihan pikiran dan kesadaran diri.
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-[10px] opacity-40 font-bold tracking-[0.3em] uppercase">Contact Channels</p>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <a href="https://wa.me/6282111594146" target="_blank" className="hover:text-gold transition-colors opacity-80">+62 821-1159-4146 (WhatsApp)</a>
              <a href="mailto:hello.soulrecharge7@gmail.com" className="hover:text-gold transition-colors opacity-80">hello.soulrecharge7@gmail.com</a>
              <a href="https://instagram.com/soulrecharge.id" target="_blank" className="hover:text-gold transition-colors opacity-80">Instagram: @soulrecharge.id</a>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[10px] opacity-40 font-bold tracking-[0.3em] uppercase">Quick Links</p>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <Link href="/#problem" className="hover:text-gold transition-colors opacity-80">The Need</Link>
              <Link href="/#solution" className="hover:text-gold transition-colors opacity-80">The Escape</Link>
              <Link href="/#experience" className="hover:text-gold transition-colors opacity-80">The Journey</Link>
              <button onClick={() => setModalOpen(true)} className="text-gold font-bold uppercase text-left">Reserve Spot</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-30">
          <div>&copy; 2024 Soul Recharge. All Rights Reserved.</div>
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
