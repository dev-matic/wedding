import type { Metadata } from "next";
import GoldDust from "./GoldDust";

export const metadata: Metadata = {
  title: "Gold Dust — Prototype",
  description: "A three.js particle cover concept for Kwabena & Sandra.",
};

export default function GoldDustPreview() {
  return <GoldDust />;
}
