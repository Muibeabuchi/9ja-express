# 9JA Express

A modern bus booking web application for interstate travel across Nigeria. Search routes, select seats, manage bookings, and process payments seamlessly.

## Features

- **Route Search** - Search bus routes between major Nigerian cities (Lagos, Abuja, Enugu, Port Harcourt, etc.)
- **Trip Types** - One-way trips, round trips, and bus charter/hire
- **Seat Selection** - Interactive seat selection with real-time availability
- **Booking Management** - View and manage existing bookings with reference numbers
- **Hire Fleet** - Charter bus services for group travel and events
- **Payment Integration** - Secure payment processing via Paystack

## Tech Stack

- React 19 + TypeScript
- Vite 7 (build tool)
- TanStack Router (file-based routing)
- TailwindCSS 4 + shadcn/ui
- Zustand (state management)
- React Hook Form + Zod (form validation)
- React Paystack (payment integration)
- date-fns (date handling)
- Motion (animations)

## Prerequisites

- Node.js 18.x or higher
- npm, pnpm, or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd peace-mass-transit
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the project root:

```bash
# On Windows
echo VITE_PAYSTACK_PUBLIC_KEY=your_key > .env.local

# On Linux/Mac
touch .env.local
```

4. Configure environment variables in `.env.local`:

```env
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# TypeScript type check
npm run typecheck

# Format code with Prettier
npm run format

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/            # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── footer.tsx       # Footer
│   ├── logo.tsx        # Logo
│   ├── mobile-drawer.tsx
│   ├── seat.tsx        # Seat component
│   └── search-widget.tsx
├── routes/             # TanStack Router routes
├── stores/             # Zustand state stores
├── lib/               # Utilities
│   ├── paystack.tsx     # Paystack integration
│   ├── utils.ts        # Helper functions
│   ├── bookingStorage.ts
│   └── hireBookingStorage.ts
├── data/              # Mock data and types
│   ├── mockData.json   # Bus routes, pricing
│   ├── mockData.ts
│   ├── schemas.ts      # Zod validation schemas
│   └── types.ts
├── hooks/             # Custom React hooks
│   └── use-media-query.ts
└── types/             # Global types
```

## Assumptions Made

The application was built with the following assumptions:

1. **No Backend** - All data is served from a local JSON file (`src/data/mockData.json`). Bus availability, pricing, and routes are mock data and do not reflect real-time availability.

2. **Session-Based Seat Booking** - Seat selection prevents double-booking within a single browser session. Selected seats are stored in sessionStorage and cleared when the session ends. This simulates real-time seat locking but does not persist across different browsers or devices.

3. **Paystack Test Mode** - Payments are processed using Paystack's sandbox/test environment. No real money is transferred. The test public key can be obtained from the [Paystack Dashboard](https://dashboard.paystack.com/#/login).

4. **Simplified Nigerian Routes** - The locations and routes are simplified for demonstration. Real bus booking systems have more complex routing, scheduling, and pricing logic.

5. **Authentication is Mock** - User accounts are stored in localStorage. This is for demonstration only - production apps should use proper authentication with secure backends.

6. **Booking Persistence** - Completed bookings are stored in localStorage. In production, bookings would be stored in a database and associated with user accounts.

## Approach & Architecture

### Feature Implementation

#### 1. Trip Type Selection

Users can choose between:

- **One-way trip** - Standard single journey
- **Round trip** - Return journey on a different date
- **Hire a bus** - Charter the entire vehicle for group travel

Implemented in: `src/components/search-widget.tsx`

#### 2. Trip Details Input

Users input:

- Departure location (autocomplete from available locations)
- Destination location
- Departure date (date picker)
- Return date (for round trips only)

Form validation with React Hook Form + Zod schemas in relevant route components.

#### 3. Available Buses

- Bus data stored in `src/data/mockData.json`
- Each bus has: name, capacity, price, route, amenities
- Filtering happens in `src/routes/search-results.tsx`
- Buses are filtered by: departure → destination, date

