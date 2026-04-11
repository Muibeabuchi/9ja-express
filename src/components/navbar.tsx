import { Bell, User } from "lucide-react";

const Navbar = () => (
  <nav className="sticky top-0 z-50 glass ambient-shadow">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <div className="text-2xl font-headline font-extrabold tracking-tighter text-primary">
          EaseUp
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-semibold text-primary border-b-2 border-primary pb-1">Trips</a>
          <a href="#" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Manage Booking</a>
          <a href="#" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Offers</a>
          <a href="#" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Support</a>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <Bell size={20} />
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <User size={20} />
        </button>
      </div>
    </div>
  </nav>
);


export default Navbar