"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
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
import emailjs from "@emailjs/browser";

interface ContactInfoCardProps {
  id: string;
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}

const contactInfoCards: ContactInfoCardProps[] = [
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
    value: "Mon-Fri, 9AM-6PM",
    description: "Weekend by appt.",
  },
];

// --- Data for How We Can Help Cards ---
interface HelpCardProps {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  link?: string;
}

const helpCards: HelpCardProps[] = [
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

const ContactUsPage: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, subject, message } = form;

    if (!firstName || !lastName || !email || !subject || !message) {
      return setStatus({
        state: "error",
        message: "Please fill all required fields.",
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setStatus({
        state: "error",
        message: "Please enter a valid email address.",
      });
    }

    setStatus({ state: "loading", message: "" });

    try {
      const res = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE!,
        {
          from_name: `${form.firstName} ${form.lastName}`,
          from_email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY!
      );

      console.log("EmailJS response:", res); // Add this for debugging

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
        throw new Error(`EmailJS returned status ${res.status}`);
      }
    } catch (err) {
      console.error("Detailed EmailJS error:", err);
      setStatus({
        state: "error",
        message:
          "Failed to send message. Please check your connection and try again.",
      });
    }
  };

  return (
    <div>
      {/* Hero-like Section */}
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
              <CardContent className="p-0 flex flex-col items-center">
                {" "}
                {/* Added flex-col and items-center */}
                <div className="bg-blue-100 rounded-full p-4 mb-4 flex items-center justify-center h-16 w-16">
                  {" "}
                  {/* Added flex, items-center, justify-center, h-16, w-16 */}
                  <c.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-semibold text-lg mb-1">
                  {c.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mb-1">
                  {c.value}
                </CardDescription>
                <p className="text-xs text-gray-500">{c.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message Form & Get in Touch Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Send us a Message Form */}
          <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-bold text-primary mb-2">
                Send us a Message
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                Fill out the form below and we will get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="text"
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
                  type="tel"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <Input
                  type="text"
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

          {/* Right Column: Get in Touch & Follow Us */}
          <div className="flex flex-col space-y-8">
            {/* Get in Touch */}
            <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold text-primary">
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="flex items-start space-x-3 text-gray-700">
                  <MapPinIcon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-base font-medium">Address</p>
                    <p className="text-sm">
                      Bangladesh Student Support Association Japan
                    </p>
                    <p className="text-sm">Tokyo, Japan</p>
                    <p className="text-sm">Central Office Location</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <PhoneIcon className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-base font-medium">Phone</p>
                    <p className="text-sm">+881 0194637743</p>
                    <p className="text-xs text-gray-500">
                      Available 24/7 for emergencies
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <MailIcon className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-base font-medium">Email</p>
                    <p className="text-sm">info@bssaj.org</p>
                    <p className="text-xs text-gray-500">
                      We wll respond within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <ClockIcon className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-base font-medium">Office Hours</p>
                    <p className="text-sm">Monday - Friday, 9AM - 6PM</p>
                    <p className="text-xs text-gray-500">
                      Weekend: By Appointment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Follow Us */}
            <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold text-primary">
                  Follow Us
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Stay connected with us on social media for the latest updates
                  and community news.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com/bssaj"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="h-6 w-6 text-gray-600 hover:text-primary transition-colors duration-200" />
                  </a>
                  <a
                    href="https://twitter.com/bssaj"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <TwitterIcon className="h-6 w-6 text-gray-600 hover:text-primary transition-colors duration-200" />
                  </a>
                  <a
                    href="https://instagram.com/bssaj"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="h-6 w-6 text-gray-600 hover:text-primary transition-colors duration-200" />
                  </a>
                  <a
                    href="https://linkedin.com/company/bssaj"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="h-6 w-6 text-gray-600 hover:text-primary transition-colors duration-200" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How We Can Help Section */}
        <SectionHeader
          className="mb-8"
          title="How We Can Help"
          description="Our team is dedicated to providing comprehensive support services for Bangladeshi students in Japan."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {helpCards.map((card) => (
            <Card
              key={card.id}
              className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-0 flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                  <card.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {card.description}
                </CardDescription>
                {card.link && (
                  <Button
                    asChild
                    variant="link"
                    className="text-primary text-sm font-semibold p-0 h-auto mt-4"
                  >
                    <Link href={card.link}>Learn More</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ContactUsPage;
