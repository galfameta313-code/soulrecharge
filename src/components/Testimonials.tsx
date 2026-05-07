
export function Testimonials() {
  const reviews = [
    {
      text: "Tim Kembang Jiwa Organizer benar-benar luar biasa! Acara perusahaan kami berjalan dengan sangat lancar dan penuh kesan berkat perencanaan mereka yang matang.",
      author: "Manajer HRD, 34"
    },
    {
      text: "Sangat terbantu dengan profesionalisme tim. Dari konsep hingga hari H, semuanya ditangani dengan sangat baik. Sangat merekomendasikan layanan mereka!",
      author: "Pemilik Bisnis, 41"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl italic text-center mb-20 font-headline">Apa Kata Mereka</h2>
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
