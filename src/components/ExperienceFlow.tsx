
"use client";

import { Sun, Moon, MapPin, Compass, CheckCircle } from "lucide-react";

export function ExperienceFlow() {
  const journey = [
    {
      time: "01",
      icon: <MapPin className="w-5 h-5" />,
      title: "Arrival",
      description: "Memasuki gerbang villa privat di Bogor. Serahkan distraksi dunia luar, biarkan ketenangan menyambut Anda."
    },
    {
      time: "02",
      icon: <Moon className="w-5 h-5" />,
      title: "Silence",
      description: "Menurunkan volume dunia. Sesi hening untuk benar-benar merasakan kehadiran diri sendiri tanpa interupsi."
    },
    {
      time: "03",
      icon: <Compass className="w-5 h-5" />,
      title: "Reflection",
      description: "Mendalami apa yang sebenarnya sedang terjadi dalam hidup dan bisnis Anda. Menemukan akar dari kelelahan Anda."
    },
    {
      time: "04",
      icon: <Sun className="w-5 h-5" />,
      title: "Clarity",
      description: "Momen 'AHA'. Menemukan jawaban yang selama ini tertutup oleh kesibukan dan ekspektasi orang lain."
    },
    {
      time: "05",
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Action Plan",
      description: "Pulang dengan ketenangan hati dan strategi langkah nyata. Anda siap melangkah kembali dengan presisi."
    }
  ];

  return (
    <section id="experience" className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold/60 tracking-[0.3em] uppercase text-[10px] font-bold mb-4 block">Titik balik dalam 24 jam</span>
          <h2 className="text-3xl md:text-5xl italic font-headline">Your 1 Night Journey</h2>
        </div>
        
        <div className="relative space-y-16">
          <div className="absolute left-4 md:left-[2.75rem] top-0 bottom-0 w-px bg-gold/10 hidden md:block" />
          
          {journey.map((item, idx) => (
            <div key={idx} className="relative flex flex-col md:flex-row gap-8 items-start">
              <div className="hidden md:flex flex-shrink-0 items-center justify-center w-14 h-14 rounded-full bg-background border border-gold/20 text-gold z-10">
                {item.icon}
              </div>
              <div className="flex-1 border-b border-primary/5 pb-12 last:border-0">
                <div className="flex items-center gap-4 mb-3">
                  <span className="serif text-3xl text-gold/20">{item.time}</span>
                  <h3 className="serif text-2xl md:text-3xl">{item.title}</h3>
                </div>
                <p className="text-primary/60 text-base md:text-lg leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
