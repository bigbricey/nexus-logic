import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass px-8 py-4 rounded-full">
          <div className="text-2xl font-bold text-gradient tracking-tighter">
            NEXUS LOGIC
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/70">
            <Link href="#servers" className="hover:text-white transition-colors">The Bundle</Link>
            <Link href="#features" className="hover:text-white transition-colors">Why MCP?</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <div>
            <Link href="#pricing" className="btn-primary text-sm">
              Get the Bundle
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-accent uppercase glass rounded-full animate-float">
            Release 1.0 — February 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
            The World's Most <br />
            <span className="text-gradient">Intelligent Connectors</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
            Stop letting your AI guess. Give your agents direct access to the world's most critical data with our premium suite of 5 high-performance MCP servers.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <a href="https://theokoles-ai.lemonsqueezy.com/checkout/buy/2603860d-bd5f-4188-afbe-a2c7df01d5cb" className="btn-primary px-10 py-4 text-lg w-full md:w-auto">
              Unlock the Bundle — $99
            </a>
            <Link href="#servers" className="glass px-10 py-4 text-lg font-bold rounded-full hover:bg-white/5 transition-all w-full md:w-auto">
              Explore Servers
            </Link>
          </div>
        </div>
      </section>

      {/* Servers Grid */}
      <section id="servers" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Logic Bundle</h2>
            <p className="text-white/50 text-lg">5 Industrial-Grade MCP Servers, One Unified Access.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                <span className="text-2xl text-accent">📈</span>
              </div>
              <h3 className="text-xl font-bold mb-3">SEC Pulse</h3>
              <p className="text-white/60 leading-relaxed">
                Real-time EDGAR filing retrieval with AI-powered financial risk analysis. Essential for quant and investment agents.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-accent-secondary/20 flex items-center justify-center mb-6">
                <span className="text-2xl text-accent-secondary">🔬</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Scientific Sentinel</h3>
              <p className="text-white/60 leading-relaxed">
                Deep-search across ArXiv and PubMed. Auto-maps research trends and identifies breakthrough citations.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                <span className="text-2xl text-accent">📍</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Local Lead Scraper</h3>
              <p className="text-white/60 leading-relaxed">
                GMaps extraction with AI identity verification. Finds the decision-makers on LinkedIn automatically.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-accent-secondary/20 flex items-center justify-center mb-6">
                <span className="text-2xl text-accent-secondary">🔥</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Social Sentiment</h3>
              <p className="text-white/60 leading-relaxed">
                Real-time narrative tracking for X and Reddit. Detects viral momentum before it hits the mainstream.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                <span className="text-2xl text-accent">🧬</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Biotech Intel</h3>
              <p className="text-white/60 leading-relaxed">
                Aggregated FDA pipeline tracking and clinical trial results. The edge for pharmaceutical R&D agents.
              </p>
            </div>

            <div className="card flex flex-col items-center justify-center border-dashed border-white/20 hover:border-accent">
              <div className="text-white/30 text-sm font-medium mb-2">LIMITED TIME OFFER</div>
              <div className="text-3xl font-bold text-gradient">$99 FOR ALL 5</div>
              <p className="text-white/40 text-xs mt-2">Regular Price: $495</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass p-12 rounded-[3rem] text-center border-accent/20">
          <h2 className="text-4xl font-bold mb-6">Own the Entire Bundle Today</h2>
          <p className="text-white/60 text-lg mb-8">
            Get lifetime access to all 5 premium MCP servers, including all updates for 2026.
          </p>
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="text-sm text-accent font-bold tracking-widest uppercase mb-2">LIMITED LAUNCH OFFER</div>
            <div className="flex items-end">
              <span className="text-6xl font-extrabold">$99</span>
              <span className="text-white/30 text-xl ml-2 line-through mb-1">$495</span>
            </div>
            <p className="text-white/40 text-sm mt-4 italic">Next 50 licenses only. 84% claimed.</p>
          </div>
          <a href="https://theokoles-ai.lemonsqueezy.com/checkout/buy/2603860d-bd5f-4188-afbe-a2c7df01d5cb" className="btn-primary px-12 py-5 text-xl font-bold w-full md:w-auto shadow-[0_0_50px_rgba(56,189,248,0.3)] inline-block">
            Go to Secure Checkout
          </a>
          <div className="mt-8 flex items-center justify-center space-x-6 text-white/40 grayscale opacity-50">
            <span className="text-xs font-medium">SECURE PAYMENTS BY</span>
            <div className="text-sm font-bold opacity-100 grayscale-0 text-white/60">LemonSqueezy</div>
            <div className="text-sm font-bold opacity-100 grayscale-0 text-white/60">Stripe</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-white/40 text-sm">
          <div>© 2026 Nexus Logic. Built by Antigravity Agency.</div>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
