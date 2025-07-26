"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { logout } from "@/redux/features/auth/authSlice";
import { AppDispatch, persistor } from "@/redux/store";
import { LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SidebarContent } from "./Sidebar";
import { useGetMyInfoQuery } from "@/redux/features/get-me/get_me";
import { baseApi } from "@/redux/api/baseApi";

export function DashboardHeader() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  // Use your RTK Query to get fresh user info
  const { data: user } = useGetMyInfoQuery();

  const handleLogout = async () => {
    // Made async to await persistor.purge
    try {
      // 1. Dispatch the 'logout' action from your authSlice to clear Redux state
      dispatch(logout());

      // 2. Clear Redux Persist store
      await persistor.purge();
      // 3. Clear local and session storage
      localStorage.clear();
      sessionStorage.clear();
      // 4. Clear RTK Query cache immediately
      dispatch(baseApi.util.resetApiState()); // <--- Crucial line for immediate effect

      // 5. Redirect to login page
      router.push("/login");
      // 6. Force a refresh to ensure all client-side states are reset
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userInitials = user?.name
    ?.split(" ")
    ?.map((n: string) => n[0])
    .join("");

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-3 bg-white shadow-sm h-16">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(true)}
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
                    // Use a key that changes when profile_picture changes to force re-render
                    key={user?.profile_picture || "default-avatar-dashboard"}
                    src={user?.profile_picture || "/placeholder.svg"}
                    alt={`${user?.name || "User"}'s profile picture`}
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <AvatarFallback>
                    {userInitials || <User className="h-4 w-4" />}
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
                  <p className="text-sm font-semibold truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
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

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
