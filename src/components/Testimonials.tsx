
export function Testimonials() {
  const reviews = [
    {
      text: "Awalnya saya hanya ingin istirahat karena burnout parah... tapi saya pulang dengan arah hidup yang jauh lebih jelas. Sesi ini menyelamatkan kesehatan mental dan bisnis saya.",
      author: "Professional, 34"
    },
    {
      text: "Saya baru sadar selama ini saya hanya sibuk berlari tanpa arah. Retret ini memberi saya keberanian untuk melakukan perubahan besar yang seharusnya saya lakukan sejak lama.",
      author: "Business Owner, 41"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl italic text-center mb-20 font-headline">What They Felt</h2>
        <div className="grid md:grid-cols-2 gap-16">
          {reviews.map((review, i) => (
            <div key={i} className="relative">
              <span className="serif text-8xl text-gold/10 absolute -top-10 -left-6">&ldquo;</span>
              <div className="relative z-10">
                <p className="italic text-lg md:text-xl leading-relaxed text-primary/80 mb-8">
                  {review.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-px bg-gold" />
                  <span className="font-bold text-[10px] uppercase tracking-widest text-primary/50">
                    {review.author}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
