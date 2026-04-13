import type { SearchParams } from "@/types"
import {
  ArrowLeftRight,
  ArrowRight,
  Calendar as CalendarIcon,
  Navigation,
  Search,
  Users,
  MapPin,
  ChevronDown,
} from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import { format } from "date-fns"
import { useNavigate } from "@tanstack/react-router"

import { data as mockData } from "../data/mockData"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { isValidBookingRef } from "@/lib/bookingStorage"

const today = new Date()
today.setHours(0, 0, 0, 0)

const SearchWidget = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string>("passengers")
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    tripType: "one-way",
  })

  const disabled =
    searchParams.tripType === "round-trip"
      ? !searchParams.from ||
        !searchParams.to ||
        !searchParams.departureDate ||
        !searchParams.returnDate
      : !searchParams.from || !searchParams.to || !searchParams.departureDate
  const handleSearch = () => {
    if (disabled) {
      return
    }
    navigate({
      to: "/search-results",
      search: {
        from: searchParams.from,
        to: searchParams.to,
        departureDate: searchParams.departureDate,
        returnDate: searchParams.returnDate,
        tripType: searchParams.tripType,
      },
    })
  }

  const [trackRef, setTrackRef] = useState("")
  const [trackError, setTrackError] = useState("")

  const handleTrackTrip = () => {
    if (!trackRef) {
      setTrackError("Please enter a booking reference")
      return
    }
    
    // Auto-format for validation
    let formattedRef = trackRef.trim().toUpperCase()
    if (!formattedRef.startsWith("PMT-")) {
      formattedRef = "PMT-" + formattedRef
    }
    
    if (!isValidBookingRef(formattedRef)) {
      setTrackError("Reference must be 12 chars (e.g. PMT-A1B2C3D4)")
      return
    }
    
    setTrackError("")
    navigate({
      to: "/manage-booking",
      search: { ref: formattedRef }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative z-30 mx-auto -mt-20 max-w-6xl px-4 sm:px-6 md:-mt-32"
    >
      <div className="no-scrollbar flex items-end overflow-x-auto">
        <Tabs
          defaultValue="passengers"
          className="w-full"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="mt-3 space-x-3 bg-transparent p-0">
            <TabsTrigger
              value="passengers"
              className={cn(
                "flex items-center gap-2 rounded-t-2xl rounded-b-none border-x border-t border-transparent bg-surface/60 px-6 py-3.5 text-sm font-bold whitespace-nowrap text-on-surface backdrop-blur-md transition-all data-[state=active]:border-outline-variant/20 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-primary data-[state=active]:shadow-none md:px-8 md:py-4 md:text-base"
              )}
            >
              <Users size={18} />
              Book a Trip
            </TabsTrigger>
            <TabsTrigger
              value="track-your-trip"
              className={cn(
                "flex items-center gap-2 rounded-t-2xl rounded-b-none border-x border-t border-transparent bg-surface/60 px-6 py-3.5 text-sm font-bold whitespace-nowrap text-on-surface backdrop-blur-md transition-all data-[state=active]:border-outline-variant/20 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-primary data-[state=active]:shadow-none md:px-8 md:py-4 md:text-base"
              )}
            >
              <Navigation size={18} />
              Track Trip
            </TabsTrigger>
          </TabsList>

          <div className="ambient-shadow overflow-hidden rounded-tr-3xl rounded-b-3xl border-2 border-outline-variant/20 bg-surface-container-lowest p-5 md:p-8">
            <TabsContent value="passengers" className="mt-0">
              <div className="space-y-6 md:space-y-8">
                {/* Trip Type Toggle */}
                <div className="flex gap-2 pb-1">
                  <button
                    onClick={() =>
                      setSearchParams({ ...searchParams, tripType: "one-way" })
                    }
                    className={cn(
                      "flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all md:text-sm",
                      searchParams.tripType === "one-way"
                        ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                        : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                    )}
                  >
                    <ArrowRight size={14} />
                    One Way
                  </button>
                  <button
                    onClick={() =>
                      setSearchParams({
                        ...searchParams,
                        tripType: "round-trip",
                      })
                    }
                    className={cn(
                      "flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all md:text-sm",
                      searchParams.tripType === "round-trip"
                        ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                        : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                    )}
                  >
                    <ArrowLeftRight size={14} />
                    Round Trip
                  </button>
                </div>

                {/* Search Bar Container */}
                <div className="flex flex-col divide-y divide-outline-variant/20 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20 md:flex-row md:items-center md:divide-x md:divide-y-0">
                  {/* From Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="group flex w-full flex-1 flex-col justify-center overflow-hidden rounded-2xl px-5 py-4 text-left transition-colors outline-none hover:bg-surface-container-low/50 focus:bg-surface-container-low md:rounded-full md:py-3">
                        <div className="mb-1 flex items-center gap-1.5 opacity-70 transition-opacity group-hover:opacity-100">
                          <MapPin size={12} className="text-primary" />
                          <span className="text-[10px] font-bold tracking-widest text-outline uppercase md:text-xs">
                            From
                          </span>
                        </div>
                        <div className="flex w-full items-center justify-between">
                          <span
                            className={cn(
                              "truncate text-base font-bold md:text-lg",
                              !searchParams.from && "text-outline/60"
                            )}
                          >
                            {searchParams.from || "Leaving from"}
                          </span>
                          <ChevronDown size={16} className="text-outline/50" />
                        </div>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 rounded-2xl p-2"
                      align="start"
                    >
                      {mockData.locations.map((loc) => (
                        <DropdownMenuItem
                          key={loc}
                          onClick={() =>
                            setSearchParams({ ...searchParams, from: loc })
                          }
                          className="cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold"
                        >
                          {loc}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* To Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="group flex w-full flex-1 flex-col justify-center overflow-hidden rounded-2xl px-5 py-4 text-left transition-colors outline-none hover:bg-surface-container-low/50 focus:bg-surface-container-low md:rounded-none md:py-3">
                        <div className="mb-1 flex items-center gap-1.5 opacity-70 transition-opacity group-hover:opacity-100">
                          <MapPin size={12} className="text-primary" />
                          <span className="text-[10px] font-bold tracking-widest text-outline uppercase md:text-xs">
                            To
                          </span>
                        </div>
                        <div className="flex w-full items-center justify-between">
                          <span
                            className={cn(
                              "truncate text-base font-bold md:text-lg",
                              !searchParams.to && "text-outline/60"
                            )}
                          >
                            {searchParams.to || "Going to"}
                          </span>
                          <ChevronDown size={16} className="text-outline/50" />
                        </div>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 rounded-2xl p-2"
                      align="start"
                    >
                      {mockData.locations.map((loc) => (
                        <DropdownMenuItem
                          key={loc}
                          onClick={() =>
                            setSearchParams({ ...searchParams, to: loc })
                          }
                          className="cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold"
                        >
                          {loc}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Departure Date */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="group flex w-full flex-1 flex-col justify-center rounded-2xl px-5 py-4 text-left transition-colors outline-none hover:bg-surface-container-low/50 focus:bg-surface-container-low md:rounded-none md:py-3">
                        <div className="mb-1 flex items-center gap-1.5 opacity-70 transition-opacity group-hover:opacity-100">
                          <CalendarIcon size={12} className="text-primary" />
                          <span className="text-[10px] font-bold tracking-widest text-outline uppercase md:text-xs">
                            Depart
                          </span>
                        </div>
                        <span
                          className={cn(
                            "truncate text-base font-bold md:text-lg",
                            !searchParams.departureDate && "text-outline/60"
                          )}
                        >
                          {searchParams.departureDate
                            ? format(
                                new Date(searchParams.departureDate),
                                "MMM dd, yyyy"
                              )
                            : "Add dates"}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto rounded-3xl p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        disabled={{ before: today }}
                        selected={
                          searchParams.departureDate
                            ? new Date(searchParams.departureDate)
                            : undefined
                        }
                        onSelect={(date) =>
                          date &&
                          setSearchParams({
                            ...searchParams,
                            departureDate: format(date, "yyyy-MM-dd"),
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  {/* Return Date (if round trip) */}
                  {searchParams.tripType === "round-trip" && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="group flex w-full flex-1 flex-col justify-center rounded-2xl px-5 py-4 text-left transition-colors outline-none hover:bg-surface-container-low/50 focus:bg-surface-container-low md:rounded-none md:py-3">
                          <div className="mb-1 flex items-center gap-1.5 opacity-70 transition-opacity group-hover:opacity-100">
                            <CalendarIcon size={12} className="text-primary" />
                            <span className="text-[10px] font-bold tracking-widest text-outline uppercase md:text-xs">
                              Return
                            </span>
                          </div>
                          <span
                            className={cn(
                              "truncate text-base font-bold md:text-lg",
                              !searchParams.returnDate && "text-outline/60"
                            )}
                          >
                            {searchParams.returnDate
                              ? format(
                                  new Date(searchParams.returnDate),
                                  "MMM dd, yyyy"
                                )
                              : "Add dates"}
                          </span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto rounded-3xl p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          disabled={[
                            { before: today },
                            ...(searchParams.departureDate
                              ? [
                                  {
                                    before: new Date(
                                      searchParams.departureDate
                                    ),
                                  },
                                ]
                              : []),
                          ]}
                          selected={
                            searchParams.returnDate
                              ? new Date(searchParams.returnDate)
                              : undefined
                          }
                          onSelect={(date) =>
                            date &&
                            setSearchParams({
                              ...searchParams,
                              returnDate: format(date, "yyyy-MM-dd"),
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}

                  {/* Search Button */}
                  <div className="md:pl-2">
                    <Button
                      onClick={handleSearch}
                      disabled={disabled}
                      className="my-1 flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-sm font-black tracking-wider text-on-primary uppercase shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-95 md:h-16 md:w-36 md:rounded-full md:py-0 md:text-base lg:w-48"
                    >
                      <Search size={18} strokeWidth={2.5} />
                      <span className="md:hidden lg:inline">Search</span>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="track-your-trip" className="mt-0">
              <div className="flex flex-col items-center justify-center py-6">
                <div className={cn("flex w-full max-w-2xl flex-col rounded-4xl border bg-surface-container-low p-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20 sm:flex-row", trackError ? "border-error focus-within:ring-error/20" : "border-outline-variant/20")}>
                  <div className="flex grow items-center gap-4 px-6 py-4 sm:py-3">
                    <Navigation className={cn("shrink-0", trackError ? "text-error" : "text-primary")} size={24} />
                    <div className="grow">
                      <label className="mb-0.5 block text-[10px] font-bold tracking-widest text-outline uppercase sm:text-xs">
                        {trackError ? <span className="text-error">{trackError}</span> : "Booking Reference"}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. PMT-A1B2C3D4"
                        value={trackRef}
                        onChange={(e) => {
                          setTrackRef(e.target.value)
                          if (trackError) setTrackError("")
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleTrackTrip()}
                        className="w-full border-none bg-transparent p-0 text-base font-bold text-on-surface placeholder-outline/40 outline-none focus:ring-0 sm:text-lg"
                      />
                    </div>
                  </div>

                  <div className="w-full p-1 sm:w-auto">
                    <button 
                      onClick={handleTrackTrip}
                      className="w-full rounded-full bg-primary px-8 py-4 text-xs font-black tracking-widest text-on-primary uppercase shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:py-5 sm:text-sm">
                      Track
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  )
}

export default SearchWidget
