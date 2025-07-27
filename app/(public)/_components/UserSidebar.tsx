"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "My Profile", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Blogs", href: "/dashboard/blog", icon: FileText },
  { name: "My Membership", href: "/dashboard/my-membership", icon: Users },
  { name: "My Agencies", href: "/dashboard/member-agencies", icon: Users },
];

export function SidebarContent() {
  const pathname = usePathname();
  
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-4 text-xl font-bold text-primary">
        <Link href="/">Bssaj</Link>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white shadow"
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

export function UserSidebar() {
  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64">
      <SidebarContent />
    </div>
  );
}
