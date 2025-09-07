import type { Metadata } from "next"
import EmployeeTemplate from "@/components/modal/EmployeeTemplate";

export const metadata: Metadata = {
  title: "Tix Train",
  description: "Sekopling Express",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <EmployeeTemplate>
    {children}
   </EmployeeTemplate>
  );
}
