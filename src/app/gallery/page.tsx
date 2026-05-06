import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function GalleryPage() {
  const images = [
    "/Gallery/kegiatan1.png",
    "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=1000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=1000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1519834785169-98be25ce9e8c?q=80&w=1000&auto=format&fit=crop", 
  ];

  const videos = [
    "https://www.youtube.com/embed/jfKfPfyJRdk", 
    "https://www.youtube.com/embed/inpok4MKVLM", 
  ];

  return (
    <main className="min-h-screen bg-background text-primary selection:bg-gold selection:text-white">
      <Navbar />

      <section className="pt-40 pb-20 px-8 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-6">Visual Journey</p>
          <h1 className="serif text-5xl md:text-7xl font-bold italic mb-8">Moments of Clarity</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
            Sekilas pandang ke dalam pengalaman Kembang Jiwa Organizer. Kumpulan memori dari perjalanan spiritual, pemulihan, dan kebersamaan.
          </p>
        </div>

        {/* Photos Section */}
        <div className="mb-32">
          <h2 className="serif text-3xl font-bold italic mb-10 text-center">Galeri Foto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((src, idx) => (
              <div key={idx} className="aspect-square relative overflow-hidden rounded-md group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={src} 
                  alt={`Gallery image ${idx + 1}`} 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div>
          <h2 className="serif text-3xl font-bold italic mb-10 text-center">Video Kegiatan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((src, idx) => (
              <div key={idx} className="aspect-video relative rounded-md overflow-hidden bg-primary/5">
                <iframe 
                  src={src} 
                  title={`Video ${idx + 1}`}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
