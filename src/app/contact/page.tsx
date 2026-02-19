import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Get a Free Consultation | nanushi",
  description:
    "Get in touch with nanushi for a free consultation. We build AI-powered applications, web platforms, mobile apps, and custom software for businesses.",
  openGraph: {
    title: "Contact Us — Get a Free Consultation | nanushi",
    description:
      "Get in touch with nanushi for a free consultation on AI, web, and mobile development.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
