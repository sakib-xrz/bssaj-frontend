// app/error.tsx
"use client";


export default function Error({ error }: { error: string }) {
    return (
        <div className="w-full p-4">
            <div className="w-full space-y-6 p-6">
                <div className="space-y-4 bg-yellow-100 w-full ">
                    <p className="text-yellow-600  p-4 rounded-md">
                        {error ||
                            "This might be a temporary issue. You can try refreshing the page or come back later."}
                    </p>
                </div>
            </div>
        </div>
    );
}