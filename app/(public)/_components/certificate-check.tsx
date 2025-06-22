"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/shared/container";

const CertificateCheck: React.FC = () => {
  const [certificateCode, setCertificateCode] = useState<string>("");
  const [certificateDetails, setCertificateDetails] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCertificateCheck = () => {
    setErrorMessage(null);
    setCertificateDetails(null);

    if (!certificateCode) {
      setErrorMessage("Please enter your Certificate Code.");
      return;
    }

    if (certificateCode === "12345") {
      setCertificateDetails(
        "Certificate Holder: John Doe, Issued: 2023-01-15, Course: Advanced Japanese"
      );
    } else if (certificateCode === "67890") {
      setCertificateDetails(
        "Certificate Holder: Jane Smith, Issued: 2022-11-01, Course: Business Japanese"
      );
    } else {
      setErrorMessage("Certificate not found or invalid.");
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
            placeholder="Enter your Certificate Code"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
            value={certificateCode}
            onChange={(e) => setCertificateCode(e.target.value)}
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}

        {certificateDetails && (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md mb-4 shadow-sm">
            <p className="font-semibold">Certificate Found!</p>
            <p>{certificateDetails}</p>
          </div>
        )}

        <Button
          onClick={handleCertificateCheck}
          className="w-full  bg-primary text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-md"
        >
          View Certificate
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
