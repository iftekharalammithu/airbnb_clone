import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import RegisterModel from "@/components/Models/RegisterModel";
import ToasterProvider from "@/Provider/ToasterProvider";
import LoginModel from "@/components/Models/LoginModel";
import getCurrentUser from "./actions/getCurrentUser";
import { SafeUser } from "@/types";

export const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "This is a clone of Airbnb. ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = (await getCurrentUser()) as SafeUser | null;
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider></ToasterProvider>
          <RegisterModel></RegisterModel>
          <LoginModel></LoginModel>
          <Navbar currentUser={currentUser}></Navbar>
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
