import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bulma"
import "@/components/common/loader/loader.css"
import {PrimeReactProvider} from "primereact/api"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DsVendas",
  description: "Generated DsVendas Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <PrimeReactProvider value={{ unstyled: true }}>
        {children}
        </PrimeReactProvider>
      </body> 
    </html>
  );
}
