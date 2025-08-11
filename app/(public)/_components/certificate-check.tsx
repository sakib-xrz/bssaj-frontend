"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/shared/container";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CertificateCheck: React.FC = () => {
  const [certificateCode, setCertificateCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateCertificate = (code: string): boolean => {
    // Check if empty
    if (!code.trim()) {
      setError("Certificate code is required");
      return false;
    }

    // Check if starts with BSSAJ
    if (!code.startsWith("BSSAJ")) {
      setError("Certificate code must start with BSSAJ");
      return false;
    }

    // Check if all characters are uppercase
    if (code !== code.toUpperCase()) {
      setError("Certificate code must be in uppercase");
      return false;
    }

    setError("");
    return true;
  };

  const handleVerify = () => {
    if (validateCertificate(certificateCode)) {
      // Redirect to verification page with certificate code
      router.push(`/verify-certificate?sl=${certificateCode}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCertificateCode(value);

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  return (
    <Container className="flex flex-col lg:flex-row items-center justify-between gap-4">
      {/* Left Section */}
      <div className="lg:w-1/2 flex flex-col justify-center px-4 md:px-0 md:text-left text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4 tracking-tight">
          Certificate Check
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
          If you are certified, use it to check your certificate details.
        </p>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Enter your Certificate Code (e.g., BSSAJ-SB-0825-0001)"
            value={certificateCode}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <Button
          onClick={handleVerify}
          className="w-full bg-primary text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-md hover:bg-primary/90"
        >
          Verify Certificate
        </Button>
      </div>

      {/* Right Section: Image */}
      <div className="w-full lg:w-2/5 flex justify-center items-center p-4 lg:p-0">
        <Image
          src="/images/certificate.png"
          alt="Graduates"
          width={600}
          height={400}
          className="w-full h-auto rounded-lg shadow-xl object-cover"
          priority
        />
      </div>
    </Container>
  );
};

export default CertificateCheck;
