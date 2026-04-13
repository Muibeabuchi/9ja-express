import { motion } from "motion/react"
const DestinationCard = ({
  title,
  subtitle,
  price,
  image,
  large = false,
}: {
  title: string
  subtitle: string
  price?: string
  image: string
  large?: boolean
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`group relative cursor-pointer overflow-hidden rounded-xl ${large ? "col-span-12 row-span-2 h-[600px] md:col-span-7" : "col-span-12 h-[288px] md:col-span-5"}`}
  >
    <img
      src={image}
      alt={title}
      referrerPolicy="no-referrer"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent" />
    <div className="absolute bottom-8 left-8 text-white">
      <p className="mb-1 font-label text-[10px] font-bold tracking-[0.05em] uppercase opacity-80">
        {subtitle}
      </p>
      <h3
        className={`${large ? "text-3xl" : "text-xl"} font-headline font-bold`}
      >
        {title}
      </h3>
      {price && (
        <p className="mt-2 text-sm opacity-90">Starting from {price}</p>
      )}
    </div>
  </motion.div>
)

export default DestinationCard
