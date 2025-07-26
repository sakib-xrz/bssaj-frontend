"use client"
import { useAuthUser } from '@/redux/features/auth/authSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function UnauthedOnlyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter()
    const user = useAuthUser()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if auth state is determined
        if (user !== undefined) {
            setIsLoading(false)
            
            // If user exists, redirect away
            if (user) {
                router.push('/') // or to dashboard/home
            }
        }
    }, [user, router])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>loading</p>
            </div>
        )
    }

    // Only show children if no user exists
    if (!user) {
        return (
            <div>
                {children}
            </div>
        )
    }

    // While redirect happens for authenticated users
    return null
}

export default UnauthedOnlyLayout