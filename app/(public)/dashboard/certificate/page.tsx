"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, PlusIcon, QrCode } from "lucide-react";
import { useState } from "react";
import { StudentCertificateForm } from "../../_components/create-certificate-form";
import { useGetAllCartificateQuery } from "@/redux/features/certificate/certificateApi";
import Loading from "../../_components/loading";
import Error from "../../_components/error";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import QRCodeGenerator from "@/components/shared/qr-code-generator";
import { FRONTEND_URL } from "@/lib/constant";
import Link from "next/link";
import { Certificate } from "@/lib/types";

function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, isError, data } = useGetAllCartificateQuery(undefined);

  const downloadQRCode = (sl_no: string) => {
    const canvas = document.querySelector(`#qrcode-${sl_no} canvas`);
    if (!canvas) {
      console.error("QR code canvas not found");
      return;
    }

    try {
      const link = document.createElement("a");
      link.download = `certificate-${sl_no.toLowerCase()}.png`;
      link.href = (canvas as HTMLCanvasElement).toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error="Something went wrong" />;
  }

  if (!isLoading && !isError && data?.data?.length === 0) {
    return <Error error="No certificates found" />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto items-center mb-8">
        <h1 className="text-lg md:text-4xl font-bold text-gray-900">
          Certificates
        </h1>

        <div className="flex md:justify-end">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 w-auto">
                <PlusIcon className="h-4 w-4" />
                Student Certificate Form
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Certificate</DialogTitle>
              </DialogHeader>
              <StudentCertificateForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Certificate Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SL No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Institute</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Issued At</TableHead>
                  <TableHead>QR Code</TableHead>
                  <TableHead>Edit Cartificate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((certificate: Certificate) => (
                  <TableRow key={certificate.id}>
                    <TableCell className="font-medium">
                      {certificate?.sl_no}
                    </TableCell>
                    <TableCell>{certificate.name}</TableCell>
                    <TableCell>{certificate.institute_name || "-"}</TableCell>
                    <TableCell>
                      {format(
                        new Date(certificate.date_of_birth),
                        "MMM dd, yyyy"
                      )}
                    </TableCell>
                    <TableCell>
                      {format(
                        new Date(
                          certificate.issued_at || certificate.created_at
                        ),
                        "MMM dd, yyyy 'at' h:mm a"
                      )}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadQRCode(certificate.sl_no)}
                        className="flex items-center gap-1"
                      >
                        <QrCode className="h-4 w-4" />
                        QR Code
                      </Button>
                      {certificate.certificate_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex items-center gap-1"
                        >
                          <a
                            href={certificate.certificate_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4" />
                            Certificate
                          </a>
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/certificate/${certificate.id}`}>
                        <Button>Edit Cartificate</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="hidden">
        {data?.data.map((certificate: Certificate) => (
          <div key={`qr-${certificate.id}`} id={`qrcode-${certificate.sl_no}`}>
            <QRCodeGenerator
              value={`${FRONTEND_URL}/verify-certificate?sl=${certificate.sl_no}`}
              size={128}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
