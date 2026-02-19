import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services — AI, Web & Mobile Development | nanushi",
  description:
    "Custom AI chatbots, full-stack web applications, React Native mobile apps, and bespoke software solutions. Get a free consultation with nanushi.",
  openGraph: {
    title: "Services — AI, Web & Mobile Development | nanushi",
    description:
      "Custom AI chatbots, full-stack web applications, React Native mobile apps, and bespoke software solutions.",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
