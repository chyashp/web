import type { Metadata } from "next";
import CommunityClient from "@/components/CommunityClient";

export const metadata: Metadata = {
  title: "Community | nanushi",
  description:
    "A collaborative learning platform where aspiring mobile developers build real apps in product teams.",
};

export default function CommunityPage() {
  return <CommunityClient />;
}
