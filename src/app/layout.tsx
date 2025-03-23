import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import Models from "@/components/Models/Models";
import RegisterModel from "@/components/Models/RegisterModel";

export const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "This is a clone of Airbnb. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <RegisterModel></RegisterModel>
          <Navbar></Navbar>
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
