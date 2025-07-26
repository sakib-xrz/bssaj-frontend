/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RootState } from "@/redux/store";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
  allowedRoles?: string[]; // <- add this for role-based access
}

export default function ProtectedRoute({ children, allowedRoles = [] }: Props) {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token.replace(/^"|"$/g, ""));
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        router.push("/login");
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        router.push("/"); // not authorized
      } else {
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Token decode failed:", err);
      router.push("/login");
    }
  }, [token, router, allowedRoles]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return <>{children}</>;
}
