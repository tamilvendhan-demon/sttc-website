const posts = [
  {
    title: "Top 5 tax filing mistakes to avoid",
    excerpt: "Learn how to avoid common documentation and filing problems before they become expensive.",
    tag: "Tax Planning",
  },
  {
    title: "Why GST compliance matters for growing businesses",
    excerpt: "A clear view of how streamlined GST processes can reduce issues and improve cash flow.",
    tag: "GST Advisory",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c99a45]">Latest Insights</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-[#0b3733] sm:text-4xl">Practical knowledge for better financial decisions</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {posts.map((post) => (
            <article key={post.title} className="rounded-[24px] border border-[#d8c892] bg-[#f6f0de] p-8 shadow-[0_16px_35px_rgba(11,55,51,0.04)] transition hover:-translate-y-1">
              <span className="inline-flex rounded-full bg-[#0b3733] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f6f0de]">
                {post.tag}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-[#0b3733]">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#4a473d]">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
