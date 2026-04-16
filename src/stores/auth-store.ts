import { toast } from "sonner"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isInitialized: boolean
  login: (email: string, password: string) => boolean
  signup: (name: string, email: string, password: string) => boolean
  logout: ({ refresh }: { refresh: () => void }) => void
  initialize: () => void
}

const SESSION_KEY = "pmt_session"
const USERS_KEY = "pmt_users"

function getStoredUsers(): Array<{
  id: string
  email: string
  password: string
  name: string
  createdAt: string
}> {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(USERS_KEY)
  return stored ? JSON.parse(stored) : []
}

function setStoredUsers(
  users: Array<{
    id: string
    email: string
    password: string
    name: string
    createdAt: string
  }>
) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function getSession(): User | null {
  if (typeof window === "undefined") return null
  const stored = sessionStorage.getItem(SESSION_KEY)
  return stored ? JSON.parse(stored) : null
}

function setSession(user: User | null) {
  if (user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
  } else {
    sessionStorage.removeItem(SESSION_KEY)
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isInitialized: false,

      initialize: () => {
        const session = getSession()
        set({ user: session, isInitialized: true })
      },

      login: (email: string, password: string) => {
        const users = getStoredUsers()
        const foundUser = users.find(
          (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        )
        if (foundUser) {
          const user: User = {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
          }
          setSession(user)
          set({ user })
          toast.success("Successfully Logged In")

          return true
        }
        return false
      },

      signup: (name: string, email: string, password: string) => {
        const users = getStoredUsers()
        const exists = users.some(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        )
        if (exists) return false

        const newUser = {
          id: generateId(),
          email: email.toLowerCase(),
          password,
          name,
          createdAt: new Date().toISOString(),
        }
        users.push(newUser)
        setStoredUsers(users)

        const user: User = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        }
        setSession(user)
        set({ user })
        toast.success("Successfully Created your Account")
        return true
      },

      logout: ({ refresh }) => {
        setSession(null)
        set({ user: null })
        refresh()
      },
    }),
    {
      name: "pmt-auth-storage",
      partialize: (state) => ({ isInitialized: state.isInitialized }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.initialize()
        }
      },
    }
  )
)
