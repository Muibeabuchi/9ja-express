import type { SearchParams } from "@/types"
import {
  ArrowLeftRight,
  ArrowRight,
  Bus,
  Calendar as CalendarIcon,
  Home,
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
import type { DateRange } from "react-day-picker"

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
import { isValidBookingRef, isValidHireRef } from "@/lib/bookingStorage"

const today = new Date()
today.setHours(0, 0, 0, 0)

const heroFieldClassName =
  "group relative flex w-full flex-1 flex-col justify-center overflow-hidden border-b border-white/12 px-5 py-4 text-left transition-all duration-300 outline-none hover:bg-white/6 focus-within:bg-white/8 focus-within:border-white/24 md:min-h-24 md:border-b-0 md:border-r md:border-white/12 md:px-6 md:py-5"

const heroFieldLabelClassName =
  "mb-2 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-white/62 md:text-[11px]"

const heroFieldValueClassName =
  "truncate text-base font-bold text-white md:text-lg"

const getHeroLabelTextClassName = (heroMode: boolean) =>
  heroMode
    ? "font-bold uppercase text-white/62"
    : "text-[10px] font-bold tracking-widest text-outline uppercase md:text-xs"

type SearchWidgetProps = {
  heroMode?: boolean
}

const SearchWidget = ({ heroMode = false }: SearchWidgetProps) => {
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
    searchParams.tripType === "hire"
      ? !searchParams.from ||
        !searchParams.to ||
        !searchParams.departureDate ||
        !searchParams.returnDate
      : searchParams.tripType === "round-trip"
        ? !searchParams.from ||
          !searchParams.to ||
          !searchParams.departureDate ||
          !searchParams.returnDate
        : !searchParams.from || !searchParams.to || !searchParams.departureDate

  const handleSearch = () => {
    if (disabled) {
      return
    }

    if (searchParams.tripType === "hire") {
      navigate({
        to: "/hire-fleet",
        search: {
          mode: "hire",
          originType: searchParams.originType || "terminal",
          origin: searchParams.from,
          destination: searchParams.to,
          start: searchParams.departureDate,
          end: searchParams.returnDate || searchParams.departureDate,
        },
      })
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
    const formattedRef = trackRef.trim().toUpperCase()
    // if (!formattedRef.startsWith("PMT-") || !formattedRef.startsWith("CHT-")) {
    //   formattedRef = "PMT-" + formattedRef
    // }

    const isHire = formattedRef.startsWith("CHT-")
    if (isHire) {
      if (!isValidHireRef(formattedRef)) {
        setTrackError("Reference must be 12 chars (e.g. CHT-A1B2C3D4)")
        return
      }
    } else {
      if (!isValidBookingRef(formattedRef)) {
        setTrackError("Reference must be 12 chars (e.g. PMT-A1B2C3D4)")
        return
      }
    }

    setTrackError("")
    navigate({
      to: "/manage-booking",
      search: { ref: formattedRef },
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: heroMode ? 40 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: heroMode ? 0.42 : 0.2,
        type: heroMode ? "spring" : "tween",
        stiffness: heroMode ? 90 : undefined,
        damping: heroMode ? 18 : undefined,
      }}
      className={cn(
        "relative mx-auto w-full max-w-5xl px-4 sm:px-6"
        // heroMode ? "z-40 will-change-transform" : "z-30",
        // heroMode ? "" : "-mt-20 md:-mt-32"
      )}
    >
      <div className="mb-4 flex max-w-full items-end overflow-x-hidden">
        <Tabs
          defaultValue="passengers"
          className="w-full max-w-full"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList
            className={cn(
              "mt-3 max-w-full bg-transparent p-0",
              // heroMode
              //   ? "inline-flex flex-wrap rounded-full border border-white/12 bg-white/7 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-lg"
              "space-x-3"
            )}
          >
            <TabsTrigger
              value="passengers"
              className={cn(
                "flex items-center gap-2 px-6 py-3.5 text-sm font-bold whitespace-nowrap backdrop-blur-md transition-all md:px-8 md:py-4 md:text-base",
                // heroMode
                // ?
                // "focus:ring-none rounded-full border border-transparent text-white/74 data-[state=active]:border-white/14 data-[state=active]:bg-white/18 data-[state=active]:text-white"
                // :
                "bg-surface/60 text-on-surface data-[state=active]:border-outline-variant/20 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-primary data-[state=active]:shadow-none"
              )}
            >
              <Users size={18} />
              Book a Trip
            </TabsTrigger>
            <TabsTrigger
              value="track-your-trip"
              className={cn(
                "flex items-center gap-2 px-6 py-3.5 text-sm font-bold whitespace-nowrap backdrop-blur-md transition-all md:px-8 md:py-4 md:text-base",
                // heroMode
                //   ? "rounded-full border border-transparent text-white/74 data-[state=active]:border-white/14 data-[state=active]:bg-white/18 data-[state=active]:text-white"
                // :
                "bg-surface/60 text-on-surface data-[state=active]:border-outline-variant/20 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-primary data-[state=active]:shadow-none"
              )}
            >
              <Navigation size={18} />
              Track Trip
            </TabsTrigger>
          </TabsList>

          <div
            className={cn(
              "ambient-shadow overflow-hidden rounded-tr-3xl rounded-b-3xl p-5 transition-all duration-300 md:p-8",
              heroMode
                ? "border border-white/20 bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl hover:bg-white/12 hover:backdrop-blur-2xl"
                : "border-2 border-outline-variant/20 bg-surface-container-lowest"
            )}
          >
            <TabsContent value="passengers" className="mt-0">
              <div className="space-y-6 md:space-y-8">
                {/* Trip Type Toggle */}
                <div>
                  <div
                    className={cn(
                      "flex gap-2 pb-1",
                      heroMode
                        ? "inline-flex rounded-full border border-white/12 bg-white/8 p-1.5 backdrop-blur-lg"
                        : ""
                    )}
                  >
                    <button
                      onClick={() =>
                        setSearchParams({
                          ...searchParams,
                          tripType: "one-way",
                        })
                      }
                      className={cn(
                        "flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all md:text-sm",
                        searchParams.tripType === "one-way"
                          ? heroMode
                            ? "bg-white text-slate-950 shadow-[0_10px_24px_rgba(255,255,255,0.14)]"
                            : "bg-primary text-on-primary shadow-md shadow-primary/20"
                          : heroMode
                            ? "text-white/70 hover:bg-white/8 hover:text-white"
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
                          ? heroMode
                            ? "bg-white text-slate-950 shadow-[0_10px_24px_rgba(255,255,255,0.14)]"
                            : "bg-primary text-on-primary shadow-md shadow-primary/20"
                          : heroMode
                            ? "text-white/70 hover:bg-white/8 hover:text-white"
                            : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                      )}
                    >
                      <ArrowLeftRight size={14} />
                      Round Trip
                    </button>
                    <button
                      onClick={() =>
                        setSearchParams({
                          ...searchParams,
                          tripType: "hire",
                          originType: searchParams.originType || "terminal",
                        })
                      }
                      className={cn(
                        "flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all md:text-sm",
                        searchParams.tripType === "hire"
                          ? heroMode
                            ? "bg-[#f97316] text-white shadow-[0_12px_28px_rgba(249,115,22,0.38)]"
                            : "bg-primary text-on-primary shadow-md shadow-primary/20"
                          : heroMode
                            ? "text-white/70 hover:bg-white/8 hover:text-white"
                            : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                      )}
                    >
                      <Bus size={14} />
                      Hire a Bus
                    </button>
                  </div>

                  {/* Origin Type Switch (Hire only) */}
                  {searchParams.tripType === "hire" && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() =>
                          setSearchParams({
                            ...searchParams,
                            originType: "terminal",
                          })
                        }
                        className={cn(
                          "flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] transition-all",
                          searchParams.originType === "terminal"
                            ? heroMode
                              ? "bg-white/16 text-white shadow-none!"
                              : "bg-primary/10 text-primary shadow-none!"
                            : heroMode
                              ? "border border-white/14 bg-white/6 text-white/70"
                              : "border border-outline-variant/30 bg-surface-container-lowest text-on-surface"
                        )}
                      >
                        Terminal Pickup
                      </button>
                      <button
                        onClick={() =>
                          setSearchParams({
                            ...searchParams,
                            originType: "residence",
                          })
                        }
                        className={cn(
                          "flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] transition-all",
                          searchParams.originType === "residence"
                            ? heroMode
                              ? "bg-white/16 text-white shadow-none!"
                              : "bg-primary/10 text-primary shadow-none!"
                            : heroMode
                              ? "border border-white/14 bg-white/6 text-white/70"
                              : "border border-outline-variant/30 bg-surface-container-lowest text-on-surface"
                        )}
                      >
                        Residence Pickup
                      </button>
                    </div>
                  )}
                </div>

                {/* Search Bar Container */}
                <div
                  className={cn(
                    "flex flex-col transition-all focus-within:ring-2 focus-within:ring-primary/20 md:flex-row md:items-center",
                    heroMode
                      ? "rounded-[1.75rem] border border-white/18 bg-black/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-lg"
                      : "divide-y divide-outline-variant/20 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-2 shadow-sm md:divide-x md:divide-y-0"
                  )}
                >
                  {/* From Dropdown or Input */}
                  {searchParams.tripType === "hire" &&
                  searchParams.originType === "residence" ? (
                    <div
                      className={cn(
                        heroMode
                          ? heroFieldClassName
                          : "group flex w-full flex-1 flex-col justify-center overflow-hidden rounded-2xl px-5 py-4 text-left transition-colors focus-within:bg-surface-container-low hover:bg-surface-container-low/50 md:rounded-l-2xl md:py-3"
                      )}
                    >
                      <div
                        className={cn(
                          heroMode
                            ? heroFieldLabelClassName
                            : "mb-1 flex items-center gap-1.5 opacity-70 transition-opacity group-hover:opacity-100"
                        )}
                      >
                        <Home
                          size={12}
                          className={cn(
                            heroMode ? "text-white/58" : "text-primary"
                          )}
                        />
                        <span className={getHeroLabelTextClassName(heroMode)}>
                          Pickup Address
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter full address"
                        value={searchParams.from}
                        onChange={(e) =>
                          setSearchParams({
                            ...searchParams,
                            from: e.target.value,
                          })
                        }
                        className={cn(
                          "w-full truncate border-none bg-transparent p-0 ring-0 outline-none focus:ring-0",
                          heroMode
                            ? "text-base font-bold text-white placeholder:font-normal placeholder:text-white/34 md:text-lg"
                            : "text-base font-bold placeholder:font-normal placeholder:text-outline/40 md:text-lg"
                        )}
                      />
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={cn(
                            heroMode
                              ? cn(heroFieldClassName, "md:rounded-none")
                              : "group flex w-full flex-1 flex-col justify-center overflow-hidden rounded-2xl px-5 py-4 text-left transition-colors outline-none hover:bg-surface-container-low/50 focus:bg-surface-container-low md:rounded-l-2xl md:rounded-r-none md:py-3"
                          )}
                        >
                          <div
                            className={cn(
                              heroMode
                                ? heroFieldLabelClassName
                                : "mb-1 flex items-center gap-1.5 opacity-70 transition-opacity group-hover:opacity-100"
                            )}
                          >
                            <MapPin
                              size={12}
                              className={cn(
                                heroMode ? "text-white/58" : "text-primary"
                              )}
                            />
                            <span
                              className={getHeroLabelTextClassName(heroMode)}
                            >
                              {searchParams.tripType === "hire"
                                ? "Pickup Terminal"
                                : "From"}
                            </span>
                          </div>
                          <div className="flex w-full items-center justify-between">
                            <span
                              className={cn(
                                heroMode
                                  ? heroFieldValueClassName
                                  : "truncate text-base font-bold md:text-lg",
                                !searchParams.from &&
                                  (heroMode
                                    ? "font-normal text-white/42"
                                    : "font-normal text-outline/60")
                              )}
                            >
                              {searchParams.from || "Leaving from"}
                            </span>
                            <ChevronDown
                              size={16}
                              className={cn(
                                heroMode ? "text-white/40" : "text-outline/50"
                              )}
                            />
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
                  )}

                  {/* To Dropdown or Input */}
                  {searchParams.tripType === "hire" ? (
                    <div
                      className={cn(
                        heroMode
                          ? cn(heroFieldClassName, "md:rounded-none")
                          : "group flex w-full flex-1 flex-col justify-center overflow-hidden rounded-2xl px-5 py-4 text-left transition-colors focus-within:bg-surface-container-low hover:bg-surface-container-low/50 md:rounded-none md:py-3"
                      )}
                    >
                      <div
                        className={cn(
                          heroMode
                            ? heroFieldLabelClassName
                            : "mb-1 flex items-center gap-1.5 opacity-70 transition-opacity group-hover:opacity-100"
                        )}
                      >
                        <MapPin
                          size={12}
                          className={cn(
                            heroMode ? "text-white/58" : "text-primary"
                          )}
                        />
                        <span className={getHeroLabelTextClassName(heroMode)}>
                          Destination Address
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter drop-off address"
                        value={searchParams.to}
                        onChange={(e) =>
                          setSearchParams({
                            ...searchParams,
                            to: e.target.value,
                          })
                        }
                        className={cn(
                          "w-full truncate border-none bg-transparent p-0 ring-0 outline-none focus:ring-0",
                          heroMode
                            ? "text-base font-bold text-white placeholder:font-normal placeholder:text-white/34 md:text-lg"
                            : "text-base font-bold placeholder:font-normal placeholder:text-outline/40 md:text-lg"
                        )}
                      />
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={cn(
                            heroMode
                              ? cn(heroFieldClassName, "md:rounded-none")
                              : "group flex w-full flex-1 flex-col justify-center overflow-hidden rounded-2xl px-5 py-4 text-left transition-colors outline-none hover:bg-surface-container-low/50 focus:bg-surface-container-low md:rounded-none md:py-3"
                          )}
                        >
                          <div
                            className={cn(
                              heroMode
                                ? heroFieldLabelClassName
                                : "mb-1 flex items-center gap-1.5 opacity-70 transition-opacity group-hover:opacity-100"
                            )}
                          >
                            <MapPin
                              size={12}
                              className={cn(
                                heroMode ? "text-white/58" : "text-primary"
                              )}
                            />
                            <span
                              className={getHeroLabelTextClassName(heroMode)}
                            >
                              To
                            </span>
                          </div>
                          <div className="flex w-full items-center justify-between">
                            <span
                              className={cn(
                                heroMode
                                  ? heroFieldValueClassName
                                  : "truncate text-base font-bold md:text-lg",
                                !searchParams.to &&
                                  (heroMode
                                    ? "font-normal text-white/42"
                                    : "font-normal text-outline/60")
                              )}
                            >
                              {searchParams.to || "Going to"}
                            </span>
                            <ChevronDown
                              size={16}
                              className={cn(
                                heroMode ? "text-white/40" : "text-outline/50"
                              )}
                            />
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
                  )}

                  {/* Date Pickers */}
                  {searchParams.tripType === "hire" ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            heroMode
                              ? cn(
                                  heroFieldClassName,
                                  "md:rounded-none md:border-r-0"
                                )
                              : "group flex w-full flex-1 flex-col justify-center rounded-2xl px-5 py-4 text-left transition-colors outline-none hover:bg-surface-container-low/50 focus:bg-surface-container-low md:rounded-none md:py-3"
                          )}
                        >
                          <div
                            className={cn(
                              heroMode
                                ? heroFieldLabelClassName
                                : "mb-1 flex items-center gap-1.5 opacity-70 transition-opacity group-hover:opacity-100"
                            )}
                          >
                            <CalendarIcon
                              size={12}
                              className={cn(
                                heroMode ? "text-white/58" : "text-primary"
                              )}
                            />
                            <span
                              className={getHeroLabelTextClassName(heroMode)}
                            >
                              Rental Dates
                            </span>
                          </div>
                          <span
                            className={cn(
                              heroMode
                                ? heroFieldValueClassName
                                : "truncate text-base font-bold md:text-lg",
                              !(
                                searchParams.departureDate &&
                                searchParams.returnDate
                              ) &&
                                (heroMode
                                  ? "font-normal text-white/42"
                                  : "font-normal text-outline/60")
                            )}
                          >
                            {searchParams.departureDate &&
                            searchParams.returnDate
                              ? `${format(new Date(searchParams.departureDate), "MMM dd")} - ${format(new Date(searchParams.returnDate), "MMM dd")}`
                              : "Select range"}
                          </span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto rounded-3xl p-0"
                        align="start"
                      >
                        <Calendar
                          mode="range"
                          disabled={{ before: today }}
                          selected={{
                            from: searchParams.departureDate
                              ? new Date(searchParams.departureDate)
                              : undefined,
                            to: searchParams.returnDate
                              ? new Date(searchParams.returnDate)
                              : undefined,
                          }}
                          onSelect={(range: DateRange | undefined) => {
                            setSearchParams({
                              ...searchParams,
                              departureDate: range?.from
                                ? format(range.from, "yyyy-MM-dd")
                                : "",
                              returnDate: range?.to
                                ? format(range.to, "yyyy-MM-dd")
                                : range?.from
                                  ? format(range.from, "yyyy-MM-dd")
                                  : "",
                            })
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <>
                      {/* Departure Date */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className={cn(
                              heroMode
                                ? cn(heroFieldClassName, "md:rounded-none")
                                : "group flex w-full flex-1 flex-col justify-center rounded-2xl px-5 py-4 text-left transition-colors outline-none hover:bg-surface-container-low/50 focus:bg-surface-container-low md:rounded-none md:py-3"
                            )}
                          >
                            <div
                              className={cn(
                                heroMode
                                  ? heroFieldLabelClassName
                                  : "mb-1 flex items-center gap-1.5 opacity-70 transition-opacity group-hover:opacity-100"
                              )}
                            >
                              <CalendarIcon
                                size={12}
                                className={cn(
                                  heroMode ? "text-white/58" : "text-primary"
                                )}
                              />
                              <span
                                className={getHeroLabelTextClassName(heroMode)}
                              >
                                Depart
                              </span>
                            </div>
                            <span
                              className={cn(
                                heroMode
                                  ? heroFieldValueClassName
                                  : "truncate text-base font-bold md:text-lg",
                                !searchParams.departureDate &&
                                  (heroMode
                                    ? "font-normal text-white/42"
                                    : "font-normal text-outline/60")
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
                            <button
                              className={cn(
                                heroMode
                                  ? cn(
                                      heroFieldClassName,
                                      "md:rounded-none md:border-r-0"
                                    )
                                  : "group flex w-full flex-1 flex-col justify-center rounded-2xl px-5 py-4 text-left transition-colors outline-none hover:bg-surface-container-low/50 focus:bg-surface-container-low md:rounded-none md:py-3"
                              )}
                            >
                              <div
                                className={cn(
                                  heroMode
                                    ? heroFieldLabelClassName
                                    : "mb-1 flex items-center gap-1.5 opacity-70 transition-opacity group-hover:opacity-100"
                                )}
                              >
                                <CalendarIcon
                                  size={12}
                                  className={cn(
                                    heroMode ? "text-white/58" : "text-primary"
                                  )}
                                />
                                <span
                                  className={getHeroLabelTextClassName(
                                    heroMode
                                  )}
                                >
                                  Return
                                </span>
                              </div>
                              <span
                                className={cn(
                                  heroMode
                                    ? heroFieldValueClassName
                                    : "truncate text-base font-bold md:text-lg",
                                  !searchParams.returnDate &&
                                    (heroMode
                                      ? "font-normal text-white/42"
                                      : "font-normal text-outline/60")
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
                    </>
                  )}

                  {/* Search Button */}
                  <div
                    className={cn(
                      heroMode ? "p-2 md:w-[220px] md:p-3" : "md:pl-2"
                    )}
                  >
                    <Button
                      onClick={handleSearch}
                      disabled={disabled}
                      className={cn(
                        "my-1 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-sm font-black tracking-wider uppercase shadow-lg transition-all hover:scale-[1.02] active:scale-95 md:h-16 md:w-36 md:rounded-l-none md:rounded-r-2xl md:py-0 md:text-base lg:w-48",
                        heroMode
                          ? "h-14 rounded-[1.3rem] bg-[#1d4ed8] text-white shadow-[0_16px_34px_rgba(29,78,216,0.45)] hover:bg-[#2563eb] md:h-[92px] md:w-full md:rounded-[1.5rem]"
                          : "bg-primary text-on-primary shadow-primary/20 hover:bg-primary/90"
                      )}
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
                <div
                  className={cn(
                    "flex w-full max-w-2xl flex-col transition-all focus-within:ring-2 focus-within:ring-primary/20 sm:flex-row",
                    heroMode
                      ? "rounded-[2rem] border border-white/20 bg-white/10 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl hover:bg-white/12 hover:backdrop-blur-2xl"
                      : "rounded-4xl border bg-surface-container-low p-2 shadow-sm",
                    trackError
                      ? heroMode
                        ? "focus-within:ring-error/20 border-red-300/60"
                        : "border-error focus-within:ring-error/20"
                      : "border-outline-variant/20"
                  )}
                >
                  <div className="flex grow items-center gap-4 px-6 py-4 sm:py-3">
                    <Navigation
                      className={cn(
                        "shrink-0",
                        trackError
                          ? "text-error"
                          : heroMode
                            ? "text-white/72"
                            : "text-primary"
                      )}
                      size={24}
                    />
                    <div className="grow">
                      <label
                        className={cn(
                          "mb-0.5 block text-[10px] font-bold tracking-widest uppercase sm:text-xs",
                          heroMode ? "text-white/58" : "text-outline"
                        )}
                      >
                        {trackError ? (
                          <span className="text-error">{trackError}</span>
                        ) : (
                          "Booking Reference"
                        )}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. PMT-A1B2C3D4"
                        value={trackRef}
                        onChange={(e) => {
                          setTrackRef(e.target.value)
                          if (trackError) setTrackError("")
                        }}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleTrackTrip()
                        }
                        className={cn(
                          "w-full border-none bg-transparent p-0 text-base font-bold outline-none focus:ring-0 sm:text-lg",
                          heroMode
                            ? "text-white placeholder:text-white/34"
                            : "text-on-surface placeholder-outline/40"
                        )}
                      />
                    </div>
                  </div>

                  <div
                    className={cn(
                      heroMode ? "w-full p-2 sm:w-auto" : "w-full p-1 sm:w-auto"
                    )}
                  >
                    <button
                      onClick={handleTrackTrip}
                      className={cn(
                        "w-full rounded-full bg-primary px-8 py-4 text-xs font-black tracking-widest text-on-primary uppercase shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:py-5 sm:text-sm",
                        heroMode
                          ? "bg-[#f97316] text-white shadow-[0_16px_34px_rgba(249,115,22,0.38)] hover:bg-[#fb923c]"
                          : "shadow-primary/20"
                      )}
                    >
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
