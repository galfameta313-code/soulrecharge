
export function ProblemSection() {
  const problems = [
    {
      title: "Terlalu banyak berpikir",
      description: "Pikiran yang bising menyulitkan Anda menemukan jawaban yang paling jujur."
    },
    {
      title: "Kehilangan Arah",
      description: "Terus bergerak sangat cepat, tapi mulai bertanya-tanya apakah jalannya sudah benar."
    },
    {
      title: "Kesuksesan yang Kosong",
      description: "Secara eksternal semua tampak baik, namun ada kekosongan yang tidak bisa dijelaskan."
    },
    {
      title: "Putusnya Koneksi",
      description: "Terlalu sibuk melayani dunia hingga lupa cara mendengar suara batin sendiri."
    }
  ];

  return (
    <section id="problem" className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl italic font-headline">You&rsquo;re Not Tired. You&rsquo;re Disconnected.</h2>
          <div className="w-20 h-px bg-gold mx-auto opacity-40" />
        </div>
        
        <div className="text-lg text-primary/70 leading-relaxed max-w-3xl mx-auto mb-16">
          <p>Kamu bukan sekadar lelah secara fisik. Kamu merasa kehilangan sesuatu yang esensial di tengah kesibukan yang tak pernah usai.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 mt-12 text-left">
          {problems.map((problem, idx) => (
            <div key={idx} className="p-8 border-l border-gold/20 hover:border-gold/50 transition-colors group">
              <h3 className="serif text-xl md:text-2xl mb-4 group-hover:text-gold transition-colors">{problem.title}</h3>
              <p className="text-primary/60 text-sm md:text-base leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
