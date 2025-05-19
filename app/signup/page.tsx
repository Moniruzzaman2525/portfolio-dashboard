import { SignupForm } from "@/components/Feather/SignUp/signup-form"
import Link from "next/link"

export default function SignupPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Create an account</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your information to create a new account</p>
                </div>
                <div className="space-y-4">
                    <SignupForm />
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-primary hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
