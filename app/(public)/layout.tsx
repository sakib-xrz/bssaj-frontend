import Footer from "@/components/shared/footer";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
