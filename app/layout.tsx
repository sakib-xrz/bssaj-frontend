import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Your global CSS file

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BSSAJ - Bangladesh Student Support Association Japan",
  description:
    "Supporting Bangladeshi students in Japan through community, resources and opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
