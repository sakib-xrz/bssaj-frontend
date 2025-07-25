"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";


const MembershipPendingStatus = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Membership Application</h1>
          <p className="text-gray-600">Join now to enjoy exclusive benefits and stay connected with our community.</p>
        </div>

        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <div className="ml-2">
            <div className="font-medium text-amber-800 mb-1">
              Your membership request is pending and needs approval from admin.
            </div>
            <AlertDescription className="text-amber-700">
              We are currently reviewing your application. You will receive an email notification once approved.
            </AlertDescription>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default MembershipPendingStatus;
