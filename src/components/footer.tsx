import { Send } from "lucide-react"

const Footer = () => (
  <footer className="border-t border-surface-container bg-surface-container-low px-4 pt-16 pb-8 sm:px-6 md:pt-24 md:pb-12">
    <div className="mx-auto max-w-7xl">
      <div className="mb-16 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mb-24 md:gap-12 lg:grid-cols-4">
        <div className="space-y-4 md:space-y-6">
          <div className="font-headline text-2xl font-extrabold tracking-tighter text-on-surface">
            9JA Express
          </div>
          <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
            The next evolution in regional transit. Precision-engineered travel
            for the global citizen.
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          <h5 className="text-sm font-bold tracking-wider text-primary uppercase">
            Company
          </h5>
          <nav className="flex flex-col gap-3 text-sm md:gap-4 md:text-base">
            <a
              href="#"
              className="text-on-surface-variant transition-colors hover:text-primary"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-on-surface-variant transition-colors hover:text-primary"
            >
              Carrier Partners
            </a>
            <a
              href="#"
              className="text-on-surface-variant transition-colors hover:text-primary"
            >
              Mobile App
            </a>
          </nav>
        </div>

        <div className="space-y-4 md:space-y-6">
          <h5 className="text-sm font-bold tracking-wider text-primary uppercase">
            Support
          </h5>
          <nav className="flex flex-col gap-3 text-sm md:gap-4 md:text-base">
            <a
              href="#"
              className="text-on-surface-variant transition-colors hover:text-primary"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-on-surface-variant transition-colors hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-on-surface-variant transition-colors hover:text-primary"
            >
              Help Center
            </a>
          </nav>
        </div>

        <div className="space-y-4 md:space-y-6">
          <h5 className="text-sm font-bold tracking-wider text-primary uppercase">
            Newsletter
          </h5>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="grow rounded-md border-none bg-surface-container-highest px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button className="rounded-md bg-primary p-3 text-on-primary transition-opacity hover:opacity-90">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 border-t border-surface-container pt-8 md:flex-row md:pt-12">
        <p className="text-center text-xs text-outline md:text-left md:text-sm">
          © 2026 9JA Express. All rights reserved.
        </p>
        <div className="flex gap-6 md:gap-8">
          <a
            href="#"
            className="text-[10px] font-bold tracking-widest text-outline uppercase transition-colors hover:text-primary md:text-xs"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-[10px] font-bold tracking-widest text-outline uppercase transition-colors hover:text-primary md:text-xs"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-[10px] font-bold tracking-widest text-outline uppercase transition-colors hover:text-primary md:text-xs"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
