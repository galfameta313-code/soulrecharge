"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useEffect, useRef } from "react";

const images = [
  { src: "/Gallery/Kegiatan 1.jpeg", caption: "Kegiatan Retreat" },
  { src: "/Gallery/kegiatan 2.png", caption: "Momen Kebersamaan" },
  { src: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1000&auto=format&fit=crop", caption: "Ketenangan Jiwa" },
  { src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop", caption: "Meditasi Pagi" },
  { src: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=1000&auto=format&fit=crop", caption: "Alam & Kesadaran" },
  { src: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=1000&auto=format&fit=crop", caption: "Perjalanan Batin" },
  { src: "https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=1000&auto=format&fit=crop", caption: "Pemulihan Diri" },
];

const videos = [
  { src: "https://www.youtube.com/embed/jfKfPfyJRdk", title: "Suasana Retreat" },
  { src: "https://www.youtube.com/embed/inpok4MKVLM", title: "Meditasi Bersama" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <main className="min-h-screen bg-background text-primary selection:bg-gold selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-44 pb-16 px-8 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
        />
        <AnimatedSection>
          <p className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-5">Visual Journey</p>
          <h1 className="serif text-5xl md:text-7xl font-bold italic mb-6">Moments of Clarity</h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6 opacity-60" />
          <p className="text-base md:text-lg opacity-70 max-w-xl mx-auto leading-relaxed">
            Sekilas pandang ke dalam pengalaman Kembang Jiwa Organizer — kumpulan memori dari perjalanan spiritual, pemulihan, dan kebersamaan.
          </p>
        </AnimatedSection>

        {/* Tabs */}
        <AnimatedSection delay={150}>
          <div className="flex items-center justify-center gap-2 mt-12">
            {(["photos", "videos"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-8 py-3 text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300"
                style={{
                  color: activeTab === tab ? "var(--color-gold, #C9A84C)" : "inherit",
                  opacity: activeTab === tab ? 1 : 0.5,
                }}
              >
                {tab === "photos" ? "Galeri Foto" : "Video Kegiatan"}
                {activeTab === tab && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-px bg-gold"
                    style={{ backgroundColor: "var(--color-gold, #C9A84C)" }}
                  />
                )}
              </button>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="pb-32 px-8 md:px-12 max-w-7xl mx-auto">

        {/* Photos Section */}
        {activeTab === "photos" && (
          <AnimatedSection>
            {/* Masonry Grid */}
            <div
              style={{
                columns: "3 280px",
                columnGap: "1.25rem",
              }}
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-lg mb-5 cursor-pointer break-inside-avoid"
                  style={{
                    boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  }}
                  onClick={() => setLightbox(img)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 2px var(--color-gold, #C9A84C), 0 8px 32px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.18)";
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-auto block object-cover"
                    style={{ display: "block" }}
                  />
                  {/* Hover Overlay */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: "linear-gradient(to top, rgba(26,20,14,0.85) 0%, rgba(26,20,14,0.3) 60%, transparent 100%)" }}
                  >
                    {/* Zoom icon */}
                    <div
                      className="mb-3 w-11 h-11 rounded-full flex items-center justify-center border border-white/60"
                      style={{ background: "rgba(201,168,76,0.15)", backdropFilter: "blur(4px)" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </div>
                    <p className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase opacity-90">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Videos Section */}
        {activeTab === "videos" && (
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              {videos.map((vid, idx) => (
                <div key={idx} className="group">
                  <div
                    className="aspect-video relative rounded-lg overflow-hidden transition-all duration-400"
                    style={{
                      boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                      border: "1px solid rgba(201,168,76,0.2)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 2px var(--color-gold, #C9A84C), 0 12px 40px rgba(0,0,0,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.2)";
                    }}
                  >
                    <iframe
                      src={vid.src}
                      title={vid.title}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-center mt-4 text-sm font-semibold tracking-[0.15em] uppercase opacity-70">{vid.title}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
          style={{ background: "rgba(10,8,5,0.92)", backdropFilter: "blur(12px)" }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-white opacity-70 hover:opacity-100 transition-opacity text-sm tracking-widest uppercase flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Tutup
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="w-full h-auto rounded-lg object-contain"
              style={{ maxHeight: "80vh", boxShadow: "0 0 0 1px rgba(201,168,76,0.4), 0 32px 80px rgba(0,0,0,0.6)" }}
            />
            <p
              className="text-center mt-5 text-sm font-semibold tracking-[0.25em] uppercase"
              style={{ color: "var(--color-gold, #C9A84C)" }}
            >
              {lightbox.caption}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
