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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/data";
import { persistor } from "@/redux/store";
import { LogOut, MenuIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { baseApi } from "@/redux/api/baseApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useGetMyInfoQuery } from "@/redux/features/get-me/get_me";
import { useUpdateProfilePitcherMutation } from "@/redux/features/user/userApi";
import Container from "./container";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [updateProfilePicture] = useUpdateProfilePitcherMutation();
  const { data: user, isLoading, isError } = useGetMyInfoQuery();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Filter navLinks to hide Membership if user is authenticated
  const filteredNavLinks = navLinks.filter((link) => {
    if (link.name === "Membership" && user?.role === "AGENCY") {
      return false;
    }
    return true;
  });

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

  const userInitials =
    user?.name
      ?.split(" ")
      ?.map((name: string) => name[0])
      .join("") || "";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("profile_picture", file);
      await updateProfilePicture(formData).unwrap();
    } catch (error) {
      console.error("Failed to upload profile picture", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF]">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-12 w-12 relative">
            <Image
              src="/images/LOGO.png"
              alt="BSSAJ Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-bold text-xl text-red-600">BSSAJ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {filteredNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-[#868686] hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {user ? (
            <>
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full ring-1 ring-ring/20 shadow-sm p-0"
                    aria-label="User menu"
                  >
                    <Avatar className="h-10 w-10">
                      {!isLoading && !isError && user ? (
                        <>
                          <AvatarImage
                            key={user?.profile_picture || "default-avatar"}
                            src={user?.profile_picture || "/placeholder.svg"}
                            alt={`${user?.name || "User"}'s profile picture`}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/placeholder.svg";
                            }}
                          />
                          <AvatarFallback className="bg-[#E0F7FF] text-[#007B9E] font-semibold">
                            {userInitials || <User className="h-4 w-4" />}
                          </AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback className="bg-[#E0F7FF] text-[#007B9E] font-semibold">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      )}
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
                        {user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
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
            </>
          ) : (
            <Button asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Navigation with Sheet */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="p-6 max-sm:w-full data-[state=open]:animate-slide-in data-[state=closed]:animate-slide-out"
            >
              <div className="flex flex-col space-y-4">
                {filteredNavLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`text-lg font-medium ${
                        isActive
                          ? "text-primary font-semibold"
                          : "text-gray-700 hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                {user ? (
                  <>
                    <Link href="/dashboard" passHref>
                      <Button asChild className="w-full">
                        <span>Dashboard</span>
                      </Button>
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className={`text-sm font-medium transition-colors ${
                        pathname === "/dashboard"
                          ? "text-primary font-semibold"
                          : "text-[#868686] hover:text-primary"
                      }`}
                    >
                      Profile
                    </Link>
                    <Button onClick={handleLogout} className="w-full">
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/login" passHref>
                    <Button asChild className="w-full">
                      <span>Sign In</span>
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
