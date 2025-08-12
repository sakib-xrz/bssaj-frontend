"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { StudentCertificateForm } from "../../_components/create-certificate-form";

function Page() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 mx-auto items-center mb-8">
    <h1 className="text-lg md:text-4xl font-bold text-gray-900">
        Certificate
    </h1>

    <div className="flex md:justify-end">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 w-auto"
                >
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
        </>
    );
}

export default Page;