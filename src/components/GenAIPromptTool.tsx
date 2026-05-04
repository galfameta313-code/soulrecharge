
"use client";

import { useState } from "react";
import { generateReflectionPrompts, type GenerateReflectionPromptsOutput } from "@/ai/flows/generate-reflection-prompts";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Sparkles, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function GenAIPromptTool() {
  const [challenges, setChallenges] = useState("");
  const [aspirations, setAspirations] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateReflectionPromptsOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenges || !aspirations) return;

    setLoading(true);
    try {
      const output = await generateReflectionPrompts({ challenges, aspirations });
      setResult(output);
    } catch (error) {
      console.error("Error generating prompts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-gold uppercase tracking-[0.2em] text-[10px] font-bold">Preparation Tool</span>
          </div>
          <h2 className="text-3xl md:text-5xl italic font-headline mb-6">Clarify Your Intentions</h2>
          <p className="text-primary/60 max-w-2xl mx-auto">
            Gunakan AI asisten kami untuk mendapatkan pertanyaan refleksi personal sebelum retret dimulai.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2">
            <Card className="glass-card border-gold/10 shadow-xl overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-gold/10">
                <CardTitle className="serif text-xl">Self-Discovery Input</CardTitle>
                <CardDescription>Beritahu kami sedikit tentang apa yang sedang Anda hadapi.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Tantangan Saat Ini</label>
                    <Textarea 
                      placeholder="Contoh: Merasa burnout di bisnis, kehilangan motivasi tim..." 
                      className="bg-white/50 border-gold/20 min-h-[120px]"
                      value={challenges}
                      onChange={(e) => setChallenges(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Aspirasi Anda</label>
                    <Textarea 
                      placeholder="Contoh: Ingin menemukan kembali passion, mencari keseimbangan..." 
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
                        Generate Prompts
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
                <p className="text-primary/30 max-w-xs">Isi formulir di samping untuk mendapatkan panduan refleksi personal Anda.</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center p-12 space-y-6">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce"></div>
                </div>
                <p className="serif italic text-xl text-primary/60">Menyusun pertanyaan untuk jiwa Anda...</p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="space-y-6">
                  <h3 className="serif text-3xl border-b border-gold/20 pb-4">Reflection Questions</h3>
                  <div className="grid gap-4">
                    {result.reflectionQuestions.map((q, i) => (
                      <div key={i} className="bg-white/40 p-5 rounded-md border border-gold/10 hover:border-gold/30 transition-all">
                        <p className="text-primary/80 italic font-medium leading-relaxed">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="serif text-3xl border-b border-gold/20 pb-4">Journaling Prompts</h3>
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
