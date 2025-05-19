import { create } from "zustand"
import { persist } from "zustand/middleware"

// Types for our authentication state
export type User = {
    id: string
    name: string
    email: string
    avatar?: string
}

type AuthState = {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    login: (email: string, password: string) => Promise<void>
    signup: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
}

// Mock user data for demo purposes
const mockUsers = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        avatar: "",
    },
]

// Create auth store with persistence
export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null })

                try {
                    // Simulate API call delay
                    await new Promise((resolve) => setTimeout(resolve, 1000))

                    // Find user with matching credentials
                    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

                    if (!user) {
                        throw new Error("Invalid email or password")
                    }

                    // Set authenticated user (omit password)
                    const { password: _, ...authUser } = user
                    set({ user: authUser, isAuthenticated: true, isLoading: false })
                } catch (error) {
                    set({ error: (error as Error).message, isLoading: false })
                }
            },

            signup: async (name: string, email: string, password: string) => {
                set({ isLoading: true, error: null })

                try {
                    // Simulate API call delay
                    await new Promise((resolve) => setTimeout(resolve, 1000))

                    // Check if user already exists
                    const existingUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
                    if (existingUser) {
                        throw new Error("User with this email already exists")
                    }

                    // Create new user
                    const newUser = {
                        id: String(mockUsers.length + 1),
                        name,
                        email,
                        password,
                        avatar: "",
                    }

                    // In a real app, you would save this to your database
                    mockUsers.push(newUser)

                    // Set authenticated user (omit password)
                    const { password: _, ...authUser } = newUser
                    set({ user: authUser, isAuthenticated: true, isLoading: false })
                } catch (error) {
                    set({ error: (error as Error).message, isLoading: false })
                }
            },

            logout: () => {
                set({ user: null, isAuthenticated: false })
            },
        }),
        {
            name: "auth-storage", // name of the item in storage
            skipHydration: true, // we'll handle hydration manually
        },
    ),
)
