"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";

const Login: React.FC = () => {
  // State for Login Form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState({
    state: "idle",
    message: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus({ state: "loading", message: "" });

    if (!loginEmail || !loginPassword) {
      return setLoginStatus({
        state: "error",
        message: "Please fill all fields.",
      });
    }
    setTimeout(() => {
      if (
        loginEmail === "test@example.com" &&
        loginPassword === "password123"
      ) {
        setLoginStatus({ state: "success", message: "Login successful!" });
        setLoginEmail("");
        setLoginPassword("");
      } else {
        setLoginStatus({
          state: "error",
          message: "Invalid email or password.",
        });
      }
    }, 1500);
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
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              {loginStatus.state === "error" && (
                <p className="text-red-500 text-sm">{loginStatus.message}</p>
              )}
              {loginStatus.state === "success" && (
                <p className="text-green-600 text-sm">{loginStatus.message}</p>
              )}
              <Button
                type="submit"
                disabled={loginStatus.state === "loading"}
                className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3 rounded-lg transition"
              >
                {loginStatus.state === "loading" ? "Logging in..." : "Login"}
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
