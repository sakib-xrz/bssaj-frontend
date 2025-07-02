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

const Register: React.FC = () => {
  // State for Register Form
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState({
    state: "idle",
    message: "",
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterStatus({ state: "loading", message: "" });

    if (
      !registerFirstName ||
      !registerLastName ||
      !registerEmail ||
      !registerPassword ||
      !registerConfirmPassword
    ) {
      return setRegisterStatus({
        state: "error",
        message: "Please fill all fields.",
      });
    }

    if (registerPassword !== registerConfirmPassword) {
      return setRegisterStatus({
        state: "error",
        message: "Passwords do not match.",
      });
    }
    console.log("Attempting to register with:", {
      registerFirstName,
      registerLastName,
      registerEmail,
      registerPassword,
    });
    setTimeout(() => {
      setRegisterStatus({
        state: "success",
        message: "Registration successful! You can now log in.",
      });
      setRegisterFirstName("");
      setRegisterLastName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterConfirmPassword("");
    }, 1500);
  };

  return (
    <div>
      {/* Hero-like Section */}
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20 text-center">
        <SectionHeader
          title="Join Our Community"
          description="Create your account to access personalized student support."
        />
      </div>

      <Container className="py-12 md:py-16 flex justify-center items-center">
        <Card className="w-full max-w-md rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
          <CardHeader className="p-0 mb-6 text-center">
            <CardTitle className="text-2xl font-bold text-primary mb-2">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm leading-relaxed">
              Join our community by filling out the registration form.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First Name"
                  value={registerFirstName}
                  onChange={(e) => setRegisterFirstName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={registerLastName}
                  onChange={(e) => setRegisterLastName(e.target.value)}
                  required
                />
              </div>
              <Input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                required
              />
              {registerStatus.state === "error" && (
                <p className="text-red-500 text-sm">{registerStatus.message}</p>
              )}
              {registerStatus.state === "success" && (
                <p className="text-green-600 text-sm">
                  {registerStatus.message}
                </p>
              )}
              <Button
                type="submit"
                disabled={registerStatus.state === "loading"}
                className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3 rounded-lg transition"
              >
                {registerStatus.state === "loading"
                  ? "Registering..."
                  : "Register"}
              </Button>
              <p className="text-center text-sm text-gray-600 mt-4">
                <Link href="/login" className="text-primary hover:underline">
                  Already have an account? Login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
