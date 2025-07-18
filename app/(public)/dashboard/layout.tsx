// app/dashboard/layout.tsx
"use client";

import { DashboardHeader } from "../_components/DashboardHeader";
import ProtectedRoute from "../_components/ProtectedRoute";
import { Sidebar } from "../_components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardHeader />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="w-full">
          <main className="bg-gray-50">{children}</main>
        </div>
      </div>
    </ProtectedRoute >
  );
}
