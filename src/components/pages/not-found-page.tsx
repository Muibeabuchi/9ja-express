import { Link, useRouter } from "@tanstack/react-router"
import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import { Logo } from "../logo"

const NotFoundPage = () => {
  const router = useRouter()
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="font-headline text-[160px] leading-none font-black tracking-tighter text-primary/20 sm:text-[200px]">
          404
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-md"
      >
        <h1 className="mb-3 font-headline text-3xl font-bold tracking-tight text-foreground">
          Page Not Found
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <Button
            asChild
            className="gap-2 rounded-full bg-primary px-6 py-6 text-base font-bold"
          >
            <Link to="/">
              <Home size={18} />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="gap-2 rounded-full border-border bg-background px-6 py-6 text-base font-semibold"
            onClick={() => router.history.back()}
          >
            <span>
              <ArrowLeft size={18} />
              Go Back
            </span>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage
