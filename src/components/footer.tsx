import { Send } from "lucide-react"

const Footer = () => (
  <footer className="relative max-w-full overflow-hidden midnight-panel px-4 py-20 text-white sm:px-6 md:py-28">
    <div className="mx-auto max-w-7xl">
      <div className="mb-16 grid grid-cols-1 gap-10 md:mb-24 md:gap-12 lg:grid-cols-4">
        <div className="space-y-6">
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/18 bg-white/10 shadow-[0_0_28px_rgba(255,255,255,0.12)] backdrop-blur-md">
                <span className="font-body text-sm font-black tracking-[0.22em] text-white">
                  9JA
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="font-body text-sm font-black tracking-[0.28em] text-white uppercase drop-shadow-[0_0_18px_rgba(255,255,255,0.22)]">
                  9JA Express
                </div>
                <div className="text-[0.68rem] font-semibold tracking-[0.22em] text-white/58 uppercase">
                  Trusted road journeys
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/78 md:text-base">
            The next evolution in regional transit. Precision-engineered travel
            for the global citizen.
          </p>
        </div>

        <div className="space-y-6">
          <h5 className="text-sm font-bold tracking-wider text-[color:var(--golden-hour-soft)] uppercase">
            Company
          </h5>
          <nav className="flex flex-col gap-4 text-sm md:text-base">
            <a
              href="#"
              className="text-white/78 transition-colors hover:text-[color:var(--golden-hour-soft)]"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-white/78 transition-colors hover:text-[color:var(--golden-hour-soft)]"
            >
              Carrier Partners
            </a>
            <a
              href="#"
              className="text-white/78 transition-colors hover:text-[color:var(--golden-hour-soft)]"
            >
              Mobile App
            </a>
          </nav>
        </div>

        <div className="space-y-6">
          <h5 className="text-sm font-bold tracking-wider text-[color:var(--golden-hour-soft)] uppercase">
            Services
          </h5>
          <nav className="flex flex-col gap-4 text-sm md:text-base">
            <a
              href="#"
              className="text-white/78 transition-colors hover:text-[color:var(--golden-hour-soft)]"
            >
              Book a Trip
            </a>
            <a
              href="#"
              className="text-white/78 transition-colors hover:text-[color:var(--golden-hour-soft)]"
            >
              Hire Fleet
            </a>
            <a
              href="#"
              className="text-white/78 transition-colors hover:text-[color:var(--golden-hour-soft)]"
            >
              Enterprise Solutions
            </a>
          </nav>
        </div>

        <div className="space-y-6">
          <h5 className="text-sm font-bold tracking-wider text-[color:var(--golden-hour-soft)] uppercase">
            Join the Journey
          </h5>
          <p className="text-sm text-white/78">
            Stay connected with route updates, exclusive offers, and travel insights.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="grow rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur-md focus:border-white/30 focus:ring-2 focus:ring-white/20"
            />
            <button className="rounded-xl bg-[color:var(--golden-hour)] p-3 text-[color:var(--deep-midnight)] transition-all hover:bg-[color:var(--golden-hour-soft)] hover:scale-105">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:pt-12">
        <p className="text-center text-xs text-white/60 md:text-left md:text-sm">
          © 2026 9JA Express. All rights reserved.
        </p>
        <div className="flex gap-6 md:gap-8">
          <a
            href="#"
            className="text-[10px] font-bold tracking-widest text-white/60 uppercase transition-colors hover:text-[color:var(--golden-hour-soft)] md:text-xs"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-[10px] font-bold tracking-widest text-white/60 uppercase transition-colors hover:text-[color:var(--golden-hour-soft)] md:text-xs"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-[10px] font-bold tracking-widest text-white/60 uppercase transition-colors hover:text-[color:var(--golden-hour-soft)] md:text-xs"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
