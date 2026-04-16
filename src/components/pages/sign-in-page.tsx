import { useNavigate } from "@tanstack/react-router"

import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "@/stores/auth-store"
import { Button } from "@/components/ui/button"

import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { Link } from "@tanstack/react-router"
import { Logo } from "../logo"

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export function SignInPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFormSubmit = async ({
    value,
  }: {
    value: z.infer<typeof signInSchema>
  }) => {
    setError(null)
    const success = login(value.email, value.password)
    if (success) {
      const redirectUrl = sessionStorage.getItem("pmt_auth_redirect")
      sessionStorage.removeItem("pmt_auth_redirect")
      if (redirectUrl) {
        const redirectData = JSON.parse(redirectUrl)
        navigate({
          to: redirectData.to,
          search: redirectData.search,
          replace: true,
        })
      } else {
        navigate({ to: "/", replace: true })
      }
    } else {
      setError("Invalid email or password")
    }
  }

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: signInSchema,
    },
    onSubmit: handleFormSubmit,
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 pt-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Link to="/">
            <Logo />
          </Link>
          <h1 className="mt-6 font-headline text-3xl font-bold tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue your booking
          </p>
        </div>

        <div className="rounded-3xl bg-card p-8 shadow-lg ring-1 ring-border">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            id="sign-in-form"
            className="space-y-6"
          >
            {error && (
              <div className="rounded-xl bg-destructive/10 p-4 text-sm font-medium text-destructive">
                {error}
              </div>
            )}

            <form.Field
              name="email"
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    className="w-full rounded-xl border border-input bg-background p-4 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="email@example.com"
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {!field.state.meta.isValid && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors
                        .map((error) => error?.message)
                        .join(", ")}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="password"
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border border-input bg-background p-4 pr-12 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {!field.state.meta.isValid && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors
                        .map((error) => error?.message)
                        .join(", ")}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-6 text-base font-bold"
                >
                  Sign In
                  <ArrowRight size={20} />
                </Button>
              )}
            />
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/auth/sign-up"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
