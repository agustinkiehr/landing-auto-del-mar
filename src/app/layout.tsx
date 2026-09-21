import type { Metadata } from "next";
import { Space_Grotesk, Work_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Repuestos Renault | Auto del Mar",
  description:
    "Catálogo de repuestos originales Renault — línea actual y clásicos. Consultá por WhatsApp con Auto del Mar, Mar del Plata.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${workSans.variable} antialiased`}
    >
      <body className="bg-surface text-on-surface">{children}</body>
    </html>
  );
}
