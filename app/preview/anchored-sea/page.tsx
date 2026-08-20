import type { Metadata } from "next";
import AnchoredSea from "./AnchoredSea";

export const metadata: Metadata = {
  title: "Anchored Sea — Prototype",
  description: "A three.js golden-sea cover concept for Kwabena & Sandra.",
};

export default function AnchoredSeaPreview() {
  return <AnchoredSea />;
}
