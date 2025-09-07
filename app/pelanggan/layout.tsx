import type { Metadata } from "next"
import PelangganTemplate from "@/components/PelanganTemplate";
 "@/components/modal/";

export const metadata: Metadata = {
  title: "Pesawat",
  description: "Sekopling Express",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <PelangganTemplate>
     {children}
  </PelangganTemplate>
  );
}
