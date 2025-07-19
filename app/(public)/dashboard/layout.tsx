"use client";

import { DashboardHeader } from "../_components/dashboard-header";
import ProtectedRoute from "../_components/protectedRoute";
import { Sidebar } from "../_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardHeader />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="w-full">
          <main className="bg-gray-50">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
