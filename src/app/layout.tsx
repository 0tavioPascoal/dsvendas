import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bulma";
import "primeflex/primeflex.css";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/components/common/loader/loader.css";
import "@/components/common/form-sell/form-sell.css";
import { PrimeReactProvider } from "primereact/api";

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </body>
      </html>
  );
}
