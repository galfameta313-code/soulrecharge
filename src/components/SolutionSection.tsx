
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function SolutionSection() {
  const villaImage = PlaceHolderImages.find(img => img.id === 'villa-bogor');
  
  return (
    <section id="solution" className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-6 relative flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        <div className="md:w-1/2 relative">
          <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl">
            <Image 
              src={villaImage?.imageUrl || "https://picsum.photos/seed/soul-villa/1000/1000"} 
              alt="Private Villa Bogor" 
              width={1000}
              height={1000}
              className="object-cover aspect-[4/5] md:aspect-square"
              data-ai-hint="luxury villa"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-gold/30 z-0" />
          <div className="absolute -top-6 -right-6 w-32 h-32 border-r border-t border-gold/30 z-0" />
        </div>

        <div className="md:w-1/2 flex flex-col items-start text-left">
          <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-6">The Solution</span>
          <h2 className="text-4xl md:text-5xl mb-8 italic font-headline">This is Where You Reset</h2>
          <p className="text-lg text-primary/80 mb-10 leading-relaxed">
            Soul Recharge bukan sekadar liburan. Ini adalah ruang sakral untuk berhenti sejenak, melepas kebisingan, dan kembali menemukan pusat diri Anda.
          </p>
          
          <ul className="space-y-6 mb-12">
            {[
              "Menangkan pikiran yang penuh dari distraksi digital",
              "Mendengarkan kembali suara batin yang selama ini terabaikan",
              "Menyusun ulang arah hidup dengan kejernihan hati"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-primary/90 font-medium">
                <span className="flex-shrink-0 w-2 h-2 bg-gold rounded-full" />
                {item}
              </li>
            ))}
          </ul>
          
          <div className="border-l-2 border-gold pl-8 py-2">
            <p className="serif italic text-xl md:text-2xl text-primary/70 leading-relaxed">
              &ldquo;Bukan pelarian. Ini adalah titik balik.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
