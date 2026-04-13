import { Route } from "@/routes/confirmation"
import { data as mockData } from "@/data/mockData"
import { useNavigate } from "@tanstack/react-router"
import { CheckCircle, Download, Bus, Home, Info } from "lucide-react"

const ConfirmationPage = () => {
  const params = Route.useSearch()
  const navigate = useNavigate()

  const bus = mockData.buses.find((b) => b.id === params.busId)

  if (!bus || !params.seatNumbers || params.seatNumbers.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 px-4 text-center">
        <Info className="mb-4 text-outline" size={48} />
        <h2 className="font-headline text-2xl font-bold">No Booking Found</h2>
        <p className="mt-2 text-on-surface-variant">
          We couldn't find the details for your confirmation. Your session may have expired.
        </p>
        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-on-primary shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          Return to Home
        </button>
      </div>
    )
  }

  const handleHome = () => navigate({ to: "/" })

  // Generate an aesthetic Fake Barcode to look like a real boarding pass
  const barcodeBars = Array.from({ length: 42 }).map((_, i) => {
    const width = [1, 2, 3, 4, 1, 2][Math.floor(Math.random() * 6)]
    return <div key={i} className="h-full bg-on-surface" style={{ width: `${width}px` }} />
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:py-28">
      <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:items-start lg:gap-20">
        
        {/* Left Column: Success Narrative */}
        <div className="flex max-w-lg flex-1 flex-col justify-center space-y-8 text-center lg:sticky lg:top-32 lg:text-left">
          <div className="space-y-6">
            <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-green-500/10 text-green-500 lg:mx-0">
              <CheckCircle size={40} strokeWidth={2.5} />
            </div>
            
            <h1 className="font-headline text-4xl leading-tight font-black tracking-tight text-on-surface md:text-5xl lg:text-6xl">
              Your journey is <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700">
                confirmed
              </span>.
            </h1>
            
            <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">
              We've successfully processed your payment. We sent your digital boarding pass and receipt to <strong>{params.email || "your email"}</strong>.
            </p>
          </div>
          
          <div className="flex flex-col justify-center gap-4 pt-6 sm:flex-row lg:justify-start">
            <button className="signature-gradient flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              <Download size={20} />
              Download Receipt
            </button>
            <button
              onClick={handleHome}
              className="group flex items-center justify-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest px-8 py-4 font-bold transition-all hover:border-primary/30 hover:bg-primary/5 active:scale-95"
            >
              <Home size={20} className="text-on-surface-variant transition-colors group-hover:text-primary" />
              Back to Home
            </button>
          </div>
        </div>

        {/* Right Column: Digital Ticket Card */}
        <div className="relative w-full max-w-[420px] flex-1">
          {/* Ambient Glow */}
          <div className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-primary/20 blur-[80px] md:h-96 md:w-96"></div>
          
          {/* Ticket Container */}
          <div className="relative flex flex-col overflow-hidden rounded-[2.5rem] bg-surface-container-lowest shadow-2xl shadow-primary/10 ring-1 ring-outline-variant/10">
            
            {/* Ticket Header Segment */}
            <div className="signature-gradient relative px-8 py-8 text-white md:px-10 md:py-10">
              <div className="mb-8 flex items-start justify-between opacity-90">
                <div>
                  <p className="mb-1 text-[10px] font-bold tracking-[0.2em] uppercase">
                    Operator
                  </p>
                  <p className="font-headline font-bold">
                    {bus.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="mb-1 text-[10px] font-bold tracking-[0.2em] uppercase">
                    Booking Ref
                  </p>
                  <p className="font-mono text-sm tracking-wider">PMT-XY90</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                  <h2 className="font-headline text-4xl font-black tracking-tight drop-shadow-sm md:text-5xl">
                    {bus.from.substring(0, 3).toUpperCase()}
                  </h2>
                  <p className="mt-1 text-xs font-medium tracking-widest uppercase opacity-80 md:text-sm">
                    {bus.from}
                  </p>
                </div>
                
                <div className="relative flex w-16 justify-center">
                  <div className="absolute top-1/2 w-full border-t-[3px] border-dashed border-white/40"></div>
                  <div className="relative bg-[#004AC6] px-2 text-white">
                    <Bus size={24} />
                  </div>
                </div>
                
                <div className="flex-1 text-right">
                  <h2 className="font-headline text-4xl font-black tracking-tight drop-shadow-sm md:text-5xl">
                    {bus.to.substring(0, 3).toUpperCase()}
                  </h2>
                  <p className="mt-1 text-xs font-medium tracking-widest uppercase opacity-80 md:text-sm">
                    {bus.to}
                  </p>
                </div>
              </div>
            </div>

            {/* Cutout Separator Effect */}
            <div className="relative flex items-center justify-between bg-surface-container-lowest">
              <div className="-ml-4 h-8 w-8 rounded-full bg-surface-container-low shadow-inner"></div>
              <div className="h-[2px] grow border-t-2 border-dashed border-outline-variant/30"></div>
              <div className="-mr-4 h-8 w-8 rounded-full bg-surface-container-low shadow-inner"></div>
            </div>

            {/* Ticket Details Segment */}
            <div className="space-y-8 px-8 py-8 md:px-10 md:py-10">
              <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                <div>
                  <p className="mb-1.5 text-[9px] font-bold tracking-[0.15em] text-outline uppercase md:text-[11px]">
                    Passenger
                  </p>
                  <p className="truncate font-semibold text-on-surface md:text-lg">
                    {params.fullName || "Guest User"}
                  </p>
                  <p className="mt-1 text-xs text-on-surface-variant truncate">
                    {params.phone || "No phone provided"}
                  </p>
                </div>
                
                <div>
                  <p className="mb-1.5 text-[9px] font-bold tracking-[0.15em] text-outline uppercase md:text-[11px]">
                    Seat Allocation
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {params.seatNumbers.map((seat) => (
                      <span key={seat} className="rounded bg-primary/10 px-2 py-0.5 text-sm font-bold text-primary md:text-base">
                        {seat}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1 text-xs font-medium text-on-surface-variant">
                    {bus.type} Class
                  </p>
                </div>
                
                <div>
                  <p className="mb-1.5 text-[9px] font-bold tracking-[0.15em] text-outline uppercase md:text-[11px]">
                    Departure Date
                  </p>
                  <p className="font-semibold text-on-surface md:text-lg">
                    Oct 24, 2024
                  </p>
                </div>
                
                <div>
                  <p className="mb-1.5 text-[9px] font-bold tracking-[0.15em] text-outline uppercase md:text-[11px]">
                    Boarding Time
                  </p>
                  <p className="font-semibold text-error md:text-lg">
                    {bus.departureTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated Barcode Segment */}
            <div className="flex flex-col items-center bg-surface-container-lowest px-8 py-8 pt-0 outline-none">
              <div className="mb-4 flex h-16 w-full items-center justify-center gap-[2px] overflow-hidden opacity-80 md:h-20">
                {barcodeBars}
              </div>
              <p className="font-mono text-xs tracking-[0.3em] text-on-surface-variant">
                10934898234-AXZ
              </p>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default ConfirmationPage
