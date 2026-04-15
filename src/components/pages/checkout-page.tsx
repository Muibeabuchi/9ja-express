import { useState } from "react"
import { Wallet, Bus, CalendarDays, Lock, Info } from "lucide-react"
import { Route } from "@/routes/checkout"
import { data as mockData } from "@/data/mockData"
import { useNavigate } from "@tanstack/react-router"
import { generateBookingRef, saveBooking } from "@/lib/bookingStorage"
import { format } from "date-fns"
import usePaystack from "@/lib/paystack"

const CheckoutPage = () => {
  const { busId, seatNumbers, departureDate } = Route.useSearch()
  const navigate = useNavigate()

  const [bookingDetails, setBookingDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    nextOfKinName: "",
    nextOfKinPhone: "",
  })

  // Attempt to load the selected bus
  const bus = mockData.buses.find((b) => b.id === busId)

  const onConfirm = () => {
    console.log("paystack payment was successfull")
    const ref = generateBookingRef()

    saveBooking({
      bookingRef: ref,
      busId,
      seatNumbers,
      fullName: bookingDetails.fullName,
      email: bookingDetails.email,
      phone: bookingDetails.phone,
      // nextOfKinName: bookingDetails.nextOfKinName,
      // nextOfKinPhone: bookingDetails.nextOfKinPhone,
      departureDate,
      bookedAt: new Date().toISOString(),
    })

    console.log("i am about to navigate")
    navigate({
      to: "/confirmation",
      search: {
        bookingRef: ref,
        departureDate: departureDate,
      },
    })
  }
  const totalFare = !bus ? 0 : bus.price * seatNumbers.length
  const bookingFee = 3500 * seatNumbers.length
  const totalAmount = totalFare + bookingFee

  const isNameValid = bookingDetails.fullName.trim().length > 2
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingDetails.email)
  const isPhoneValid = bookingDetails.phone.trim().length >= 10
  const isKinNameValid = bookingDetails.nextOfKinName.trim().length > 2
  const isKinPhoneValid = bookingDetails.nextOfKinPhone.trim().length >= 10
  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isKinNameValid &&
    isKinPhoneValid

  const { initializePayment } = usePaystack({
    amount: totalAmount,
    email: bookingDetails.email,
    onSuccess: onConfirm,
  })

  if (!bus || !seatNumbers || seatNumbers.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 px-4 text-center">
        <Info className="mb-4 text-outline" size={48} />
        <h2 className="font-headline text-2xl font-bold">Invalid Booking</h2>
        <p className="mt-2 text-on-surface-variant">
          Your booking details are missing or have expired.
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
      <div className="flex flex-col gap-8 md:gap-12 lg:flex-row">
        {/* Left Section: Checkout Form */}
        <div className="grow space-y-8 md:space-y-12">
          <section>
            <h1 className="mb-2 font-headline text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">
              Complete your booking
            </h1>
            <p className="text-sm text-on-surface-variant md:text-base">
              Review your details and secure your kinetic transit pass.
            </p>
          </section>

          {/* Guest Checkout Section */}
          <section className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-3">
              <div className="signature-gradient flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white">
                1
              </div>
              <h2 className="font-headline text-xl font-bold">
                Guest Checkout
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] font-bold tracking-widest text-outline uppercase">
                  FULL NAME
                </label>
                <input
                  className={`h-12 rounded-lg border-none bg-surface-container-lowest px-4 text-sm ring-1 transition-all outline-none focus:ring-2 focus:ring-primary ${
                    bookingDetails.fullName && !isNameValid
                      ? "ring-error focus:ring-error"
                      : "ring-outline-variant/20"
                  }`}
                  placeholder="John Doe"
                  type="text"
                  value={bookingDetails.fullName}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] font-bold tracking-widest text-outline uppercase">
                  EMAIL ADDRESS
                </label>
                <input
                  className={`h-12 rounded-lg border-none bg-surface-container-lowest px-4 text-sm ring-1 transition-all outline-none focus:ring-2 focus:ring-primary ${
                    bookingDetails.email && !isEmailValid
                      ? "ring-error focus:ring-error"
                      : "ring-outline-variant/20"
                  }`}
                  placeholder="john@example.com"
                  type="email"
                  value={bookingDetails.email}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-label text-[10px] font-bold tracking-widest text-outline uppercase">
                  PHONE NUMBER
                </label>
                <div className="flex gap-3">
                  <div className="flex h-12 items-center rounded-lg border-none bg-surface-container-low px-4 text-sm font-medium text-on-surface-variant ring-1 ring-outline-variant/20">
                    +234
                  </div>
                  <input
                    className={`h-12 grow rounded-lg border-none bg-surface-container-lowest px-4 text-sm ring-1 transition-all outline-none focus:ring-2 focus:ring-primary ${
                      bookingDetails.phone && !isPhoneValid
                        ? "ring-error focus:ring-error"
                        : "ring-outline-variant/20"
                    }`}
                    placeholder="812 345 6789"
                    type="tel"
                    value={bookingDetails.phone}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:col-span-1">
                <label className="font-label text-[10px] font-bold tracking-widest text-outline uppercase">
                  NEXT OF KIN NAME
                </label>
                <input
                  className={`h-12 rounded-lg border-none bg-surface-container-lowest px-4 text-sm ring-1 transition-all outline-none focus:ring-2 focus:ring-primary ${
                    bookingDetails.nextOfKinName && !isKinNameValid
                      ? "ring-error focus:ring-error"
                      : "ring-outline-variant/20"
                  }`}
                  placeholder="Jane Doe"
                  type="text"
                  value={bookingDetails.nextOfKinName}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      nextOfKinName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-1">
                <label className="font-label text-[10px] font-bold tracking-widest text-outline uppercase">
                  NEXT OF KIN PHONE
                </label>
                <div className="flex gap-3">
                  <div className="flex h-12 items-center rounded-lg border-none bg-surface-container-low px-4 text-sm font-medium text-on-surface-variant ring-1 ring-outline-variant/20">
                    +234
                  </div>
                  <input
                    className={`h-12 grow rounded-lg border-none bg-surface-container-lowest px-4 text-sm ring-1 transition-all outline-none focus:ring-2 focus:ring-primary ${
                      bookingDetails.nextOfKinPhone && !isKinPhoneValid
                        ? "ring-error focus:ring-error"
                        : "ring-outline-variant/20"
                    }`}
                    placeholder="812 345 6789"
                    type="tel"
                    value={bookingDetails.nextOfKinPhone}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        nextOfKinPhone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Method Section */}
          <section className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-highest text-sm font-bold text-on-surface-variant">
                2
              </div>
              <h2 className="font-headline text-xl font-bold">
                Payment Method
              </h2>
            </div>
            <div className="space-y-6 rounded-xl bg-surface-container-low p-6 md:p-8">
              <div className="flex items-center justify-between rounded-lg border-2 border-primary bg-surface-container-lowest p-4">
                <div className="flex items-center gap-4">
                  <Wallet className="text-primary" size={24} />
                  <div>
                    <p className="text-sm font-bold md:text-base">
                      Pay with Paystack
                    </p>
                    <p className="text-xs text-on-surface-variant md:text-sm">
                      Securely pay with Cards, Bank, or USSD
                    </p>
                  </div>
                </div>
                <div className="h-5 w-5 rounded-full border-4 border-primary bg-primary"></div>
              </div>
              <button
                disabled={!isFormValid}
                onClick={initializePayment}
                className="signature-gradient flex h-14 w-full items-center justify-center gap-3 rounded-xl text-base font-bold text-white shadow-[0_40px_40px_-15px_rgba(0,74,198,0.15)] transition-transform active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 md:h-16 md:text-lg"
              >
                <Lock size={20} fill="currentColor" />
                Pay with Paystack
              </button>
              <p className="text-center text-[10px] text-on-surface-variant md:text-xs">
                Your payment is encrypted and processed securely. By clicking
                "Pay with Paystack", you agree to our Terms of Service.
              </p>
            </div>
          </section>
        </div>

        {/* Right Section: Summary Card */}
        <aside className="w-full shrink-0 lg:w-[400px]">
          <div className="space-y-6 lg:sticky lg:top-32">
            <div className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-[0_40px_40px_-15px_rgba(25,28,30,0.04)] md:p-8">
              <h3 className="mb-6 font-headline text-xl font-bold">
                Trip Summary
              </h3>
              <div className="space-y-6">
                {/* Trip Details */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-lg bg-primary/10 p-3 text-primary">
                    <Bus size={24} />
                  </div>
                  <div className="grow">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-on-surface md:text-base">
                          {bus.from} to {bus.to}
                        </p>
                        <p className="text-xs text-on-surface-variant md:text-sm">
                          {bus.name} • {seatNumbers.length}{" "}
                          {seatNumbers.length === 1 ? "Seat" : "Seats"} (
                          {seatNumbers.sort((a, b) => a - b).join(", ")})
                        </p>
                      </div>
                      <p className="text-sm font-bold whitespace-nowrap text-primary md:text-base">
                        ₦{totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[10px] text-on-surface-variant md:text-xs">
                      <CalendarDays size={16} />
                      {departureDate
                        ? format(new Date(departureDate), "MMM dd, yyyy")
                        : "Date TBD"}{" "}
                      • {bus.departureTime}
                    </div>
                  </div>
                </div>
                <div className="h-px bg-surface-container-highest"></div>
                {/* Pricing Details */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">
                      Ticket Fare ({seatNumbers.length}x)
                    </span>
                    <span>₦{totalFare.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">
                      Booking Fee ({seatNumbers.length}x)
                    </span>
                    <span>₦{bookingFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">VAT (7.5%)</span>
                    <span>Included</span>
                  </div>
                </div>
                <div className="h-px bg-surface-container-highest"></div>
                {/* Total */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-label text-[10px] font-bold tracking-widest text-outline uppercase">
                      TOTAL AMOUNT
                    </p>
                    <p className="text-2xl font-black text-on-surface md:text-3xl">
                      ₦{totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="bg-secondary-container text-on-secondary-container inline-flex items-center rounded px-2 py-1 text-[10px] font-bold tracking-wider uppercase">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Promo Code Block */}
            <div className="flex gap-3 rounded-xl bg-surface-container-low p-4">
              <input
                className="h-10 grow rounded-lg border-none bg-surface-container-lowest px-4 text-sm ring-1 ring-outline-variant/20 outline-none"
                placeholder="Promo code"
                type="text"
              />
              <button className="rounded-lg bg-on-surface px-4 text-sm font-bold text-surface transition-transform active:scale-95">
                Apply
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default CheckoutPage
