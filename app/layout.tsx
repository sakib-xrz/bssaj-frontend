import type { Metadata, Viewport } from "next";
import "./globals.css";
import GlobalProvider from "@/components/shared/global-provider";

export const metadata: Metadata = {
  title: "BSSAJ - Bangladeshi Students' Support Association in Japan",
  description:
    "Non-profit organization supporting Bangladeshi students in Japan with educational, administrative, and cultural assistance since 2025.",
  keywords:
    "BSSAJ, Bangladeshi students Japan, study in Japan, student support Japan, educational assistance Japan, Bangladeshi students association",
  authors: [{ name: "Bangladeshi Students' Support Association in Japan" }],
  creator: "Bangladeshi Students' Support Association in Japan",
  publisher: "Bangladeshi Students' Support Association in Japan",
  robots: "index, follow",
  metadataBase: new URL("https://www.bssaj.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.bssaj.org",
    title: "BSSAJ - Bangladeshi Students' Support Association in Japan",
    description:
      "Non-profit organization supporting Bangladeshi students in Japan with educational, administrative, and cultural assistance since 2025.",
    siteName: "BSSAJ",
    images: [
      {
        url: "/images/bssaj-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BSSAJ - Bangladeshi Students' Support Association in Japan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bssaj",
    creator: "@bssaj",
    title: "BSSAJ - Bangladeshi Students' Support Association in Japan",
    description:
      "Non-profit organization supporting Bangladeshi students in Japan with educational, administrative, and cultural assistance since 2025.",
    images: ["/images/bssaj-twitter-image.jpg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BSSAJ - Bangladeshi Students' Support Association in Japan",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    HandheldFriendly: "true",
    "revisit-after": "7 days",
    rating: "general",
    language: "English",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#006a4e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
