"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface MembershipPendingStatusProps {
  message?: string;
}

const MembershipPendingStatus: React.FC<MembershipPendingStatusProps> = ({
  message = "Your membership request is pending and needs approval from admin. We're currently reviewing your application. You'll receive an email notification once approved.",
}) => {
  return (
    <Card className="w-full max-w-3xl rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8 text-center">
      <CardContent className="p-0 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-yellow-500 mb-4" />
        <p className="text-lg text-gray-700 mb-2">{message}</p>
        <p className="text-sm text-muted-foreground">
          Thank you for your patience.
        </p>
      </CardContent>
    </Card>
  );
};

export default MembershipPendingStatus;
