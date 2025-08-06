/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Error from "@/app/(public)/_components/error";
import Loading from "@/app/(public)/_components/loading";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetSinglEventQuery } from "@/redux/features/event/eventApi";
import {
    ArrowLeft,
    Calendar,
    Facebook,
    Linkedin,
    Link as LinkIcon,
    Share2,
    Twitter,
} from "lucide-react";
import Head from 'next/head';
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
} from "react-share";
import { toast } from "sonner";

export default function Component() {
    const { id } = useParams()
    const { isLoading, isError, data } = useGetSinglEventQuery(id)
    const [shareUrl, setShareUrl] = useState("")
    const [fullShareUrl, setFullShareUrl] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            const currentUrl = window.location.href;
            setShareUrl(currentUrl);
            // Ensure the URL is absolute for sharing
            setFullShareUrl(`https://bssaj.org${window.location.pathname}`);
        }
    }, [])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fullShareUrl)
        toast.success("Link copied to clipboard!")
    }

    if (isLoading) return <Loading />

    if (!isLoading && isError) {
        return (
            <Error error="This might be a temporary issue. You can try refreshing the page or come back later." />
        )
    }

    if (!isLoading && !isError && data?.data?.statusCode === 200) {
        return <Error error="No Data Found" />
    }

    const mainData = data?.data
    const descriptionText = mainData?.description?.replace(/<[^>]*>/g, "") || ""
    const truncatedDescription = descriptionText.substring(0, 160)

    return (
        <div className="bg-gradient-to-b min-h-screen from-blue-50 to-white">
            <Head>
                {/* Primary Meta Tags */}
                <title>{mainData?.title}</title>
                <meta name="description" content={truncatedDescription} />

                {/* Facebook Open Graph */}
                <meta property="og:url" content={`https://bssaj.org/events/${id}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={mainData?.title} />
                <meta property="og:description" content={truncatedDescription} />
                <meta property="og:image" content={mainData?.cover_image} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="BSSA" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={mainData?.title} />
                <meta name="twitter:description" content={truncatedDescription} />
                <meta name="twitter:image" content={mainData?.cover_image} />
            </Head>
            {/* Rest of your component remains the same */}
            <div className="max-w-4xl mx-auto">
                <Link href="/events">
                    <Button variant="ghost" className="text-white hover:bg-blue-600 mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex text-blue-500 gap-2 items-center">
                            <Calendar className="w-4 h-4" />
                            Publish Date: {new Date(mainData?.created_at ?? '').toLocaleDateString()}
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="p-2 space-y-2">
                                <FacebookShareButton
                                    url={fullShareUrl}
                                    hashtag="#BSSAEvent"
                                    className="flex items-center w-full hover:text-blue-600 p-2"
                                >
                                    <Facebook className="w-4 h-4 mr-2" />
                                    Share on Facebook
                                </FacebookShareButton>

                                <LinkedinShareButton
                                    url={fullShareUrl}
                                    title={mainData?.title}
                                    summary={truncatedDescription}
                                    className="flex items-center w-full hover:text-blue-600 p-2"
                                >
                                    <Linkedin className="w-4 h-4 mr-2" />
                                    Share on LinkedIn
                                </LinkedinShareButton>

                                <TwitterShareButton
                                    url={fullShareUrl}
                                    title={mainData?.title}
                                    hashtags={["BSSAEvent"]}
                                    className="flex items-center w-full hover:text-blue-600 p-2"
                                >
                                    <Twitter className="w-4 h-4 mr-2" />
                                    Share on Twitter
                                </TwitterShareButton>

                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center w-full hover:text-blue-600 p-2"
                                >
                                    <LinkIcon className="w-4 h-4 mr-2" />
                                    Copy Link
                                </button>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {mainData?.title}
                    </h1>
                    <div className="flex gap-2 py-4 text-gray-600 items-center">
                        <Calendar className="w-4 h-4" />
                        event Date : {new Date(mainData?.event_date ?? '').toLocaleDateString()}
                    </div>
                    <Image
                        src={mainData.cover_image}
                        width={1000}
                        height={400}
                        className="rounded-2xl"
                        alt="event-image"
                    />

                    <p className="text-gray-600 leading-relaxed mt-6">
                        {descriptionText}
                    </p>
                </div>
            </div>
        </div>
    )
}