"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, ChevronDown } from "lucide-react";
import { navLinks } from "@/lib/data";
import Container from "./container";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF]
"
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-lg text-primary">BSSAJ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
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
            En <ChevronDown />
          </Button>
          <Button>Sign in</Button>
        </nav>

        {/* Mobile Navigation with Sheet */}
        <div className="md:hidden">
          <Sheet>
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
                <Button className="w-full">Sign in</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
