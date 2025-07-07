"use client";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { JwtDecode } from "@/lib/JwtDecode/JwtDecode";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();

      if (res?.success) {
        toast.success(res?.message);
        const user = JwtDecode(res?.data?.access_token);
        dispatch(setUser({ user, token: res.data.access_token }));
        setTimeout(() => router.push('/'), 2000);
      }
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'data' in err) {
        const error = err as { data?: { success?: boolean; message?: string } };
        toast.error(error.data?.message || 'Login failed');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      {/* Hero-like Section */}
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20 text-center">
        <SectionHeader
          title="Welcome Back!"
          description="Login to access your personalized student support dashboard."
        />
      </div>

      <Container className="py-12 md:py-16 flex justify-center items-center">
        <Card className="w-full max-w-md rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
          <CardHeader className="p-0 mb-6 text-center">
            <CardTitle className="text-2xl font-bold text-primary mb-2">
              Login to Your Account
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm leading-relaxed">
              Enter your credentials to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3 rounded-lg transition"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <p className="text-center text-sm text-gray-600 mt-4">
                <Link href="#" className="text-primary hover:underline">
                  Forgot Password?
                </Link>
                <span className="mx-2">|</span>
                <Link href="/register" className="text-primary hover:underline">
                  Don&#39;t have an account? Register
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Login;