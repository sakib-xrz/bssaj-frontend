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
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />{" "}
        <div className="flex flex-col flex-1">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
