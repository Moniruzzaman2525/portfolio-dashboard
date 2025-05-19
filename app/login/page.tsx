import { LoginForm } from "@/components/Feather/Login/login-form"
import Link from "next/link"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome back</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your credentials to sign in to your account</p>
                </div>
                <div className="space-y-4">
                    <LoginForm />
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-medium text-primary hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
