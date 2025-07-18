"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
    { name: "My Profile", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Blogs", href: "/dashboard/blog", icon: Users },
     { name: "My Membership", href: "/dashboard/my-membership", icon: Users },
];

export function SidebarContent() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full">
            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                isActive
                                    ? "bg-primary text-white"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                            )}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export function Sidebar() {
    return (
        <>
            <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:border-r lg:border-gray-200">
                <SidebarContent /> 
            </div>
        </>
    );
}