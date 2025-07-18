import type { Metadata } from "next";
import "./globals.css"; // Your global CSS file
import GlobalProvider from "@/components/shared/global-provider";

export const metadata: Metadata = {
  title: "BSSAJ - Bangladesh Student Support Association Japan",
  description:
    "Supporting Bangladeshi students in Japan through community, resources and opportunities.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
