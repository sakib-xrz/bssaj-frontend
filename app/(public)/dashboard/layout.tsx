"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  LayoutDashboard,
  Users,
  FileText,
  Award,
  Menu,
  X,
  LogOut,
  WalletCards,
  User as UserIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { logout, useAuthUser } from "@/redux/features/auth/authSlice";
import { AppDispatch, persistor } from "@/redux/store";
import { baseApi } from "@/redux/api/baseApi";
import { useGetMyInfoQuery } from "@/redux/features/get-me/get_me";

import ProtectedRoute from "../_components/ProtectedRoute";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const user = useAuthUser();
  const { data: userInfo } = useGetMyInfoQuery();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userNavigation = [
    { name: "My Profile", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Blogs", href: "/dashboard/blog", icon: FileText },
    { name: "My Membership", href: "/dashboard/my-membership", icon: Users },
    { name: "My Agencies", href: "/dashboard/member-agencies", icon: Users },
  ];

  const agencyNavigation = [
    { name: "My Profile", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Blogs", href: "/dashboard/blog", icon: FileText },
    { name: "My Membership", href: "/dashboard/my-membership", icon: Users },
    { name: "My Agencies", href: "/dashboard/member-agencies", icon: Users },
    { name: "Certificate", href: "/dashboard/certificate", icon: Award },
    { name: "Payment", href: "/dashboard/payment", icon: WalletCards },
  ];

  const navigation =
    user?.role === "AGENCY" ? agencyNavigation : userNavigation;

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname, user]);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await persistor.purge();
      localStorage.clear();
      sessionStorage.clear();
      dispatch(baseApi.util.resetApiState());
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userInitials = userInfo?.name
    ?.split(" ")
    ?.map((n: string) => n[0])
    .join("");

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 text-xl font-bold text-primary flex items-center justify-between">
              <Link href="/">Bssaj</Link>
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
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
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 w-full">
          {/* Header merged here */}
          <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-3 bg-white shadow-sm h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                    aria-label="User menu"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        key={userInfo?.profile_picture || "default-avatar"}
                        src={userInfo?.profile_picture || "/placeholder.svg"}
                        alt={`${userInfo?.name || "User"}'s profile picture`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.svg";
                        }}
                      />
                      <AvatarFallback>
                        {userInitials || <UserIcon className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-60 rounded-xl shadow-lg"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold truncate">
                        {userInfo?.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {userInfo?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:bg-destructive/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
