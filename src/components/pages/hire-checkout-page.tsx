import { useNavigate } from "@tanstack/react-router"
import {
  Navigation,
  Calendar,
  ArrowRight,
  ShieldCheck,
  // Bus,
  // CheckCircle,
  // Check,
  // Info,
  // Download,
} from "lucide-react"

export const HireCheckoutPage = () => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    console.log("navigate to confirmation page")
    navigate({ to: "/hire-confirmation" })
  }
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20">
      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Left Column (70%) */}
        <div className="space-y-10 lg:w-[70%]">
          {/* Trip Summary Section (Read-only) */}
          <section className="rounded-xl bg-surface-container-low p-8">
            <div className="mb-6 flex items-start justify-between">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface-variant">
                Trip Summary
              </h2>
              <button className="text-sm font-semibold text-primary hover:underline">
                Edit Logistics
              </button>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-surface-container-lowest p-3">
                  <Navigation className="text-primary" size={24} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold tracking-wider text-outline uppercase">
                    Route
                  </p>
                  <p className="text-lg font-semibold text-on-surface">
                    Terminal Pickup (Kano) → Portharcourt
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-surface-container-lowest p-3">
                  <Calendar className="text-primary" size={24} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold tracking-wider text-outline uppercase">
                    Duration
                  </p>
                  <p className="text-lg font-semibold text-on-surface">
                    Apr 14th - Apr 16th (3 Days Trip)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Details */}
          <section className="space-y-6">
            <h2 className="font-headline text-2xl font-bold tracking-tight">
              Contact Details
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant">
                  Full Name
                </label>
                <input
                  className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your full name"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant">
                  Email Address
                </label>
                <input
                  className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="email@example.com"
                  type="email"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-on-surface-variant">
                  Phone Number
                </label>
                <div className="relative flex">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <img
                      alt="Nigeria Flag"
                      className="h-auto w-5 rounded-sm"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWnNt3df90jiRJMgof3Ct0qrV_qL-_KPS8EQsmGE61jEog3uXEfSG-WWdaVwgKx_t8jExnykMu4-US8SFSBtbqkweWtrzxyoJWO_c9wcz_joc-Cohf1jggjBrWlbCciUKeabcIkc_ckD8DUXxrm56ctUXsMPhOW7_96M1frh_Bm7fbMMgZgAOlJ_g73fyoPxKHVdEaL4KgIKWoRalBrVhCDbWRZOKcLM7zNOItLjNbKgMAoPcIn9yaHzUIXujQ3_6uSWQ0UWnhXAnN"
                    />
                    <span className="ml-2 font-medium text-on-surface-variant">
                      +234
                    </span>
                  </div>
                  <input
                    className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 pl-24 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="803 000 0000"
                    type="tel"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Next of Kin */}
          <section className="space-y-6">
            <h2 className="font-headline text-2xl font-bold tracking-tight">
              Next of Kin
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant">
                  Kin Name
                </label>
                <input
                  className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant">
                  Relationship
                </label>
                <select className="w-full appearance-none rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                  <option>Spouse</option>
                  <option>Parent</option>
                  <option>Sibling</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-on-surface-variant">
                  Kin Phone Number
                </label>
                <input
                  className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  type="tel"
                />
              </div>
            </div>
          </section>

          {/* Special Requests */}
          <section className="space-y-6">
            <h2 className="font-headline text-2xl font-bold tracking-tight">
              Special Requests
            </h2>
            <textarea
              className="w-full resize-none rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Any specific requirements for your charter? (e.g., child seats, preferred stopovers, luggage size...)"
              rows={5}
            ></textarea>
          </section>
        </div>

        {/* Right Column (30%) - Sticky Booking Summary */}
        <div className="lg:w-[30%]">
          <div className="sticky top-32 space-y-6">
            <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm ring-1 ring-slate-200/50">
              <h2 className="mb-6 font-headline text-xl font-bold">
                Booking Summary
              </h2>
              {/* Vehicle List */}
              <div className="mb-8 space-y-4">
                <div className="group flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-lg bg-surface-container">
                    <img
                      className="h-full w-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBox9tFULbSchR7l1VTfxRXJYZi-0pWNNnsz_6Ko7XtIAsmdTwhj_IAbRr6X8rO1cIc3hvPzK6x6dLR72m8DOWIqoAaG10U2rWob0ztDxjAHL_5AG8QDwDehmphbkWyi7o2MJNHevXtkZyR9cDvVvYpOQ-y80RFfRvQw_XZGzVtHOuQV_h9ZZENYgseugWtU8aCC848Fn-OZ_8UQJh1d6jXpvgmxg-uTXc9UMxj1fUm3DCF47YywibwVsWDz7Kya6mNGONkLUgUT7vQ"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface">Toyota Sienna</p>
                    <p className="text-sm text-outline">Qty: 4</p>
                  </div>
                </div>
                <div className="group flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-lg bg-surface-container">
                    <img
                      className="h-full w-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMyfGhnllqdfw9C76nH2ttpdt3w7COlXQvTnnqYuzBqaPGXok3vL1jN46hI0qGy2CACbwUR89_tF7Czf3JWHU-QzZjQ0xUySZevRKVbFyRWWnlA3Yuulcu-J1TR02RNEIacR5XbzVlIIfjpJy0aVZ2IhtqoeANAwhXlEIIGgApFH_0H8ZczU1eLmHOF-kYhwrIA3-q2wtc_vgJeTlwyB3SA5Mx2Q8AmR3GmKnQRCYzrbEzbsDMsNHRAweVP6O2hypWUW7qV_lGLVb5"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface">Hyundai H-1</p>
                    <p className="text-sm text-outline">Qty: 1</p>
                  </div>
                </div>
              </div>
              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-surface-container-high pt-6 text-sm">
                <div className="flex justify-between text-outline">
                  <span>Base Rate (3 Days)</span>
                  <span>₦1,950,000</span>
                </div>
                <div className="flex justify-between text-outline">
                  <span>Retain Fee</span>
                  <span>₦255,000</span>
                </div>
                <div className="flex justify-between text-outline">
                  <span>Driver Lodging</span>
                  <span>₦150,000</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-surface-container-high pt-4">
                  <span className="font-headline text-lg font-bold text-on-surface">
                    Total
                  </span>
                  <span className="text-2xl font-black tracking-tighter text-primary">
                    ₦2,355,000
                  </span>
                </div>
              </div>
              {/* CTA */}
              <div className="mt-8 space-y-4">
                <button
                  onClick={handleNavigate}
                  className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#191c1e] py-5 text-lg font-bold text-white transition-colors hover:bg-black"
                >
                  <span>Pay ₦2,355,000 Now</span>
                  <ArrowRight
                    className="transition-transform group-hover:translate-x-1"
                    size={20}
                  />
                </button>
                <div className="flex flex-col items-center gap-3">
                  <p className="text-[10px] font-bold tracking-widest text-outline uppercase">
                    Secured by
                  </p>
                  <div className="flex items-center gap-4 opacity-70 grayscale transition-all hover:grayscale-0">
                    <img
                      alt="Paystack"
                      className="h-4"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxTRU8n79UGOTFEgBfx7bkiIsE7lo34aatfubfCTztLbpRFaCAOFU1jrQ0SSn465WSpii6xf_U3fJKS46EOkaYgPlRLEjFDXxlMhnkCuiWO0J2bt0mZLbTbbLrauE0bgTC6o3RJdDtlMXeYvD2mLFdpBU9d3Fm8ujsvQIlXdp2ZQjCmwG4uvP9hawACsDiVk87uCly9uE0lL-ExwzcUY3YUDurb9QoOqgKrdsMrgwVSICYi0pG4h1VNU11TbZasLJFUcrzo5uiwNm3"
                    />
                    <div className="h-3 w-px bg-outline/30"></div>
                    <img
                      alt="Flutterwave"
                      className="h-4"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyRLZbODKQt5maBBEp81jBOg5XO6BL_QN0RTsVeJI6kR_x7dZCHyRvnc2Hn07HqKLN-4x_7DxILoTSu7IL9DywsdhjuUM3Bxm1nLxGfbMjgXvJabyMSBIUeQVWj3qtdXo-_M5mGxJ7x0vw0FOtRnsW2fUaYdqkgoNA1xtbCeOoObaY-MdG1KTtZ3Zk5862-Y57SZm8miwInVV6JTXl9OWCBlS6ITrpvtSiyTPtcGDw-fIifRSsT6vQzeQnHHZj5zHrWraXOHZJoDfp"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Trust Badge Card */}
            <div className="flex gap-4 rounded-xl border border-primary/10 bg-primary/5 p-4">
              <ShieldCheck className="text-primary" size={24} />
              <div>
                <p className="text-sm font-bold text-primary">
                  Insurance Covered
                </p>
                <p className="text-xs text-on-surface-variant">
                  All EaseUp charters include comprehensive passenger insurance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
