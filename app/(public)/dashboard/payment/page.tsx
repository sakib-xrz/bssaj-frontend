"use client";

import { useGetMyAgenciesQuery } from "@/redux/features/agency/agencyApi";
import { useAuthUser } from "@/redux/features/auth/authSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useGetAgencyPaymentQuery } from "@/redux/features/payment/paymentApi";
import { AgencyPayment } from "@/lib/types";

export default function Page() {
  const user = useAuthUser();
  const { data: agenciesData } = useGetMyAgenciesQuery(user?.id);

  const [selectedAgency, setSelectedAgency] = useState<string>("");

  const { data: paymentData } = useGetAgencyPaymentQuery(selectedAgency, {
    skip: !selectedAgency,
  });

  const selectAgencyValue =
    agenciesData?.data?.map((item: { name: string; id: string }) => ({
      name: item.name,
      value: item.id,
    })) || [];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Select Agency Payment Method
          </h2>

          <Select onValueChange={(val) => setSelectedAgency(val)}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select an agency" />
            </SelectTrigger>
            <SelectContent>
              {selectAgencyValue.map(
                (agency: { name: string; value: string }) => (
                  <SelectItem key={agency.value} value={agency.value}>
                    <span className="truncate block max-w-[240px]">
                      {agency.name}
                    </span>
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Table Section */}
        {selectedAgency && paymentData?.data?.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr className="text-left text-sm font-semibold text-gray-600">
                  <th className="px-4 py-2 border-b">Payment Month</th>
                  <th className="px-4 py-2 border-b">Amount</th>
                  <th className="px-4 py-2 border-b">Payment Date</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Method</th>
                  <th className="px-4 py-2 border-b">Transaction ID</th>
                  <th className="px-4 py-2 border-b">Notes</th>
                </tr>
              </thead>
              <tbody>
                {paymentData.data.map((payment: AgencyPayment) => (
                  <tr
                    key={payment.id}
                    className="text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 border-b">
                      {payment.payment_month}
                    </td>
                    <td className="px-4 py-2 border-b font-medium">
                      <Badge className="bg-green-500">${payment.amount}</Badge>
                    </td>
                    <td className="px-4 py-2 border-b">
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {payment.payment_status}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {payment.payment_method}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {payment.transaction_id}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {payment.notes || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty state */}
        {selectedAgency && paymentData?.data?.length === 0 && (
          <p className="mt-6 text-gray-500 text-sm">No payments found.</p>
        )}
      </div>
    </div>
  );
}
