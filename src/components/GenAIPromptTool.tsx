"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Sparkles, Send } from "lucide-react";

type GenerateReflectionPromptsOutput = {
  reflectionQuestions: string[];
  journalingPrompts: string[];
};

const predefinedReflectionQuestions = [
  "Apa satu hal yang paling menguras energi Anda saat ini, dan mengapa Anda masih membiarkannya?",
  "Jika Anda tidak harus membuktikan apa-apa kepada siapa pun, apa yang akan Anda ubah dari cara Anda bekerja?",
  "Di bagian mana dalam hidup Anda, Anda merasa sedang 'berlari' tetapi tidak tahu menuju ke mana?",
  "Apa ketakutan terbesar yang diam-diam menahan Anda untuk mengambil langkah selanjutnya?",
  "Seberapa sering Anda mendengarkan intuisi Anda akhir-akhir ini dibandingkan dengan ekspektasi orang lain?",
  "Kapan terakhir kali Anda merasa benar-benar damai dan cukup dengan diri Anda sendiri?",
  "Jika masalah yang Anda hadapi saat ini adalah seorang guru, apa pelajaran utama yang sedang ia coba sampaikan?",
  "Apa satu kebiasaan atau pola pikir yang sudah saatnya Anda lepaskan demi ketenangan batin Anda?"
];

const predefinedJournalingPrompts = [
  "Tuliskan 3 hal yang Anda syukuri hari ini, sekecil apapun itu, dan jelaskan mengapa hal tersebut bermakna.",
  "Bayangkan diri Anda 5 tahun dari sekarang telah berhasil melewati tantangan ini. Apa nasihat yang akan 'diri Anda di masa depan' berikan kepada Anda saat ini?",
  "Gambarkan sebuah hari ideal di mana Anda merasa sepenuhnya seimbang antara pekerjaan, istirahat, dan kehidupan pribadi. Apa yang Anda lakukan di hari itu?",
  "Tulis sebuah surat singkat berisi permintaan maaf dan pengampunan untuk diri Anda sendiri atas tekanan yang selama ini Anda pikul.",
  "Jika Anda memiliki tongkat ajaib dan bisa mengubah satu hal dalam rutinitas harian Anda besok, apakah itu, dan bagaimana perasaan Anda setelah mengubahnya?",
  "Buat daftar 5 hal yang membuat Anda merasa 'hidup' dan bersemangat. Bagaimana Anda bisa memasukkan satu dari hal tersebut ke dalam minggu Anda?",
  "Jelaskan sebuah momen di mana Anda merasa gagal, lalu temukan setidaknya dua hal positif atau kekuatan baru yang Anda peroleh dari pengalaman tersebut."
];

function getRandomElements(arr: string[], count: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function GenAIPromptTool() {
  const [challenges, setChallenges] = useState("");
  const [aspirations, setAspirations] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateReflectionPromptsOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenges || !aspirations) return;

    setLoading(true);
    
    // Simulate AI processing delay (1.5 - 2.5 seconds)
    const delay = Math.floor(Math.random() * 1000) + 1500;
    
    setTimeout(() => {
      setResult({
        reflectionQuestions: getRandomElements(predefinedReflectionQuestions, 3),
        journalingPrompts: getRandomElements(predefinedJournalingPrompts, 3),
      });
      setLoading(false);
    }, delay);
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-gold uppercase tracking-[0.2em] text-[10px] font-bold">Event Concept Tool</span>
          </div>
          <h2 className="text-3xl md:text-5xl italic font-headline mb-6">Wujudkan Konsep Acara Anda</h2>
          <p className="text-primary/60 max-w-2xl mx-auto">
            Gunakan asisten AI kami untuk mengeksplorasi ide dan konsep unik sebelum merencanakan acara Anda bersama tim kami.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2">
            <Card className="glass-card border-gold/10 shadow-xl overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-gold/10">
                <CardTitle className="serif text-xl">Inspirasi Acara</CardTitle>
                <CardDescription>Ceritakan sekilas tentang acara yang ingin Anda wujudkan.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Tujuan Acara</label>
                    <Textarea 
                      placeholder="Contoh: Peluncuran produk baru, perayaan ulang tahun perusahaan..." 
                      className="bg-white/50 border-gold/20 min-h-[120px]"
                      value={challenges}
                      onChange={(e) => setChallenges(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Tema atau Nuansa Harapan</label>
                    <Textarea 
                      placeholder="Contoh: Menginginkan suasana elegan, outdoor yang santai, atau tema futuristik..." 
                      className="bg-white/50 border-gold/20 min-h-[120px]"
                      value={aspirations}
                      onChange={(e) => setAspirations(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={loading || !challenges || !aspirations}
                    className="w-full btn-premium py-6 flex gap-2"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Hasilkan Ide Acara
                        <Send className="w-3 h-3" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gold/20 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-gold" />
                </div>
                <h3 className="serif text-2xl mb-2 text-primary/40">Hasil akan muncul di sini</h3>
                <p className="text-primary/30 max-w-xs">Isi formulir di samping untuk mendapatkan panduan konsep acara Anda.</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center p-12 space-y-6">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce"></div>
                </div>
                <p className="serif italic text-xl text-primary/60">Menyusun inspirasi untuk acara Anda...</p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="space-y-6">
                  <h3 className="serif text-3xl border-b border-gold/20 pb-4">Saran Konsep Acara</h3>
                  <div className="grid gap-4">
                    {result.reflectionQuestions.map((q, i) => (
                      <div key={i} className="bg-white/40 p-5 rounded-md border border-gold/10 hover:border-gold/30 transition-all">
                        <p className="text-primary/80 italic font-medium leading-relaxed">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="serif text-3xl border-b border-gold/20 pb-4">Rekomendasi Aktivitas</h3>
                  <div className="grid gap-4">
                    {result.journalingPrompts.map((p, i) => (
                      <div key={i} className="bg-primary/5 p-5 rounded-md border border-gold/10 hover:border-gold/30 transition-all">
                        <p className="text-primary/80 leading-relaxed">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
