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
import { use, useState } from "react";
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
import { CustomPagination } from "../../_components/CustomPagination";

function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [page,setPage] = useState(1)
  const [limit,setLimit]=useState(10)
  const { isLoading, isError, data } = useGetAllCartificateQuery(
    [
      { name: "limit", value: limit },
      { name: "page", value: page },
    ],
    {
      refetchOnMountOrArgChange: true,
    }
  );
   const totalItems = data?.meta?.total || 0;
   const totalPages = Math.ceil(totalItems / limit);
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

  return (
    <>
      {/* Header Section */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-8">
          <h1 className="text-xl md:text-4xl font-bold text-gray-900 text-center md:text-left">
            Certificates
          </h1>

          <div className="flex justify-center md:justify-end">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 w-full md:w-auto">
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
      </div>

      {/* Table Section */}
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-2xl">
              Certificate Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Always scrollable table */}
            <div className="w-full overflow-x-auto">
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">SL No</TableHead>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Grade</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Date of Birth
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Issued At
                    </TableHead>
                    <TableHead className="whitespace-nowrap">QR Code</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Edit Certificate
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.map((certificate: Certificate) => (
                    <TableRow key={certificate.id}>
                      <TableCell>{certificate.sl_no}</TableCell>
                      <TableCell className="break-words max-w-[150px]">
                        {certificate.name}
                      </TableCell>
                      <TableCell>{certificate.grade || "-"}</TableCell>
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
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
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
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link href={`/dashboard/certificate/${certificate.id}`}>
                          <Button>Edit</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hidden QR Codes */}
      <div className="container">
        <div className="hidden">
          {data?.data.map((certificate: Certificate) => (
            <div
              key={`qr-${certificate.id}`}
              id={`qrcode-${certificate.sl_no}`}
            >
              <QRCodeGenerator
                value={`${FRONTEND_URL}/verify-certificate?sl=${certificate.sl_no}`}
                size={128}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center py-10">
        <CustomPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                className="mb-10"
              />
      </div>
    </>
  );
}

export default Page;
