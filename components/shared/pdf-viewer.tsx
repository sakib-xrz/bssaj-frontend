"use client";

interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <div className="w-full h-full border rounded-lg overflow-hidden">
      <iframe
        src={pdfUrl}
        width="100%"
        height="100%"
        className="border-0"
        title="Certificate PDF"
      />
    </div>
  );
}
