
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MapPin, Clock } from "lucide-react";

export function LocationSection() {
  const mistImage = PlaceHolderImages.find(img => img.id === 'mountain-mist');

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-4xl md:text-5xl italic mb-8 font-headline">Private Villa, Bogor</h2>
          <p className="text-lg text-primary/70 mb-10 leading-relaxed">
            Lingkungan alami, tenang, dan jauh dari keramaian. Dirancang khusus untuk menghadirkan ketenangan dan kejernihan pikiran yang tidak Anda dapatkan di hiruk-pikuk kota.
          </p>
          
          <div className="flex items-center gap-4 text-gold font-bold uppercase tracking-widest text-xs mb-12">
            <MapPin className="w-5 h-5" />
            <span>Detail lokasi eksklusif dikirim setelah registrasi</span>
          </div>
          
          <div className="glass-card p-10 md:p-12 rounded-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Clock className="w-32 h-32" />
            </div>
            <h3 className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-6">Limited Seats Only</h3>
            <p className="text-2xl md:text-3xl serif italic mb-6 leading-tight">
              &ldquo;Ini bukan event besar. Ini adalah pengalaman privat dan intim.&rdquo;
            </p>
            <p className="text-sm text-primary/60 leading-relaxed max-w-sm">
              Sesi ini dibatasi hanya untuk beberapa orang terpilih agar proses bimbingan tetap personal, mendalam, dan bermakna bagi setiap jiwa.
            </p>
          </div>
        </div>

        <div className="order-1 md:order-2 relative">
          <div className="rounded-sm overflow-hidden shadow-2xl">
              <Image 
                src={mistImage?.imageUrl || "/mist.jpeg"} 
                alt="Mountain Mist" 
                width={1000}
                height={667}
                className="object-contain w-full h-auto block grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                data-ai-hint="mountain mist"
              />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold/5 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}