#### 4. Seat Selection

- Visual seat grid in `src/routes/seats.tsx`
- Individual seat components in `src/components/seat.tsx`
- 40 seats per bus (rows A-D, columns 1-10)
- Disabled states: available, selected, occupied
- Session-based prevention in `src/lib/bookingStorage.ts`

#### 5. Booking Summary

The checkout page displays:

- Trip type (one-way/round trip)
- Departure and destination
- Travel date(s)
- Selected bus and amenities
- Selected seat number(s)
- Total price with breakdown

#### 6. Payment Integration

- Paystack integration via `src/lib/paystack.tsx`
- Test mode enabled by default
- On success: redirect to confirmation page
- On failure: show error toast, allow retry

### How Each Assessment Criterion is Met

#### 1. Logic & Problem Solving

- **Route + Date Filtering**: `src/routes/search-results.tsx` filters buses by comparing departure/destination from the selected route against the mock data routes.
- **Trip Type Handling**: The search widget stores trip type in state and conditionally renders return date field.
- **Seat Selection**: Each seat tracks three states (available, selected, occupied) with proper conflict prevention.

#### 2. Code Structure & Architecture

- Clear separation of concerns with dedicated folders
- Reusable components (`src/components/`)
- TanStack Router for file-based routing
- Utility functions in `src/lib/`

#### 3. State Management

- **Zustand** for global auth state (`src/stores/auth-store.ts`)
- **React state** for component-level state
- **sessionStorage** for temporary seat locking
- **localStorage** for booking persistence and user accounts
- No prop drilling - components access stores directly

#### 4. UI/UX Implementation

- Fully responsive design with TailwindCSS
- Loading states (TanStack Router pendingComponent)
- Empty states when no buses match
- Form validation with clear error messages
- Toast notifications for feedback
- Motion animations for smooth transitions

#### 5. Code Quality

- TypeScript throughout with strict typing
- ESLint + Prettier for consistent formatting
- Zod schemas for data validation
- Descriptive variable and function names
- Component-based architecture

#### 6. Payment Integration

- Proper Paystack integration flow
- Success callback handling
- Failure/error state handling
- Booking confirmation on payment completion

## Available Routes

| Route                | File                  | Description       |
| -------------------- | --------------------- | ----------------- |
| `/`                  | index.tsx             | Home (search)     |
| `/search-results`    | search-results.tsx    | Available buses   |
| `/seats`             | seats.tsx             | Seat selection    |
| `/checkout`          | checkout.tsx          | Booking checkout  |
| `/confirmation`      | confirmation.tsx      | Booking confirmed |
| `/my-bookings`       | my-bookings.tsx       | User bookings     |
| `/manage-booking`    | manage-booking.tsx    | Manage booking    |
| `/auth/sign-in`      | auth/sign-in.tsx      | Sign in           |
| `/auth/sign-up`      | auth/sign-up.tsx      | Sign up           |
| `/hire-fleet`        | hire-fleet.tsx        | Charter fleet     |
| `/hire-checkout`     | hire-checkout.tsx     | Charter checkout  |
| `/hire-confirmation` | hire-confirmation.tsx | Charter confirmed |

## Supported Locations

- Lagos (Jibowu, Ajah)
- Abuja (Utako, Gwagwalada)
- Enugu (Okpara Ave)
- Owerri (Main)
- Port Harcourt (ABA Road)
- Onitsha (Main)
- Aba (P.H Road)
- Uyo (Itam)
- Calabar (Main)
- Benin City (Central)
- Warri (Effurun)
- Ibadan (Iwo Road)
- Kano (Central)
- Jos (Main)
- Kaduna (Mando)
- Akure (Main)

## Deployment

### Vercel (Recommended)

1. Push to a Git repository
2. Import project in Vercel
3. Configure environment variables:
   - `VITE_PAYSTACK_PUBLIC_KEY` - Your Paystack public key
4. Deploy

The project includes `vercel.json` configuration for automatic deployments.

### Manual Build

```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## License

MIT
