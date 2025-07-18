"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/data";
import { logout, useAuthUser } from "@/redux/features/auth/authSlice";
import { AppDispatch, persistor } from "@/redux/store";
import { ChevronDown, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Container from "./container";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const user = useAuthUser()
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  const handleLogout = () => {
    // step 1 state clear 
    dispatch(logout());
    // step 2 persistor theke remove kora holo 
    persistor.purge();
    // logout er pore login e redirect kora holo 
    router.push('/login')
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF]">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/bssaj-logo.jpeg"
            alt="BSSAJ Logo"
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${isActive
                  ? "text-primary font-semibold"
                  : "text-[#868686] hover:text-primary"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Button className="text-muted bg-[#00AEEF] hover:bg-[#00AEEF]/90">
            En <ChevronDown />
          </Button>
          {user ?
            <Button onClick={handleLogout}>
              Logout
            </Button>
            :
            <Button asChild>
              <Link href="/login">Sign in</Link>
            </Button>}
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
                      className={`text-lg font-medium ${isActive
                        ? "text-primary font-semibold"
                        : "text-gray-700 hover:text-primary"
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                {user ?
                  <Button className="w-full">Logout</Button>
                  :
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button className="w-full">Sign In</Button>
                  </Link>}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
