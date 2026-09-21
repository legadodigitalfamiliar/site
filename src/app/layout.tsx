import type { Metadata } from "next";
import { Outfit, Public_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Legado Digital — Preserve a história da sua família",
  description:
    "Uma plataforma segura e fácil de usar para guardar fotos, histórias, documentos e a árvore genealógica da sua família em um só lugar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-body font-sans">
        {children}
      </body>
    </html>
  );
}
