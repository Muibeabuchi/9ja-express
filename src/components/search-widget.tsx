import { MapPin, Bus, Calendar, Search } from "lucide-react";
import  { motion } from "motion/react";

const SearchWidget = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="max-w-5xl mx-auto -mt-16 relative z-20"
  >
    <div className="bg-surface-container-lowest p-8 rounded-xl ambient-shadow border border-outline-variant/20">
      <div className="flex gap-8 mb-8 border-b border-surface-container">
        <button className="pb-4 text-sm font-semibold text-primary border-b-2 border-primary">One-way</button>
        <button className="pb-4 text-sm font-medium text-outline hover:text-on-surface transition-colors">Round Trip</button>
        <button className="pb-4 text-sm font-medium text-outline hover:text-on-surface transition-colors">Hire a Bus</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-label font-bold tracking-[0.05em] text-outline uppercase">From</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="text" 
              placeholder="Departure City"
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low rounded-md border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-medium placeholder:text-outline/40"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-label font-bold tracking-[0.05em] text-outline uppercase">To</label>
          <div className="relative">
            <Bus className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="text" 
              placeholder="Destination City"
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low rounded-md border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-medium placeholder:text-outline/40"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-label font-bold tracking-[0.05em] text-outline uppercase">Departure Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="date" 
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low rounded-md border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-medium"
            />
          </div>
        </div>
        
        <div className="flex items-end">
          <button className="w-full signature-gradient text-on-primary font-bold py-4 rounded-md shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Search size={20} />
            Search Fleet
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

export default SearchWidget
