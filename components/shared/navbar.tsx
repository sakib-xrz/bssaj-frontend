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
import { logout } from "@/redux/features/auth/authSlice";
import { AppDispatch, persistor } from "@/redux/store";
import { ChevronDown, LogOut, MenuIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Container from "./container";
import { useGetMyInfoQuery } from "@/redux/features/get-me/get_me";
import { useUpdateProfilePitcherMutation } from "@/redux/features/user/userApi";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [updateProfilePicture] = useUpdateProfilePitcherMutation();
  const { data: user } = useGetMyInfoQuery();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    router.push("/login");
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
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => {
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

          <Button className="text-muted bg-[#00AEEF] hover:bg-[#00AEEF]/90">
            En <ChevronDown className="ml-1 h-4 w-4" />
          </Button>

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
                {navLinks.map((link) => {
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
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                      <Button className="w-full">Dashboard</Button>
                    </Link>
                    <Link
                      href="/dashboard"
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
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button className="w-full">Sign In</Button>
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
