# 9JA Express

A modern bus booking web application for interstate travel across Nigeria. Search routes, select seats, manage bookings, and process payments seamlessly.

## Features

- **Route Search** - Search bus routes between major Nigerian cities (Lagos, Abuja, Enugu, Port Harcourt, etc.)
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
├── components/
│   ├── pages/          # Page components
│   ├── ui/             # shadcn/ui components
│   ├── navbar.tsx      # Navigation
│   ├── footer.tsx      # Footer
│   └── search-widget.tsx
├── routes/             # TanStack Router routes
├── stores/             # Zustand state stores
├── lib/                # Utilities (Paystack, storage)
├── data/               # Mock data and types
├── hooks/              # Custom React hooks
└── main.tsx            # App entry point
```

## Available Routes

- `/` - Home (search)
- `/search-results` - Search results
- `/seats` - Seat selection
- `/checkout` - Booking checkout
- `/confirmation` - Booking confirmation
- `/manage-booking` - Manage existing booking
- `/auth/sign-in` - Sign in
- `/auth/sign-up` - Sign up
- `/hire-fleet` - Charter fleet
- `/hire-checkout` - Charter checkout
- `/hire-confirmation` - Charter confirmation

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
