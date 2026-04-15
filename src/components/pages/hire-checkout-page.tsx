import { useEffect, useState } from "react"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { useNavigate } from "@tanstack/react-router"
import { Route } from "@/routes/hire-checkout"
import { data as mockData } from "@/data/mockData"
import {
  generateHireBookingRef,
  saveHireBooking,
} from "@/lib/hireBookingStorage"
import usePaystack from "@/lib/paystack"
import { format } from "date-fns"
import {
  Navigation,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Lock,
  // Bus,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  nextOfKinName: z.string().max(20),
  nextOfKinRelationship: z.string(),
  nextOfKinPhone: z
    .string()
    .min(10, "Phone number must be at least 10 numbers"),
  specialRequests: z
    .string()
    .max(60, "special request length cannot exceed 60 characters"),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

export const HireCheckoutPage = () => {
  const { vehicles, totals, totalDays, origin, destination, start, end } =
    Route.useSearch()
  const navigate = useNavigate()
  const [isPaying, setIsPaying] = useState(false)

  const parsedVehicles = vehicles ? JSON.parse(vehicles) : {}
  const parsedTotals = totals ? JSON.parse(totals) : {}

  const onSuccess = (formData: CheckoutForm) => {
    setIsPaying(false)
    const ref = generateHireBookingRef()
    saveHireBooking({
      bookingRef: ref,
      selectedVehicles: parsedVehicles,
      totals: parsedTotals,
      totalDays: totalDays || 1,
      origin: origin || "",
      destination: destination || "",
      startDate: start,
      endDate: end,
      fullName: formData.fullName,
      email: formData.email,
      phone: Number(formData.phone),
      nextOfKinName: formData.nextOfKinName,
      nextOfKinRelationship: formData.nextOfKinRelationship,
      nextOfKinPhone: Number(formData.nextOfKinPhone),
      specialRequests: formData.specialRequests,
      bookedAt: new Date().toISOString(),
    })
    navigate({
      to: "/hire-confirmation",
      replace: true,
      search: {
        bookingRef: ref,
        fullName: formData.fullName,
        vehicles,
        totals,
        totalDays,
        origin,
        destination,
        start,
        end,
      },
    })
  }

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      nextOfKinName: "",
      nextOfKinRelationship: "",
      nextOfKinPhone: "",
      specialRequests: "",
    },
    validators: {
      onChange: checkoutSchema,
      // onSubmit: checkoutSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("payment processing")
      // console.log();
      setIsPaying(true)
      console.log("email", value.email)
      initializePayment()
    },

    // validatorAdapter: zodValidator(),
  })

  useEffect(() => {
    console.log(form.state.errors)
  })
  // console.log(form.)

  const { initializePayment } = usePaystack({
    amount: parsedTotals.subtotal || 0,
    email: form.getFieldValue("email"), // Will be set from form
    onSuccess: () => onSuccess(form.state.values), // Handled in form submit
    onError: () => setIsPaying(false),
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20">
      <div className="flex flex-col gap-12 lg:flex-row">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          id="hire-checkout-form"
          className="space-y-10 lg:w-[70%]"
        >
          {/* Trip Summary Section (Read-only) */}
          <section className="rounded-xl bg-surface-container-low p-8">
            <div className="mb-6 flex items-start justify-between">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface-variant">
                Trip Summary
              </h2>
              <button
                type="button"
                className="text-sm font-semibold text-primary hover:underline"
              >
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
                    {origin || "Origin"} → {destination || "Destination"}
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
                    {start && end
                      ? `${format(new Date(start), "MMM do")} - ${format(new Date(end), "MMM do")} (${totalDays} Days Trip)`
                      : `${totalDays || 1} Days Trip`}
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
            <form.Field
              name="fullName"
              children={(field) => (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-on-surface-variant">
                    Full Name
                  </label>
                  <input
                    className={`w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                      field.state.meta.errors.length
                        ? "border-error focus:border-error focus:ring-error/20"
                        : ""
                    }`}
                    placeholder="Enter your full name"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {!field.state.meta.isValid && (
                    <p className="text-error text-sm">
                      {field.state.meta.errors
                        .map((error) => error?.message)
                        .join(", ")}
                    </p>
                  )}
                </div>
              )}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <form.Field
                name="email"
                children={(field) => {
                  console.log("email-error", field.state.meta.errors)
                  return (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-on-surface-variant">
                        Email Address
                      </label>
                      <div className="flex flex-col items-center">
                        <input
                          className={`w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            field.state.meta.errors.length
                              ? "border-error focus:border-error focus:ring-error/20"
                              : ""
                          }`}
                          placeholder="email@example.com"
                          type="email"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {!field.state.meta.isValid && (
                          <p className="text-error text-sm">
                            {field.state.meta.errors
                              .map((error) => error?.message)
                              .join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                }}
              />
              <form.Field
                name="phone"
                validators={{
                  onChange: checkoutSchema.shape.phone,
                }}
                children={(field) => (
                  <div className="space-y-2">
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
                      {/* <div className="flex flex-col items-center"> */}
                      <input
                        className={`w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 pl-24 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                          !field.state.meta.isValid
                            ? "border-error focus:border-error focus:ring-error/20"
                            : ""
                        }`}
                        placeholder="803 000 0000"
                        type="tel"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {/* </div> */}
                    </div>
                    {!field.state.meta.isValid && (
                      <p className="text-error text-sm">
                        {field.state.meta.errors
                          .map((error) => error?.message)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </section>

          {/* Next of Kin */}
          <section className="space-y-6">
            <h2 className="font-headline text-2xl font-bold tracking-tight">
              Next of Kin
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <form.Field
                name="nextOfKinName"
                children={(field) => (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-on-surface-variant">
                      Kin Name
                    </label>
                    <input
                      className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
              <form.Field
                name="nextOfKinRelationship"
                children={(field) => (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-on-surface-variant">
                      Relationship
                    </label>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger className="w-full! rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                        <SelectValue
                          placeholder="Select relationship "
                          className="my-0!"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Spouse">Spouse</SelectItem>
                        <SelectItem value="Parent">Parent</SelectItem>
                        <SelectItem value="Sibling">Sibling</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              <form.Field
                name="nextOfKinPhone"
                children={(field) => (
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-semibold text-on-surface-variant">
                      Kin Phone Number
                    </label>
                    <input
                      className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      type="tel"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
            </div>
          </section>

          {/* Special Requests */}
          <section className="space-y-6">
            <h2 className="font-headline text-2xl font-bold tracking-tight">
              Special Requests
            </h2>
            <form.Field
              name="specialRequests"
              children={(field) => (
                <textarea
                  className="w-full resize-none rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Any specific requirements for your charter? (e.g., child seats, preferred stopovers, luggage size...)"
                  rows={5}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </section>
        </form>

        {/* Right Column (30%) - Sticky Booking Summary */}
        <div className="lg:w-[30%]">
          <div className="sticky top-32 space-y-6">
            <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm ring-1 ring-outline-variant/20">
              <h2 className="mb-6 font-headline text-xl font-bold">
                Booking Summary
              </h2>
              {/* Vehicle List */}
              <div className="mb-8 space-y-4">
                {Object.entries(parsedVehicles).map(([id, count]) => {
                  const vehicle = mockData.charterFleet?.find(
                    (v) => v.id === id
                  )
                  if (!vehicle) return null
                  return (
                    <div key={id} className="group flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-lg bg-surface-container">
                        <img
                          className="h-full w-full object-cover"
                          src={vehicle.imageURL}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-on-surface">
                          {vehicle.model}
                        </p>
                        <p className="text-sm text-outline">
                          Qty: {count as number}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-surface-container-high pt-6 text-sm">
                <div className="flex justify-between text-outline">
                  <span>Base Rate ({totalDays} Days)</span>
                  <span>₦{parsedTotals.baseCost?.toLocaleString()}</span>
                </div>
                {parsedTotals.residenceSurcharge > 0 && (
                  <div className="flex justify-between text-outline">
                    <span>Residence Pickup</span>
                    <span>
                      ₦{parsedTotals.residenceSurcharge?.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-outline">
                  <span>Retain Fee</span>
                  <span>₦{parsedTotals.retainTotal?.toLocaleString()}</span>
                </div>
                {parsedTotals.driverAccomodationFee > 0 && (
                  <div className="flex justify-between text-outline">
                    <span>Driver Lodging</span>
                    <span>
                      ₦{parsedTotals.driverAccomodationFee?.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between border-t border-surface-container-high pt-4">
                  <span className="font-headline text-lg font-bold text-on-surface">
                    Total
                  </span>
                  <span className="text-2xl font-black tracking-tighter text-primary">
                    ₦{parsedTotals.subtotal?.toLocaleString()}
                  </span>
                </div>
              </div>
              {/* CTA */}
              <div className="mt-8 space-y-4">
                <form.Subscribe
                  selector={(state) => [
                    state.canSubmit,
                    state.isSubmitting,
                    state.isValid,
                    state.isFormValid,
                  ]}
                  children={([
                    canSubmit,
                    // isSubmitting,
                    // isValid,
                    // isFormValid,
                  ]) => {
                    console.log("canSubmit", canSubmit)
                    // console.log("isFormValid", isFormValid)
                    // console.log("isSubmitting", isSubmitting)
                    // console.log("isValid", isValid)
                    return (
                      <Button
                        type="submit"
                        disabled={
                          // isFormValid
                          !canSubmit
                          // ||
                          // !isValid
                          //  ||
                          // isPaying
                          //  ||
                          // isSubmitting
                        }
                        form="hire-checkout-form"
                        className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-on-surface py-5 text-lg font-bold text-surface transition-colors hover:bg-on-surface/90 disabled:cursor-none disabled:opacity-50"
                      >
                        <Lock size={20} fill="currentColor" />
                        <span>
                          {isPaying
                            ? "Processing..."
                            : `Pay ₦${parsedTotals.subtotal?.toLocaleString()} Now`}
                        </span>
                        <ArrowRight
                          className="transition-transform group-hover:translate-x-1"
                          size={20}
                        />
                      </Button>
                    )
                  }}
                />
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
