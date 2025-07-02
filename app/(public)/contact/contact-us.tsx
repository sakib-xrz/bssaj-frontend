/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  MessageSquareIcon,
  UsersIcon,
  GraduationCapIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import Link from "next/link";

const contactInfoCards = [
  {
    id: "phone",
    icon: PhoneIcon,
    title: "Phone",
    value: "+881 01942567343",
    description: "Available 24/7",
  },
  {
    id: "email",
    icon: MailIcon,
    title: "Email",
    value: "info@bssaj.org",
    description: "Response within 24hrs",
  },
  {
    id: "location",
    icon: MapPinIcon,
    title: "Location",
    value: "Tokyo, Japan",
    description: "Central Office",
  },
  {
    id: "office-hour",
    icon: ClockIcon,
    title: "Office Hour",
    value: "Mon‑Fri, 9AM‑6PM",
    description: "Weekend by appt.",
  },
];

const helpCards = [
  {
    id: "general-support",
    icon: MessageSquareIcon,
    title: "General Support",
    description: "Get help with general inquiries.",
    link: "#",
  },
  {
    id: "community-support",
    icon: UsersIcon,
    title: "Community Support",
    description: "Connect with students & events.",
    link: "#",
  },
  {
    id: "consultations",
    icon: GraduationCapIcon,
    title: "Consultations",
    description: "Schedule one‑on‑one help.",
    link: "#",
  },
];

export default function ContactUs() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const onSend = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { firstName, lastName, email, subject, message } = form;
    if (!firstName || !lastName || !email || !subject || !message) {
      return setStatus({
        state: "error",
        message: "Please fill all required fields.",
      });
    }
    setStatus({ state: "loading", message: "" });

    try {
      const res = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY!
      );
      if (res.status === 200) {
        setStatus({ state: "success", message: "Message sent successfully!" });
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      console.error(err);
      setStatus({
        state: "error",
        message: "Failed to send. Try again later.",
      });
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20 text-center">
        <SectionHeader
          title="Contact Us"
          description="We're here to help Bangladeshi students in Japan."
        />
      </div>

      <Container className="py-12 md:py-16">
        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfoCards.map((c) => (
            <Card
              key={c.id}
              className="flex flex-col items-center text-center p-6 rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <c.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-semibold text-lg mb-1">
                {c.title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mb-1">
                {c.value}
              </CardDescription>
              <p className="text-xs text-gray-500">{c.description}</p>
            </Card>
          ))}
        </div>

        {/* Message Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="p-6 md:p-8 rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary font-bold">
                Send us a Message
              </CardTitle>
              <CardDescription className="mt-1 text-sm text-muted-foreground">
                Fill out the form and we will reply ASAP.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSend} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    required
                  />
                  <Input
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    required
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <Input
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <Input
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  required
                />
                <Textarea
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  rows={5}
                  required
                />
                {status.state === "error" && (
                  <p className="text-red-500 text-sm">{status.message}</p>
                )}
                {status.state === "success" && (
                  <p className="text-green-600 text-sm">{status.message}</p>
                )}
                <Button
                  type="submit"
                  disabled={status.state === "loading"}
                  className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3 rounded-lg transition"
                >
                  {status.state === "loading" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* How We Can Help */}
        <SectionHeader
          className="mb-6"
          title="How We Can Help"
          description="Support services for students"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpCards.map((h) => (
            <Card
              key={h.id}
              className="p-6 flex flex-col items-center text-center rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <h.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-semibold text-lg mb-2">
                {h.title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mb-4">
                {h.description}
              </CardDescription>
              <Button
                asChild
                variant="link"
                className="text-primary font-semibold"
              >
                <Link href={h.link || "#"}>Learn More</Link>
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
