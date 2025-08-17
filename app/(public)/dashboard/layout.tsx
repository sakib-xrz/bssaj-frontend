"use client";

import { useAuthUser } from "@/redux/features/auth/authSlice";
import { AgencySidebar } from "../_components/AgencySidebar";
import { DashboardHeader } from "../_components/dashboard-header";
import ProtectedRoute from "../_components/ProtectedRoute";
import { UserSidebar } from "../_components/UserSidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthUser()
  let sidebar = null 

  if(user?.role === "STUDENT"){
    sidebar = <UserSidebar />
  }else if(user?.role === "AGENCY"){
    sidebar = <AgencySidebar />
  }
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        {sidebar}
        <div className="flex flex-col flex-1">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
